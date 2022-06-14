import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'surface-test',
	templateUrl: './surface-test.component.html',
	styleUrls: ['./surface-test.component.scss']
})
export class SurfaceTestComponent implements OnInit {
	themeMode: "dark" | "light" = "light";
	surfaces: Array<Array<String>> = [
		[
			"material-colored-primary",
			"material-basic-primary",
			"material-container-primary",
			"material-inverted-primary",
		],

		[
			"material-colored-secondary",
			"material-basic-secondary",
			"material-container-secondary",
			"material-inverted-secondary",
		],

		[
			"material-colored-tertiary",
			"material-basic-tertiary",
			"material-container-tertiary",
			"material-inverted-tertiary",
		],
	];

	constructor() { }

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
