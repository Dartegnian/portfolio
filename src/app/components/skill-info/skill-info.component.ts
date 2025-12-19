import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, Injector, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';

@Component({
    selector: 'skill-info',
    templateUrl: './skill-info.component.html',
    styleUrls: ['./skill-info.component.scss'],
    standalone: true,
	host: { ngSkipHydration: 'true' },
})
export class SkillInfoComponent {
	private readonly platformId = inject<Object>(PLATFORM_ID);
	private readonly injector = inject(Injector);
	private readonly destroyRef = inject(DestroyRef);

	webAttributes = [
		"focused",
		"inspired",
		"driven",
		"oriented",
		"impassioned"
	];
	webAttributeIndex = 0;
	webAttributeCharacter = 0;
	readonly webAttribute = signal('');

	private cursorIntervalId: number | null = null;
	private pendingTimeoutId: number | null = null;
	readonly isBrowser: boolean = isPlatformBrowser(this.platformId);

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {
		if (!this.isBrowser) return;

		afterNextRender(() => {
			this.startTyping();
		}, { injector: this.injector });

		this.destroyRef.onDestroy(() => this.clearTimers());
	}

	private startTyping(): void {
		this.clearTimers();
		this.cursorIntervalId = window.setInterval(() => this.writeType(), 100);
	}

	writeType() {
		const activeText = this.webAttributes[this.webAttributeIndex].substring(0, this.webAttributeCharacter + 1);
		this.webAttribute.set(activeText);
		this.webAttributeCharacter++;

		if (activeText === this.webAttributes[this.webAttributeIndex]) {

			this.clearIntervalOnly();
			this.pendingTimeoutId = window.setTimeout(() => {
				this.cursorIntervalId = window.setInterval(() => this.deleteType(), 50);
			}, 1500);
		}
	}

	deleteType() {
		const activeText = this.webAttributes[this.webAttributeIndex].substring(0, this.webAttributeCharacter - 1);
		this.webAttribute.set(activeText);
		this.webAttributeCharacter--;

		if (activeText === "") {
			this.clearIntervalOnly();

			if (this.webAttributeIndex === (this.webAttributes.length - 1)) {
				this.webAttributeIndex = 0;
			}
			else {
				this.webAttributeIndex++;
			}

			this.webAttributeCharacter = 0;

			this.pendingTimeoutId = window.setTimeout(() => {
				this.cursorIntervalId = window.setInterval(() => this.writeType(), 100);
			}, 500);
		}
	}

	private clearIntervalOnly(): void {
		if (this.cursorIntervalId != null) {
			clearInterval(this.cursorIntervalId);
			this.cursorIntervalId = null;
		}
	}

	private clearTimers(): void {
		this.clearIntervalOnly();
		if (this.pendingTimeoutId != null) {
			clearTimeout(this.pendingTimeoutId);
			this.pendingTimeoutId = null;
		}
	}
}
