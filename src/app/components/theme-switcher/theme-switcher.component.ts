import { isPlatformBrowser } from '@angular/common';
import { Component, Injector, OnInit, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { AccentService } from '@services/accent-service.service';
import { IdbService } from '@services/idb.service';

@Component({
    selector: 'theme-switcher',
    templateUrl: './theme-switcher.component.html',
    styleUrls: ['./theme-switcher.component.scss'],
    imports: []
})
export class ThemeSwitcherComponent implements OnInit {
	private idb = inject(IdbService);
	private accent = inject(AccentService);
	private platformId = inject<Object>(PLATFORM_ID);
	private readonly injector = inject(Injector);

	themeMode: "dark" | "light" = "light";
	prefersDarkScheme: MediaQueryList | null | undefined;
	isDarkMode: boolean | undefined;
	prefersDarkSchemeFromIdb: "dark" | "light" = "light";
	isBrowser: boolean = false;

	constructor() {
		this.isBrowser = isPlatformBrowser(this.platformId);

		if (this.isBrowser) {
			this.prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
			this.isDarkMode = this.prefersDarkScheme!.matches;
		}
	}

	async ngOnInit(): Promise<void> {
		if (this.isBrowser) {
			this.idb.connectToIDB();
			this.prefersDarkSchemeFromIdb = (await this.idb.getData("Material You", "preferredColorScheme"));

			if (this.prefersDarkSchemeFromIdb) {
				this.themeMode = this.prefersDarkSchemeFromIdb;
				this.setThemeMode(this.themeMode);
			} else if (this.isDarkMode && !this.prefersDarkSchemeFromIdb) {
				this.setThemeMode("dark");
			} else {
				this.setThemeMode("light");
			}
		}
	}

	toggleThemeMode() {
		if (this.themeMode === "light") {
			this.setThemeMode("dark");
		} else {
			this.setThemeMode("light");
		}
	}

	setThemeMode(mode: "light" | "dark") {
		switch (mode) {
			case "light":
				document.body.classList.toggle("dark-theme", false);
				document.body.classList.toggle("light-theme", true);
				this.themeMode = "light";
				break;
			case "dark":
				document.body.classList.toggle("dark-theme", true);
				document.body.classList.toggle("light-theme", false);
				this.themeMode = "dark";
				break;
			default:
				console.error("Invalid theme");
		}

		this.accent.setThemeMode(this.themeMode);

		this.idb.writeToTheme("Material You", {
			preferredColorScheme: this.themeMode,
		});
	}

}
