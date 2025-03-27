import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccentService } from 'src/app/services/accent-service.service';
import { ResponsiveImageComponent } from '../responsive-image/responsive-image.component';
import { NgTemplateOutlet } from '@angular/common';
import { AccentSwitcherComponent } from '../accent-switcher/accent-switcher.component';

@Component({
    selector: 'hero-banner',
    templateUrl: './hero-banner.component.html',
    styleUrls: ['./hero-banner.component.scss'],
    imports: [AccentSwitcherComponent, NgTemplateOutlet, ResponsiveImageComponent],
	host: {ngSkipHydration: 'true'},
})
export class HeroBannerComponent implements OnInit, OnDestroy {
	private accent = inject(AccentService);

	images: Array<string>;
	heroImage: string;
	secondHeroImage: string | undefined;
	accentSubscription: Subscription;
	isSecondHeroImageActive = false;
	activeIndex: number;

	siteTitle = "Dartegnian's Portfolio";
	siteDescription = "An interactive portfolio website with Material You implementation. Colors dynamically adjust to a selected theme. Choose one below to get started.";

	isBrowser: boolean = false;
	externalIcons = [
		{
			icon: "mdi:instagram",
			text: "Instagram",
			link: "https://www.instagram.com/dartegnian/"
		},
		{
			icon: "mdi:linkedin",
			text: "LinkedIn",
			link: "https://www.linkedin.com/in/dartegnian/"
		},
		{
			icon: "mdi:spotify",
			text: "Spotify",
			link: "https://open.spotify.com/user/dartegnian"
		},
	];

	get customImage() {
		return this.accent.customImage;
	}

	constructor() {
		this.images = this.accent.images;
		this.heroImage = this.images[this.accent.activeIndex];
		this.activeIndex = Number(this.accent.activeIndex);

		this.accentSubscription = this.accent.accentSubscription.subscribe(
			(index: number) => {
				this.setHeroImage(index);
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
