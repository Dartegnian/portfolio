import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AccentService } from '@services/accent-service.service';
import { IdbService } from '@services/idb.service';
import { UpdateService } from '@services/update.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = "Dartegnian's Portfolio";
	isBrowser: boolean = false;

	constructor(
		private idb: IdbService,
		private accent: AccentService,
		@Inject(PLATFORM_ID) private platformId: Object,
		private sw: UpdateService
	) {
		this.isBrowser = isPlatformBrowser(this.platformId);
		this.sw.checkForUpdates();
	}

	async ngOnInit() {
		if (this.isBrowser) {
			this.idb.connectToIDB();
			const accentIndex = (await this.idb.getData("Material You", "themeIndex")) || 0;
			this.accent.setAccent(accentIndex)
		}
	}
}
