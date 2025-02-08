import { Component, OnInit, Inject, HostBinding, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { AccentService } from '@services/accent-service.service';
import { IdbService } from '@services/idb.service';

@Component({
	selector: 'theme-switcher',
	templateUrl: './theme-switcher.component.html',
	styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {
	private idb = inject(IdbService);
	private accent = inject(AccentService);
	private platformId = inject<Object>(PLATFORM_ID);
	private router = inject(Router);
	private readonly isBrowser = isPlatformBrowser(this.platformId);
	isHomePage: boolean = false;

	/**
	 * The `top` style we apply to `:host`.
	 * We bind to it via @HostBinding('style.top').
	 */
	@HostBinding('style.top') top: string = '';

	constructor() {}

	ngOnInit(): void {
		// Detect if current route is home:
		const url = this.router.url;
		this.isHomePage = (url === '/' || url.startsWith('/home'));

		/**
		 * If in the browser, do an initial scroll-based evaluation.
		 * If on the server (SSR), pick a default.
		 */
		if (this.isBrowser) {
			this.updateTopValue();
		} else {
			// SSR fallback: set a static top so server-side render has no error
			this.top = this.isHomePage ? '2rem' : 'calc(2rem + 88px)';
		}
	}

	/**
	 * Use Angular's HostListener for window scroll. 
	 * No raw add/removeEventListener calls, and it only runs in the browser.
	 */
	@HostListener('window:scroll', [])
	onWindowScroll(): void {
		if (!this.isBrowser) return;
		this.updateTopValue();
	}

	/**
	 * Applies the scroll logic:
	 *  - Home Page: always "2rem"
	 *  - Other Pages: 
	 *      if scrollY > 88 => "2rem"
	 *      else => "calc(2rem + 88px)"
	 */
	private updateTopValue(): void {
		if (this.isHomePage) {
			this.top = '2rem';
			return;
		}

		const scrollY = window.scrollY; // or: document.documentElement.scrollTop
		const threshold = 80; // size of your header

		if (scrollY > threshold) {
			this.top = '2rem';
		} else {
			this.top = 'calc(2rem + 88px)';
		}
	}

	// -------------------------------------------------
	// THEME LOGIC
	// -------------------------------------------------
	get themeMode(): string {
		return this.accent.themeMode;
	}

	get themeIcon(): string {
		return this.themeMode === 'light' ? 'dark_mode' : 'light_mode';
	}

	toggleThemeMode() {
		this.setThemeMode(this.themeMode === "light" ? "dark" : "light");
	}

	setThemeMode(mode: "light" | "dark") {
		const isDark = mode === "dark";

		document.body.classList.toggle("dark-theme", isDark);
		document.body.classList.toggle("light-theme", !isDark);

		this.accent.setThemeMode(mode);

		this.idb.writeToTheme("Material You", {
			preferredColorScheme: mode,
		});
	}
}
