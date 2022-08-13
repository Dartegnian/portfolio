import { Component, OnInit, OnDestroy, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AccentService } from 'src/app/services/accent-service.service';

@Component({
	selector: 'active-color-scheme',
	templateUrl: './active-color-scheme.component.html',
	styleUrls: ['./active-color-scheme.component.scss']
})
export class ActiveColorSchemeComponent implements OnInit, OnDestroy {
	cssPath: string | SafeResourceUrl | null;
	materialSchemes: Array<string>;
	defaultScheme: string;
	accentSubscription: Subscription;
	head = document.getElementsByTagName('head')[0];
	style = document.createElement('link');
	safeCssPath: SafeResourceUrl | undefined;

	constructor(
		public sanitizer: DomSanitizer,
		private accent: AccentService
	) {
		this.materialSchemes = this.accent.materialSchemes;
		this.defaultScheme = this.materialSchemes[this.accent.activeIndex];

		this.cssPath = `/assets/css/material-you--${this.defaultScheme}.css`;
		this.safeCssPath = this.sanitizer.bypassSecurityTrustResourceUrl(this.cssPath as string);

		this.accentSubscription = this.accent.accentSubscription.subscribe(
			(index: number) => {
				this.changePath(index);
			}
		);
	}

	ngOnInit(): void {
		this.appendLinkTag();
	}

	ngOnDestroy() {
		this.accentSubscription.unsubscribe();
	}

	appendLinkTag() {
		this.style.href = this.path as string;
		this.style.type = "text/css";
		this.style.rel = "stylesheet";
		this.head.appendChild(this.style);
	}

	set path(path) {
		this.cssPath = path;
	}

	get path() {
		return this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(this.cssPath as string));
	}

	changePath(scheme: number): void {
		const oldSchemePath = this.path;
		const oldStyle = this.style;
		oldStyle.href = oldSchemePath as string;
		this.cssPath = `/assets/css/material-you--${this.materialSchemes[scheme]}.css`;
		this.style.href = this.path as string;
		this.head.replaceChild(oldStyle, this.style);
		setTimeout(() => {
			this.safeCssPath = this.sanitizer.bypassSecurityTrustResourceUrl(this.cssPath as string);
		}, 75);
	}
}
