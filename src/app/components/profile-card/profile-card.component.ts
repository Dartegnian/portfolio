import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccentService } from 'src/app/services/accent-service.service';

@Component({
	selector: 'profile-card',
	templateUrl: './profile-card.component.html',
	styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
	name = "Dartegnian L. Velarde";
	tagline = "Software engineer, web developer, Linux enthusiast, DevOps engineer";

	images: Array<string>;
	coverImage: string;
	secondCoverImage: string;
	accentSubscription: Subscription;
	isSecondCoverImageActive = false;


	constructor(
		private accent: AccentService
	) {
		this.images = this.accent.images;
		this.coverImage = this.images[0];
		this.secondCoverImage = this.coverImage;

		this.accentSubscription = this.accent.accentSubscription.subscribe(
			(index: number) => {
				setTimeout(() =>
					this.setCoverImage(index)
				, 25);
			}
		);
	}

	ngOnInit(): void {
	}

	setCoverImage(index: number) {
		if (!this.isSecondCoverImageActive) {
			this.secondCoverImage = this.images[index];
			this.isSecondCoverImageActive = true;
		} else {
			this.coverImage = this.images[index];
			this.isSecondCoverImageActive = false;
		}
	}
}
