import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IdbService } from '@services/idb.service';

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
	accentSubscription: Subject<number>;
	activeIndex = 0;

	constructor(private idb: IdbService) {
		this.accentSubscription = new Subject();
	}

	public setAccent(index: number) {
		this.activeIndex = index;
		this.accentSubscription.next(index);
		this.setThemeInIdb(index);
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
