import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';

@Component({
	selector: 'updating-snackbar',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './updating-snackbar.component.html',
	styleUrl: './updating-snackbar.component.scss'
})
export class UpdatingSnackbarComponent implements AfterViewInit {
	hasCheckedForUpdate = false;
	isSpinnerShown = true;
	isIconShown = false;
	updateSubscription: Subscription;
	updateText = "Updating app...";
	iconText = "task_alt";

	@ViewChild('updatingSnackbar', { static: true }) updatingSnackbar!: ElementRef;

	constructor(
		private sw: SwUpdate
	) {
		this.updateSubscription = this.sw.versionUpdates.subscribe(event => {
			switch (event.type) {
				case 'VERSION_DETECTED':
					// A new version has been detected.
					this.updatingSnackbar.nativeElement.classList.remove("fade-in--down");
					this.updatingSnackbar.nativeElement.classList.add("fade-in--up");
					this.isIconShown = false;
					this.updateText = "Update found! Updating..."
					this.sw.activateUpdate().then(() => {
						// this.isIconShown = true;
						// this.iconText = "task_alt";
						// this.updateText = "App updated!";
						// console.warn("App updated!")
						// Update activated successfully.
						// setTimeout(() => {
						// 	this.updatingSnackbar.nativeElement.classList.add("fade-in--down");
						// }, 1000);
					});
					break;
				case 'VERSION_READY':
					// Update is ready to be used.
					// this.isIconShown = true;
					// this.iconText = "new_releases";
					// this.updateText = "Using latest release!";
					// setTimeout(() => {
					// 	this.updatingSnackbar.nativeElement.classList.add("fade-in--down");
					// }, 1000);
					break;
				case 'VERSION_INSTALLATION_FAILED':
					// Update installation failed.
					this.isIconShown = true;
					this.iconText = "report";
					this.updateText = "Update failed. Check console and send a bug report.";
					console.error('Update failed:', event.error);
					break;
				case 'NO_NEW_VERSION_DETECTED':
					this.isIconShown = true;
					this.iconText = "task_alt";
					this.updateText = "Up-to-date!";
					setTimeout(() => {
						this.updatingSnackbar.nativeElement.classList.add("fade-in--down");
					}, 4000);
					break;
			}
		});
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.updatingSnackbar.nativeElement.classList.remove("fade-in--up");
		}, 1000);

		setTimeout(() => {
			if (!this.sw.isEnabled) {
				this.isIconShown = true;
				this.iconText = "report";
				this.updateText = "Updates unavailable";
				console.warn("Service worker disabled")
				setTimeout(() => {
					this.updatingSnackbar.nativeElement.classList.add("fade-in--down");
				}, 1500);
			}
		}, 2000);
	}
}
