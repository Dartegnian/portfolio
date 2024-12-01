import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AccentService } from '@services/accent-service.service';
import { IdbService } from '@services/idb.service';
import { UpdateService } from '@services/update.service';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { UpdatingSnackbarComponent } from './components/updating-snackbar/updating-snackbar.component';
import { EmailCtaComponent } from './components/resume-request/resume-request.component';
import { SkillListComponent } from './components/skill-list/skill-list.component';
import { LifeAtAGlanceComponent } from './components/life-at-a-glance/life-at-a-glance.component';
import { SkillInfoComponent } from './components/skill-info/skill-info.component';
import { SkillPictureComponent } from './components/skill-picture/skill-picture.component';
import { OtherSitesComponent } from './components/other-sites/other-sites.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NgIf, ThemeSwitcherComponent, HeroBannerComponent, ProfileCardComponent, ProfileInfoComponent, OtherSitesComponent, SkillPictureComponent, SkillInfoComponent, LifeAtAGlanceComponent, SkillListComponent, EmailCtaComponent, UpdatingSnackbarComponent, FooterComponent, RouterOutlet]
})
export class AppComponent implements OnInit {
	isBrowser: boolean = false;

	constructor(
		private idb: IdbService,
		private accent: AccentService,
		@Inject(PLATFORM_ID) private platformId: Object,
		private sw: UpdateService
	) {
		this.sw.checkForUpdates();
		this.isBrowser = isPlatformBrowser(this.platformId);
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
