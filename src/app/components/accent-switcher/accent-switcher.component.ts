import { Component, OnInit } from '@angular/core';
import { AccentService } from 'src/app/services/accent-service.service';

@Component({
	selector: 'accent-switcher',
	templateUrl: './accent-switcher.component.html',
	styleUrls: ['./accent-switcher.component.scss']
})
export class AccentSwitcherComponent implements OnInit {
	images: Array<string>;
	selected = "paintings";

	constructor(
		private accent: AccentService
	) {
		this.images = this.accent.images;
	}

	ngOnInit(): void {
	}

	changeAccent(image: number, imageName: string): void {
		if (imageName !== this.selected) {
			this.selected = this.images[image];
			this.accent.setAccent(image);
		}
	}
}
