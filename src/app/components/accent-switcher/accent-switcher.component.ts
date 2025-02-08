import { Component, OnDestroy, ChangeDetectorRef, inject, PLATFORM_ID, AfterContentInit, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccentService } from 'src/app/services/accent-service.service';

import { ResponsiveImageComponent } from '@components/responsive-image/responsive-image.component';
import { IdbService } from '@services/idb.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'accent-switcher',
    templateUrl: './accent-switcher.component.html',
    styleUrls: ['./accent-switcher.component.scss'],
    imports: [ResponsiveImageComponent]
})
export class AccentSwitcherComponent implements OnInit, AfterContentInit, OnDestroy {
	private idb = inject(IdbService);
	private accent = inject(AccentService);
	private changeDetectorRef = inject(ChangeDetectorRef);

	private platformId = inject<Object>(PLATFORM_ID);
	isBrowser: boolean = isPlatformBrowser(this.platformId);

	customImageSubscription: Subscription;
	customImage: string | ArrayBuffer | null = null;
	titleMappings: { [key: string]: string } = {
		"primary": "Dartegnian Blue",
		"secondary": "Vibrant Green",
		"tertiary": "Filling Station Purple",
	};

	get images() {
		return this.accent.images;
	}

	get activeIndex() {
		return this.images[this.accent.activeIndex];
	}

	constructor() {
		this.customImageSubscription = this.accent.customImageSubscription.subscribe(
			(image: string | ArrayBuffer) => {
				this.customImage = image;
			}
		);
	}

	async ngOnInit(): Promise<void> {
		if (this.isBrowser) {
			const customImage = await this.idb.getData("Material You", "customImage");
			if (customImage) {
					this.customImage = customImage;
					this.accent.setCustomImage(customImage, true);
			}
		}
	}

	async ngAfterContentInit(): Promise<void> {
		if (this.isBrowser && !this.accent.isPlaying) {
			setTimeout(async () => {
				await this.accent.setThemeFromM3();		
			}, 100);
		}
	}

	ngOnDestroy(): void {
		this.customImageSubscription.unsubscribe();
	}

	changeAccent(image: number, imageName: string): void {
		if (imageName !== this.activeIndex) {
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
		if (this.accent.activeIndex === 0) {
			this.changeAccent(1, "primary");
		}
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
