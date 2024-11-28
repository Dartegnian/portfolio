import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccentService } from 'src/app/services/accent-service.service';
import { LastfmService } from 'src/app/services/lastfm.service';

@Component({
	selector: 'hero-banner',
	templateUrl: './hero-banner.component.html',
	styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent implements OnInit, OnDestroy {
	images: Array<string>;
	heroImage: string;
	secondHeroImage: string | undefined;
	accentSubscription: Subscription;
	isSecondHeroImageActive = false;
	activeIndex: number;
	customImage: string | ArrayBuffer | null = null;


	siteTitle = "TomasPS Portfolio";
	siteDescription = "An interactive portfolio website with Material You implementation. Colors dynamically adjust to a selected theme. Choose one below to get started.";

	isBrowser: boolean = false;
	externalIcons = [
		{
			icon: "mdi:instagram",
			text: "Instagram",
			link: "https://www.instagram.com/toomas_ps/"
		},
		{
			icon: "mdi:linkedin",
			text: "LinkedIn",
			link: "https://www.linkedin.com/in/tomasps/"
		},
		{
			icon: "mdi:music",
			text: "Tidal",
			link: "https://tidal.com/browse/user/195041547"
		},
	];

  nowListening: any;
  lastfmSubscription!: Subscription;
  private refreshInterval: any;

  constructor(
		private accent: AccentService,
    private lastfmService: LastfmService
	) {
		this.images = this.accent.images;
		this.heroImage = this.images[this.accent.activeIndex];
		this.activeIndex = Number(this.accent.activeIndex);
		this.customImage = this.accent.customImage;

		this.accentSubscription = this.accent.accentSubscription.subscribe(
			(index: number) => {
				this.setHeroImage(index);
				this.customImage = this.accent.customImage;
			}
		);
	}

	ngOnInit(): void {
    this.fetchNowListening();
    this.refreshInterval = setInterval(() => {
      this.lastfmSubscription = this.lastfmService.getNowListening('YOUR_LASTFM_USERNAME').subscribe(
        (data) => {
          this.nowListening = data;
        }
      );
    }, 60000);
  }

	ngOnDestroy() {
		this.accentSubscription.unsubscribe();
    this.lastfmSubscription.unsubscribe();
    clearInterval(this.refreshInterval);
  }

  fetchNowListening() {
    this.lastfmSubscription = this.lastfmService.getNowListening('YOUR_LASTFM_USERNAME').subscribe(
      (data) => {
        this.nowListening = data;
      }
    );
  }
	setHeroImage(index: number) {
		if (this.activeIndex !== index) {
			if (this.isSecondHeroImageActive) {
				this.heroImage = index === 0 ? this.images[this.activeIndex] : this.images[index];
				this.isSecondHeroImageActive = false;
			} else {
				this.secondHeroImage = index === 0 ? this.images[this.activeIndex] as string : this.images[index];
				this.isSecondHeroImageActive = true;
			}
			this.activeIndex = index;
		}
	}
}
