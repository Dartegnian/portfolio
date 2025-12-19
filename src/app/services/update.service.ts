import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UpdateService {
	private updates = inject(SwUpdate, { optional: true });
	private platformId = inject<Object>(PLATFORM_ID);

	readonly hasInitiallyCheckedForUpdates = signal(false);
	private readonly isBrowser = isPlatformBrowser(this.platformId);
	private readonly versionReady = this.updates && this.isBrowser
		? toSignal<VersionReadyEvent>(
			this.updates.versionUpdates.pipe(
				filter((evt: { type: string; }): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
			),
			{ initialValue: null },
		)
		: signal<VersionReadyEvent | null>(null);

	constructor() {
		// Ensure this runs only in the browser
		if (this.isBrowser && this.updates && this.updates.isEnabled) {
			setInterval(() => void this.updates!.checkForUpdate(), 60000);

			effect(() => {
				if (!this.versionReady()) return;
				this.promptUser();
			});
		}
	}

	public checkForUpdates(): void {
		if (this.isBrowser && this.updates && this.updates.isEnabled) {
			void this.updates.checkForUpdate();
		}
	}

	private promptUser(): void {
		if (isPlatformBrowser(this.platformId) && this.updates) {
			console.log('Updating PWA');
			this.updates.activateUpdate().then(() =>
				setTimeout(() => {
					document.location.reload();
				}, 1250)
			);
		}
	}

	setHasCheckedForUpdates(hasChecked: boolean) {
		this.hasInitiallyCheckedForUpdates.set(hasChecked);
	}
}
