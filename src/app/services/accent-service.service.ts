import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AccentService {
	images = [
		"paintings",
		"beach",
		"diner"
	];
	materialSchemes: Array<string> = [
		"paint",
		"beach",
		"diner"
	];
	accentSubscription: Subject<number>;

	constructor() {
		this.accentSubscription = new Subject();
	}

	public setAccent(index: number) {
		this.accentSubscription.next(index);
	}
}
