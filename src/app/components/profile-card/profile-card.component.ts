import { Component, OnInit, OnDestroy, inject, computed, effect, PLATFORM_ID } from '@angular/core';
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
	private accent = inject(AccentService);
	private platformId = inject<Object>(PLATFORM_ID);

	name = "Dartegnian L. Velarde";
	tagline = "IT senior developer, web developer, Linux enthusiast";

	readonly images: Array<string> = [...this.accent.images];
	coverImage: string = this.images[this.accent.activeIndex()];
	secondCoverImage: string | undefined;
	isSecondCoverImageActive = false;
	readonly activeIndex = computed(() => this.accent.activeIndex());
	readonly customImage = computed(() => this.accent.customImage());
	private currentIndex: number = this.accent.activeIndex();
	isBrowser: boolean = isPlatformBrowser(this.platformId);

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
				this.secondCoverImage = index === 0 ? this.images[this.currentIndex] as string : this.images[index];
				this.isSecondCoverImageActive = true;
			}
		}

		this.currentIndex = index;
	}
}
