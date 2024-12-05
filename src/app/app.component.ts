import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AccentService } from '@services/accent-service.service';
import { IdbService } from '@services/idb.service';
import { UpdateService } from '@services/update.service';
import { TranslateService } from '@ngx-translate/core'; // Assuming you are using ngx-translate for i18n


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	isBrowser: boolean = false;


  constructor(
		private idb: IdbService,
		private accent: AccentService,
		@Inject(PLATFORM_ID) private platformId: Object,
		private sw: UpdateService,
    private translate: TranslateService
	) {
		this.sw.checkForUpdates();
		this.isBrowser = isPlatformBrowser(this.platformId);
    this.translate.setDefaultLang('en');
	}


	async ngOnInit() {
		if (this.isBrowser) {
			this.idb.connectToIDB();
			const customImage = await this.idb.getData("Material You", "customImage");

			if (customImage) {
				this.accent.setCustomImage(customImage, true);
			}

			const accentIndex = (await this.idb.getData("Material You", "themeIndex")) || 1;

			if (accentIndex !== "1") {
				this.accent.setAccent(accentIndex);
			}
		}
	}
}
