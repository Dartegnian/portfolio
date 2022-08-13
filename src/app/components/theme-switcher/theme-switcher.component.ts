import { Component, OnInit } from '@angular/core';
import { IdbService } from '@services/idb.service';

@Component({
	selector: 'theme-switcher',
	templateUrl: './theme-switcher.component.html',
	styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
	themeMode: "dark" | "light" = "light";
	prefersDarkScheme: MediaQueryList;
	isDarkMode: boolean;
	prefersDarkSchemeFromIdb: "dark" | "light" = "light";


	constructor(private idb: IdbService) {
		this.prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
		this.isDarkMode = this.prefersDarkScheme.matches;

		if (this.isDarkMode) {
			this.themeMode = "dark";
		} else {
			this.themeMode = "light";
		}
	}

	async ngOnInit(): Promise<void> {
		this.idb.connectToIDB();
		this.prefersDarkSchemeFromIdb = (await this.idb.getData("Material You", "preferredColorScheme"))["value"] || "light";

		if (this.prefersDarkSchemeFromIdb !== this.themeMode) {
			this.toggleThemeMode();
		}
	}

	toggleThemeMode() {
		if (this.themeMode === "light") {
			document.body.classList.toggle("dark-theme", true);
			document.body.classList.toggle("light-theme", false);
			this.themeMode = "dark";
		} else {
			document.body.classList.toggle("dark-theme", false);
			document.body.classList.toggle("light-theme", true);
			this.themeMode = "light";
		}

		this.idb.writeToTheme("Material You", {
			preferredColorScheme: this.themeMode,
		});
	}

}
