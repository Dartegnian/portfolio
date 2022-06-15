import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AccentService } from 'src/app/services/accent-service.service';

@Component({
	selector: 'active-color-scheme',
	templateUrl: './active-color-scheme.component.html',
	styleUrls: ['./active-color-scheme.component.scss']
})
export class ActiveColorSchemeComponent implements OnInit, OnDestroy {
	cssPath: string | SafeResourceUrl;
	materialSchemes: Array<string>;
	defaultScheme: string;
	accentSubscription: Subscription;

	constructor(
		public sanitizer: DomSanitizer,
		private accent: AccentService
	) {
		this.materialSchemes = this.accent.materialSchemes;
		this.defaultScheme = this.materialSchemes[0];

		this.cssPath = `/assets/css/material-you--${this.defaultScheme}.css`;

		this.accentSubscription = this.accent.accentSubscription.subscribe(
			(index: number) => {
				this.changePath(index);
			}
		);
	}

	ngOnInit(): void {
	}

	ngOnDestroy() {
		this.accentSubscription.unsubscribe();
	}

	set path(path) {
		this.cssPath = path;
	}

	get path() {
		return this.sanitizer.bypassSecurityTrustResourceUrl(this.cssPath as string);
	}

	changePath(scheme: number): void {
		this.cssPath = `/assets/css/material-you--${this.materialSchemes[scheme]}.css`;
	}
}
