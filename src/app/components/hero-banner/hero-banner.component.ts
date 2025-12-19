import { Component, PLATFORM_ID, computed, effect, inject } from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { AccentService } from 'src/app/services/accent-service.service';
import { ResponsiveImageComponent } from '../responsive-image/responsive-image.component';
import { AccentSwitcherComponent } from '../accent-switcher/accent-switcher.component';

@Component({
    selector: 'hero-banner',
    templateUrl: './hero-banner.component.html',
    styleUrls: ['./hero-banner.component.scss'],
    imports: [AccentSwitcherComponent, NgTemplateOutlet, ResponsiveImageComponent],
	host: {ngSkipHydration: 'true'},
})
export class HeroBannerComponent {
	private readonly accent = inject(AccentService);
	private readonly platformId = inject<Object>(PLATFORM_ID);
	readonly isBrowser = isPlatformBrowser(this.platformId);

	secondCoverImage: string | undefined;
	isSecondCoverImageActive = false;

	readonly images: Array<string> = [...this.accent.images];
	private currentIndex: number = this.accent.activeIndex() === 0 ? 1 : this.accent.activeIndex();
	coverImage: string = this.images[this.currentIndex];

	readonly activeIndex = computed(() => this.accent.activeIndex());
	readonly customImageSrc = computed(() => {
		const img = this.accent.customImage();
		return typeof img === 'string' ? img : null;
	});

	siteTitle = "Dartegnian's Portfolio";
	siteDescription = "An interactive portfolio website with Material You implementation. Colors dynamically adjust to a selected theme. Choose one below to get started.";

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

	constructor() {
		if (!this.isBrowser) return;

		effect(() => {
			const index = this.accent.activeIndex();
			this.setCoverImage(index);
		});
	}

	setCoverImage(index: number) {
		if (this.currentIndex !== index) {
			if (this.isSecondCoverImageActive) {
				this.coverImage = index === 0 ? this.images[this.currentIndex] : this.images[index];
				this.isSecondCoverImageActive = false;
			} else {
				this.secondCoverImage = index === 0 ? this.images[this.currentIndex] : this.images[index];
				this.isSecondCoverImageActive = true;
			}
		}

		this.currentIndex = index;
	}
}
