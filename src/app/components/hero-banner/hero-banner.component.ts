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
	secondHeroImage: string;
	accentSubscription: Subscription;
	isSecondHeroImageActive = false;


	constructor(
		private accent: AccentService
	) {
		this.images = this.accent.images;
		this.heroImage = this.images[0];
		this.secondHeroImage = this.heroImage;

		this.accentSubscription = this.accent.accentSubscription.subscribe(
			(index: number) => {
				setTimeout(() =>
					this.setHeroImage(index)
				, 25);
			}
		);
	}

	ngOnInit(): void {
	}

	ngOnDestroy() {
		this.accentSubscription.unsubscribe();
	}

	setHeroImage(index: number) {
		if (!this.isSecondHeroImageActive) {
			this.secondHeroImage = this.images[index];
			this.isSecondHeroImageActive = true;
		} else {
			this.heroImage = this.images[index];
			this.isSecondHeroImageActive = false;
		}
	}
}
