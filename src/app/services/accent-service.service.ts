import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IdbService } from '@services/idb.service';
import { Meta } from '@angular/platform-browser';
import { Theme, argbFromHex, sourceColorFromImage } from "@material/material-color-utilities";
import { themeFromSourceColor, applyTheme } from "@material/material-color-utilities";

@Injectable({
	providedIn: 'root'
})
export class AccentService {
	images = [
		"custom",
		"primary",
		"secondary",
		"tertiary",
		"quaternary"
	];
	themeMode: "light" | "dark" = "light";
	accentSubscription: Subject<number>;
	activeIndex = 1;

	themeRawColorData: Theme | undefined;

	customImage: string | ArrayBuffer | null = null;
	customImageSubscription: Subject<string | ArrayBuffer>;

	constructor(
		private idb: IdbService,
		private meta: Meta
	) {
		this.accentSubscription = new Subject();
		this.customImageSubscription = new Subject();
	}

	public setAccent(index: number) {
		index = Number(index);
		this.activeIndex = index;
		this.accentSubscription.next(index);
		this.setThemeFromM3();
		this.setThemeInIdb(index);
	}

	public setThemeMode(mode: "light" | "dark") {
		this.themeMode = mode;
		this.setThemeFromM3();
	}

	public setMetaTagColor() {
		this.meta.updateTag({
			name: "theme-color",
			content: this.argbToRgb(
				this.themeRawColorData?.schemes[this.themeMode].primaryContainer as number
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

	async setThemeFromM3(element?: HTMLImageElement) {
		let themeColor = 0;
		const parentElement = document.getElementById("accent-" + this.images[this.activeIndex]);

		if (parentElement) {
			const imgElement = parentElement.querySelector("img");
			if (imgElement) {
				themeColor = await sourceColorFromImage(imgElement as HTMLImageElement);
			} else {
				console.error("No <img> element found within the parent element.");
				themeColor = argbFromHex("#0099ff");
			}
		} else {
			console.error("Parent element with ID 'main-image' not found.");
		}

		this.themeRawColorData = themeFromSourceColor(themeColor);

		// Print out the theme as JSON
		// console.log(JSON.stringify(theme, null, 2));

		// Check if the user has dark mode turned on
		const systemDark = this.themeMode === "light" ? false : true;

		applyTheme(this.themeRawColorData, { target: document.body, dark: systemDark });
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
}
