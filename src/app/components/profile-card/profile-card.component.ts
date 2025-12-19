import { Component, PLATFORM_ID, computed, effect, inject } from '@angular/core';
import { AccentService } from 'src/app/services/accent-service.service';
import { ResponsiveImageComponent } from '../responsive-image/responsive-image.component';
import { isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss'],
    imports: [ResponsiveImageComponent]
})
export class ProfileCardComponent {
	private readonly accent = inject(AccentService);
	private readonly platformId = inject<Object>(PLATFORM_ID);

	name = "Dartegnian L. Velarde";
	tagline = "IT senior developer, web developer, Linux enthusiast";

	readonly images: Array<string> = [...this.accent.images];
	private currentIndex: number = this.accent.activeIndex() === 0 ? 1 : this.accent.activeIndex();
	coverImage: string = this.images[this.currentIndex];
	secondCoverImage: string | undefined;
	isSecondCoverImageActive = false;
	readonly activeIndex = computed(() => this.accent.activeIndex());
	readonly customImageSrc = computed(() => {
		const img = this.accent.customImage();
		return typeof img === 'string' ? img : null;
	});
	readonly isBrowser = isPlatformBrowser(this.platformId);

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
