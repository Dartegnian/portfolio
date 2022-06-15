import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'theme-switcher',
	templateUrl: './theme-switcher.component.html',
	styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
	themeMode: "dark" | "light" = "light";
	prefersDarkScheme: MediaQueryList;
	isDarkMode: boolean;

	constructor() {
		this.prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
		this.isDarkMode = this.prefersDarkScheme.matches;

		if (this.isDarkMode) {
			this.themeMode = "dark";
		} else {
			this.themeMode = "light";
		}
	}

	ngOnInit(): void {
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
	}

}
