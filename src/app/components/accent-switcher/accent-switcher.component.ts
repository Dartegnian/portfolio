import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccentService } from 'src/app/services/accent-service.service';

@Component({
	selector: 'accent-switcher',
	templateUrl: './accent-switcher.component.html',
	styleUrls: ['./accent-switcher.component.scss']
})
export class AccentSwitcherComponent implements OnInit, OnDestroy {
	images: Array<string>;
	selected: string;
	accentSubscription: Subscription;

	constructor(
		private accent: AccentService
	) {
		this.images = this.accent.images;
		this.selected = this.images[this.accent.activeIndex];

		this.accentSubscription = this.accent.accentSubscription.subscribe(
			(index: number) => {
				setTimeout(() =>
					this.selected = this.images[index]
				, 25);
			}
		);
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.accentSubscription.unsubscribe();
	}

	changeAccent(image: number, imageName: string): void {
		if (imageName !== this.selected) {
			this.selected = this.images[image];
			this.accent.setAccent(image);
		}
	}
}
