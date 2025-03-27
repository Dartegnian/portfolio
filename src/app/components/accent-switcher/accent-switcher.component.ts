import { Component, OnDestroy, ChangeDetectorRef, inject, PLATFORM_ID, AfterViewChecked, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import { ResponsiveImageComponent } from '@components/responsive-image/responsive-image.component';

import { AccentService } from '@services/accent-service.service';
import { IdbService } from '@services/idb.service';

@Component({
	selector: 'accent-switcher',
	templateUrl: './accent-switcher.component.html',
	styleUrls: ['./accent-switcher.component.scss'],
	imports: [ResponsiveImageComponent]
})
export class AccentSwitcherComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
	private idb = inject(IdbService);
	private accent = inject(AccentService);
	private changeDetectorRef = inject(ChangeDetectorRef);

	private platformId = inject<Object>(PLATFORM_ID);
	isBrowser: boolean = isPlatformBrowser(this.platformId);

	private hasAppliedTheme = false;
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

	ngAfterViewInit() {
		setTimeout(() => {
			this.customImage = this.accent.customImage;
		}, 0);
	}

	async ngAfterViewChecked(): Promise<void> {
		if (this.isBrowser && !this.accent.isPlaying && this.activeIndex === "custom") {
			const parentEl = document.getElementById("accent-custom");
			if (parentEl && !this.hasAppliedTheme) {
				this.hasAppliedTheme = true;
				this.accent.setThemeFromM3();
			}
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
