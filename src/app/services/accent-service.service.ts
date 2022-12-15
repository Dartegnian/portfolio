import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IdbService } from '@services/idb.service';
import { Meta } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root'
})
export class AccentService {
	images = [
		"primary",
		"secondary",
		"tertiary",
		"quaternary"
	];
	materialSchemes: Array<string> = [
		"primary",
		"secondary",
		"tertiary",
		"quaternary"
	];
	lightColors: Array<string> = [
		"#CDE5FF",
		"#9af6b3",
		"#ffd7f0",
		"#eedbff"
	];
	darkColors: Array<string> = [
		"#004b74",
		"#00522a",
		"#722b65",
		"#5a318a"
	];
	themeMode: "light" | "dark" = "light";
	accentSubscription: Subject<number>;
	activeIndex = 0;

	constructor(
		private idb: IdbService,
		private meta: Meta
	) {
		this.accentSubscription = new Subject();
	}

	public setAccent(index: number) {
		this.activeIndex = index;
		this.accentSubscription.next(index);
		this.setThemeInIdb(index);
		this.setMetaTagColor();
	}
	
	public setThemeMode(mode: "light" | "dark") {
		this.themeMode = mode;
		this.setMetaTagColor();
	}

	public setMetaTagColor() {
		if (this.themeMode === "light") {
			this.meta.updateTag({name: "theme-color", content: this.lightColors[this.activeIndex]});
		} else {
			this.meta.updateTag({name: "theme-color", content: this.darkColors[this.activeIndex]});
		}
	}

	setThemeInIdb(i: number) {
		this.idb.connectToIDB();
		this.idb.writeToTheme("Material You", {
			imageName: this.images[i],
			materialScheme: this.materialSchemes[i],
			themeIndex: `${i}`
		});
	}
}
