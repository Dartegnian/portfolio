import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccentService } from 'src/app/services/accent-service.service';

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

	isBrowser: boolean = false;

	constructor(
		private accent: AccentService
	) {
		this.images = this.accent.images;
		this.heroImage = this.images[this.accent.activeIndex];
		this.activeIndex = Number(this.accent.activeIndex);

		this.accentSubscription = this.accent.accentSubscription.subscribe(
			(index: number) => {
				this.setHeroImage(index)
			}
		);
	}

	ngOnInit(): void {
	}

	ngOnDestroy() {
		this.accentSubscription.unsubscribe();
	}

	setHeroImage(index: number) {
		if (this.activeIndex !== index) {
			if (this.isSecondHeroImageActive) {
				this.heroImage = this.images[index];
				this.isSecondHeroImageActive = false;
			} else {
				this.secondHeroImage = this.images[index];
				this.isSecondHeroImageActive = true;
			}
			this.activeIndex = index;
		}
	}
}
