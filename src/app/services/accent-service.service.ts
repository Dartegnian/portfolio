import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { IdbService } from '@services/idb.service';
import { Meta } from '@angular/platform-browser';
import { Theme, argbFromHex, themeFromImage, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";
import { NowPlayingService } from '@services/now-playing.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class AccentService {
	private idb = inject(IdbService);
	private meta = inject(Meta);
	private nowPlayingService = inject(NowPlayingService);

	images = [
		"custom",
		"primary",
		"secondary",
		"tertiary"
	];
	themeMode: "light" | "dark";
	themeSubscription: Subject<"light" | "dark"> = new Subject();
	accentSubscription: Subject<number> = new Subject();
	activeIndex = 1;

	themeRawColorData: Theme | undefined;

	customImage: string | ArrayBuffer | null = null;
	customImageSubscription: Subject<string | ArrayBuffer> = new Subject();

	private platformId = inject<Object>(PLATFORM_ID);
	isBrowser: boolean = isPlatformBrowser(this.platformId);

	get isPlaying(): boolean {
		return this.nowPlayingService.isPlaying;
	}

	constructor() {
		if (this.isBrowser) {
			this.themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			this.idb.connectToIDB();
			this.fetchDataFromIdb();
		} else {
			this.themeMode = "light";
		}
	}

	fetchDataFromIdb() {
		this.idb.getData("Material You", "themeIndex").then(
			(accentIndex: string) => {
				if (accentIndex !== "1" && accentIndex !== null) {
					this.setAccent(Number(accentIndex), true);
				}
			}
		);

		this.idb.getData("Material You", "preferredColorScheme").then(
			(preferredScheme) => {
				if (preferredScheme) {
					this.setThemeMode(preferredScheme);
				} else {
					this.setThemeMode(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
				}
			}
		);
	}

	public setAccent(index: number, noTriggerAccent?: boolean) {
		index = Number(index);
		this.activeIndex = index;
		this.accentSubscription.next(index);
		this.setThemeInIdb(index);

		if (!this.isPlaying && !noTriggerAccent) {
			this.setThemeFromM3();
		}
	}

	public setThemeMode(mode: "light" | "dark") {
		this.themeMode = mode;
		this.themeSubscription.next(mode);

		const isDark = mode === "dark";
		document.body.classList.toggle("dark-theme", isDark);
		document.body.classList.toggle("light-theme", !isDark);

		if (!this.isPlaying) {
			this.setThemeFromM3();
		}

		this.idb.writeToTheme("Material You", {
			preferredColorScheme: mode,
		});
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

		if (customImage) {
			this.customImageSubscription.next(customImage);
		}

		if (!noTriggerAccent) {
			this.setAccent(0);
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
				console.log("No <img> element found within the parent element.");
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
}
