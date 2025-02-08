import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'surface-test',
    templateUrl: './surface-test.component.html',
    styleUrls: ['./surface-test.component.scss'],
    imports: [NgClass]
})
export class SurfaceTestComponent implements OnInit {
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

		[
			"material-inverted-primary",
			"material-inverted-secondary",
			"material-inverted-tertiary",
		],

		[
			"material-container-secondary",
			"material-container-tertiary",
		],
	];

	constructor() { }

	ngOnInit(): void {
	}

}
