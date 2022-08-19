import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'responsive-image',
	templateUrl: './responsive-image.component.html',
	styleUrls: ['./responsive-image.component.scss']
})
export class ResponsiveImageComponent implements OnInit {
	@Input() imageName: string = "";
	@Input() imageAlt: string = "";
	@Input() imageWidth?: number | undefined = undefined;
	@Input() imageHeight?: number | undefined = undefined;

	imageSizes = [
		1024,
		512,
		256
	];
	imageFormats = [
		"avif",
		"webp",
		"jpg"
	];

	constructor() { }

	ngOnInit(): void {
	}

}
