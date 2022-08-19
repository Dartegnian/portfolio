import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'responsive-image',
	templateUrl: './responsive-image.component.html',
	styleUrls: ['./responsive-image.component.scss']
})
export class ResponsiveImageComponent implements OnInit {
	@Input() imageName: string = "";
	@Input() imageAlt: string = "";
	@Input() imageWidth: number | undefined = undefined;
	@Input() imageHeight: number | undefined = undefined;

	imageSizes = [
		256,
		512,
		1024
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
