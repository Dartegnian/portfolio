import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

	constructor() {
		this.accentSubscription = new Subject();
	}

	public setAccent(index: number) {
		this.accentSubscription.next(index);
	}
}
