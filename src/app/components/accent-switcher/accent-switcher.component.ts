import { Component, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccentService } from 'src/app/services/accent-service.service';
import { ResponsiveImageComponent } from '../responsive-image/responsive-image.component';


@Component({
    selector: 'accent-switcher',
    templateUrl: './accent-switcher.component.html',
    styleUrls: ['./accent-switcher.component.scss'],
    standalone: true,
    imports: [ResponsiveImageComponent]
})
export class AccentSwitcherComponent implements OnDestroy {
	private accent = inject(AccentService);
	private changeDetectorRef = inject(ChangeDetectorRef);

	images: Array<string>;
	selected: string;
	accentSubscription: Subscription;
	customImageSubscription: Subscription;
	customImage: string | ArrayBuffer | null = null;
	index: number = 1;
	titleMappings: { [key: string]: string } = {
		"primary": "Dartegnian Cyan",
		"secondary": "Vibrant Green",
		"tertiary": "Filling Station Purple",
	};

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {
		this.images = this.accent.images;
		this.selected = this.images[this.accent.activeIndex];
		this.customImage = this.accent.customImage;
		this.index = this.accent.activeIndex;

		this.customImageSubscription = this.accent.customImageSubscription.subscribe(
			(image: string | ArrayBuffer) => {
				this.customImage = image;
			}
		);

		this.accentSubscription = this.accent.accentSubscription.subscribe(
			(index: number) => {
				this.customImage = this.accent.customImage;
				this.changeDetectorRef.detectChanges();
				this.selected = this.images[index];
				this.index = index;
			}
		);
	}

	ngOnDestroy(): void {
		this.accentSubscription.unsubscribe();
		this.customImageSubscription.unsubscribe();
	}

	changeAccent(image: number, imageName: string): void {
		if (imageName !== this.selected) {
			this.selected = this.images[image];
			this.accent.setAccent(image);
		}
	}

	async onFileSelected(event: any) {
		const file = event.target.files[0];
		this.customImage = await this.getFileDataUrl(file);
		this.changeDetectorRef.detectChanges();
		this.setCustomImage();
	}

	setCustomImage() {
		this.accent.setCustomImage(this.customImage as string | ArrayBuffer);
	}

	removeCustomImage() {
		this.customImage = null;
		this.accent.setCustomImage(null, true);
		this.changeAccent(1, "primary");
	}

	private getFileDataUrl(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = (event: any) => {
				resolve(event.target.result);
			};

			reader.onerror = (event: any) => {
				reject(event.target.error);
			};

			reader.readAsDataURL(file);
		});
	}
}
