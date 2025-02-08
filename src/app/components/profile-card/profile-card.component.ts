import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccentService } from 'src/app/services/accent-service.service';
import { ResponsiveImageComponent } from '../responsive-image/responsive-image.component';


@Component({
    selector: 'profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss'],
    imports: [ResponsiveImageComponent]
})
export class ProfileCardComponent implements OnInit, OnDestroy {
	private accent = inject(AccentService);

	name = "Dartegnian L. Velarde";
	tagline = "Software engineer, web developer, Linux enthusiast, DevOps engineer";

	images: Array<string>;
	coverImage: string;
	secondCoverImage: string | undefined;
	accentSubscription: Subscription;
	isSecondCoverImageActive = false;
	activeIndex: number;
	customImage: string | ArrayBuffer | null = null;

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {
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
