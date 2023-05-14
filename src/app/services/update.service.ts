import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";
import { filter, interval, map } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class UpdateService {

	constructor(public updates: SwUpdate) {
	  if (updates.isEnabled) {
		interval(60000).subscribe(() => updates.checkForUpdate());
	  }
	}
  
	public checkForUpdates(): void {
		this.updates.versionUpdates.
		  pipe(filter((evt: { type: string; }): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
			map(evt => ({
			  type: 'UPDATE_AVAILABLE',
			  current: evt.currentVersion,
			  available: evt.latestVersion,
			}))).subscribe(() => {
			  this.promptUser();
			});
	  }
  
	private promptUser(): void {
	  console.log('Updating PWA');
	  this.updates.activateUpdate().then(() => document.location.reload()); 
	}
}
