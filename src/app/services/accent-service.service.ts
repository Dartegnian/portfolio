import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AccentService {
	images = [
		"diner",
		"paintings",
		"beach",
		"field"
	];
	materialSchemes: Array<string> = [
		"diner",
		"paint",
		"beach",
		"field"
	];
	accentSubscription: Subject<number>;

	constructor() {
		this.accentSubscription = new Subject();
	}

	public setAccent(index: number) {
		this.accentSubscription.next(index);
	}
}
