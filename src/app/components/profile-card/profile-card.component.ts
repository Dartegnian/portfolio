import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccentService } from 'src/app/services/accent-service.service';

@Component({
	selector: 'profile-card',
	templateUrl: './profile-card.component.html',
	styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit, OnDestroy {
	name = "Tomas Palma Sanchez";
	tagline = "Software engineer, web developer, Linux and Selfhosting enthusiast";

	images: Array<string>;
	coverImage: string;
	secondCoverImage: string | undefined;
	accentSubscription: Subscription;
	isSecondCoverImageActive = false;
	activeIndex: number;
	customImage: string | ArrayBuffer | null = null;

	constructor(
		private accent: AccentService
	) {
		this.images = this.accent.images;
		this.coverImage = this.images[this.accent.activeIndex];
		this.activeIndex = Number(this.accent.activeIndex);

		this.accentSubscription = this.accent.accentSubscription.subscribe(
			(index: number) => {
				this.setCoverImage(index);
				this.customImage = this.accent.customImage;
			}
		);
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.accentSubscription.unsubscribe();
	}

	setCoverImage(index: number) {
		if (this.activeIndex !== index) {
			if (this.isSecondCoverImageActive) {
				this.coverImage = index === 0 ? this.images[this.activeIndex] : this.images[index];
				this.isSecondCoverImageActive = false;
			} else {
				this.secondCoverImage = index === 0 ? this.images[this.activeIndex] as string : this.images[index];
				this.isSecondCoverImageActive = true;
			}
		}

		this.activeIndex = index;
	}
}
