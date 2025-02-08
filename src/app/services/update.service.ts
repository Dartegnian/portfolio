import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { isPlatformBrowser } from '@angular/common';
import { filter, interval, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UpdateService {
	private updates = inject(SwUpdate, { optional: true });
	private platformId = inject<Object>(PLATFORM_ID);

	public hasInitiallyCheckedForUpdates = false;

	constructor() {
		// Ensure this runs only in the browser
		if (isPlatformBrowser(this.platformId) && this.updates && this.updates.isEnabled) {
			interval(60000).subscribe(() => this.updates!.checkForUpdate());
		}
	}

	public checkForUpdates(): void {
		if (isPlatformBrowser(this.platformId) && this.updates) {
			this.updates.versionUpdates
				.pipe(
					filter((evt: { type: string; }): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
					map(evt => ({
						type: 'UPDATE_AVAILABLE',
						current: evt.currentVersion,
						available: evt.latestVersion,
					}))
				)
				.subscribe(() => {
					this.promptUser();
				});
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
		this.hasInitiallyCheckedForUpdates = hasChecked;
	}
}
