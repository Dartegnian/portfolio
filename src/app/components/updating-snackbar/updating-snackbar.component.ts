
import { isPlatformBrowser } from '@angular/common';
import { Component, EffectRef, OnDestroy, PLATFORM_ID, afterNextRender, computed, effect, inject, signal, Injector, runInInjectionContext } from '@angular/core';
import { SwUpdate, type VersionEvent } from '@angular/service-worker';
import { LoadingCircleComponent } from "@components/loading-circle/loading-circle.component";
import { UpdateService } from '@services/update.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
	selector: 'updating-snackbar',
	imports: [LoadingCircleComponent],
	templateUrl: './updating-snackbar.component.html',
	styleUrl: './updating-snackbar.component.scss'
})
export class UpdatingSnackbarComponent implements OnDestroy {
	private sw = inject(SwUpdate);
	private platformId = inject<Object>(PLATFORM_ID);
	private updateService = inject(UpdateService);
	private readonly injector = inject(Injector);

	isBrowser: boolean = isPlatformBrowser(this.platformId);
	private readonly versionEvent = toSignal<VersionEvent | null>(this.sw.versionUpdates, { initialValue: null });
	private versionEffect?: EffectRef;

	readonly isSpinnerShown = signal(true);
	readonly updateText = signal("Checking for updates");
	readonly iconText = signal("");
	readonly isFadingUp = signal(false);
	readonly isFadingDown = signal(false);
	readonly hasInitiallyCheckedForUpdates = computed(() => this.updateService.hasInitiallyCheckedForUpdates());

	constructor() {
		if (!this.isBrowser) return;

		// Defer initial state setup + SW subscription to avoid NG0100 during hydration.
		afterNextRender(() => {
			this.initializeInitialFade();
			this.subscribeToUpdates();
		}, { injector: this.injector });
	}

	// ngAfterViewInit(): void {
		// no-op: initial fade and SW-disabled UI handled in constructor via afterNextRender
	// }

	ngOnDestroy(): void {
		this.versionEffect?.destroy();
	}

	private initializeInitialFade(): void {
		if (this.hasInitiallyCheckedForUpdates()) {
			this.isFadingUp.set(false);
			return;
		}

		// Show initial fade-in, then drop class later.
		this.isFadingUp.set(true);
		setTimeout(() => this.isFadingUp.set(false), 1000);

		if (!this.sw.isEnabled) {
			// Service worker disabled: show status and then hide.
			this.isSpinnerShown.set(false);
			this.iconText.set("report");
			this.updateText.set("Updates unavailable");
			setTimeout(() => {
				this.isFadingDown.set(true);
				this.updateService.setHasCheckedForUpdates(true);
			}, 2500);
		}
	}

	private subscribeToUpdates(): void {
		this.versionEffect?.destroy();
		this.versionEffect = runInInjectionContext(this.injector, () =>
			effect(() => {
				const event = this.versionEvent();
				if (!event) return;

				// Schedule mutations in macrotask to avoid check-no-changes.
				setTimeout(() => {
					switch (event.type) {
						case 'VERSION_DETECTED':
							this.isFadingDown.set(false);
							this.isFadingUp.set(true);
							this.updateText.set("Update found! Updating...");
							break;
						case 'VERSION_READY':
							// Update ready; UpdateService will activate/reload.
							break;
						case 'VERSION_INSTALLATION_FAILED':
							this.isSpinnerShown.set(false);
							this.iconText.set("report");
							this.updateText.set("Update failed! Check console and send a bug report.");
							console.error('Update failed:', (event as any).error);
							break;
						case 'NO_NEW_VERSION_DETECTED':
							this.isSpinnerShown.set(false);
							this.iconText.set("task_alt");
							this.updateText.set("Up-to-date!");
							setTimeout(() => this.isFadingDown.set(true), 4000);
							break;
					}

					if (!this.hasInitiallyCheckedForUpdates()) {
						setTimeout(() => this.updateService.setHasCheckedForUpdates(true), 5000);
					}
				}, 0);
			}),
		);
	}
}
