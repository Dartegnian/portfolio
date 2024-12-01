import { Component, OnInit } from '@angular/core';
import { AccentService } from '@services/accent-service.service';
import { IdbService } from '@services/idb.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'theme-switcher',
    templateUrl: './theme-switcher.component.html',
    styleUrls: ['./theme-switcher.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class ThemeSwitcherComponent implements OnInit {
	themeMode: "dark" | "light" = "light";
	prefersDarkScheme: MediaQueryList;
	isDarkMode: boolean;
	prefersDarkSchemeFromIdb: "dark" | "light" = "light";


	constructor(private idb: IdbService, private accent: AccentService) {
		this.prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
		this.isDarkMode = this.prefersDarkScheme.matches;
	}

	async ngOnInit(): Promise<void> {
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
