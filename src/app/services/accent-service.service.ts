import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IdbService } from '@services/idb.service';
import { Meta } from '@angular/platform-browser';
import { Theme, argbFromHex, themeFromImage, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";

@Injectable({
	providedIn: 'root'
})
export class AccentService {
	images = [
		"custom",
		"primary",
		"secondary",
		"tertiary"
	];
	themeMode: "light" | "dark" = "light";
	themeSubscription: Subject<"light" | "dark">;
	accentSubscription: Subject<number>;
	activeIndex = 1;

	themeRawColorData: Theme | undefined;

	customImage: string | ArrayBuffer | null = null;
	customImageSubscription: Subject<string | ArrayBuffer>;

	isPlaying = false;

	constructor(
		private idb: IdbService,
		private meta: Meta
	) {
		this.themeSubscription = new Subject();
		this.accentSubscription = new Subject();
		this.customImageSubscription = new Subject();
	}

	public setAccent(index: number) {
		index = Number(index);
		this.activeIndex = index;
		this.accentSubscription.next(index);
		this.setThemeInIdb(index);

		if (!this.isPlaying) {
			this.setThemeFromM3();
		}
	}

	public setThemeMode(mode: "light" | "dark") {
		this.themeMode = mode;
		this.themeSubscription.next(mode);

		if (!this.isPlaying) {
			this.setThemeFromM3();
		}
	}

	public setMetaTagColor(theme?: Theme) {
		const primaryColorNumber: number = theme ? theme.schemes[this.themeMode].primaryContainer as number : this.themeRawColorData?.schemes[this.themeMode].primaryContainer as number;

		this.meta.updateTag({
			name: "theme-color",
			content: this.argbToRgb(
				primaryColorNumber
			)
		});
	}

	setThemeInIdb(i: number) {
		this.idb.connectToIDB();
		this.idb.writeToTheme("Material You", {
			imageName: this.images[i],
			materialScheme: this.images[i],
			themeIndex: `${i}`
		});
	}

	async setThemeFromM3() {
		const theme = await this.setM3ColorAndTarget(
			"accent-" + this.images[this.activeIndex],
			document.body
		);
		if (theme) {
			this.themeRawColorData = theme;
		}
		this.setMetaTagColor();
	}

	/**
	 * Converts ARGB color value to RGB
	 * 
	 * Reference: https://stackoverflow.com/questions/12579598/how-can-i-convert-argb-to-hex-in-javascript
	 * @param color ARGB color
	 * @returns Hex value
	 */
	argbToRgb(color: number) {
		return '#' + ('000000' + (color & 0xFFFFFF).toString(16)).slice(-6);
	}

	setCustomImage(customImage: string | ArrayBuffer | null, noTriggerAccent?: boolean) {
		this.customImage = customImage;

		if (!noTriggerAccent) {
			this.setAccent(0);
		}

		if (customImage) {
			this.customImageSubscription.next(customImage);
		}

		this.idb.writeToTheme("Material You", {
			customImage: customImage?.toString() || ""
		});
	}

	/*
	rgbToHex(rgb: RGBColor): string {
		const [r, g, b] = rgb.map((color) => Math.round(color).toString(16).padStart(2, '0'));
		return `#${r}${g}${b}`;
	}

	getColorFromImage(imgElement: HTMLImageElement): Promise<RGBColor> {
		if (imgElement.complete) {
			// If the image is already loaded, directly get the color.
			const colorThief = new ColorThief();
			const color: RGBColor = colorThief.getColor(imgElement, 100);
			return Promise.resolve(color);
		} else {
			// If the image is not loaded yet, wait for the 'onload' event to get the color.
			return new Promise((resolve, reject) => {
				imgElement.onload = () => {
					const colorThief = new ColorThief();
					const color: RGBColor = colorThief.getColor(imgElement, 100);
					resolve(color);
				};

				imgElement.onerror = () => {
					// If there is an error loading the image or getting the color, reject the promise.
					reject(new Error('Failed to load the image or get the color.'));
				};
			});
		}
	}*/


	async setM3ColorAndTarget(
		parentOfImg: string,
		target: string | HTMLElement,
		isSiteFrameThemed?: boolean
	) {
		let theme = null;
		const parentElement = document.getElementById(parentOfImg);
		// const colorThief = new ColorThief();

		if (parentElement) {
			const imgElement = parentElement.querySelector("img");
			let color = "";

			if (imgElement) {
				// color = this.rgbToHex(await this.getColorFromImage(imgElement));
				// theme = themeFromSourceColor(argbFromHex(color));
				theme = await themeFromImage(imgElement as HTMLImageElement);
			} else {
				console.error("No <img> element found within the parent element.");
				theme = themeFromSourceColor(argbFromHex("#b0b2bd"));
			}
		} else {
			console.error("Parent element with ID '" + parentOfImg + "' not found.");
			theme = themeFromSourceColor(argbFromHex("#b0b2bd"));
		}

		if (theme) {
			applyTheme(
				theme,
				{
					target: typeof target === "string" ? document.getElementById(target) as HTMLElement : target,
					dark: this.themeMode === "light" ? false : true
				}
			);
		}

		if (theme && isSiteFrameThemed) {
			this.setMetaTagColor(theme);
		}

		return theme;
	}

	setIsPlaying(isPlaying: boolean): void {
		this.isPlaying = isPlaying;
	}
}
