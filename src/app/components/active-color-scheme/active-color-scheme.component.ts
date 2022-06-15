import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'active-color-scheme',
	templateUrl: './active-color-scheme.component.html',
	styleUrls: ['./active-color-scheme.component.scss']
})
export class ActiveColorSchemeComponent implements OnInit {
	cssPath: string | SafeResourceUrl;
	materialSchemes: Array<String> = [
		"paint",
		"beach",
		"diner"
	];
	materialScheme: string = "paint";

	constructor(public sanitizer: DomSanitizer) {
		this.cssPath = `/assets/css/material-you--${this.materialScheme}.css`;
	}

	ngOnInit(): void {
	}

	set path(path) {
		this.cssPath = path;
	}

	get path() {
		return this.sanitizer.bypassSecurityTrustResourceUrl(this.cssPath as string);
	}

	changePath(): void {
		const scheme = this.materialSchemes[1];
		this.cssPath = `/assets/css/material-you--${scheme}.css`;
	}
}
