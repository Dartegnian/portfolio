import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'responsive-image',
    templateUrl: './responsive-image.component.html',
    styleUrls: ['./responsive-image.component.scss'],
    standalone: true,
    imports: []
})
export class ResponsiveImageComponent implements OnInit {
	@Input() imageName: string = "";
	@Input() imageAlt: string = "";
	@Input() imageWidth: number | undefined = undefined;
	@Input() imageHeight: number | undefined = undefined;
	@Input() imageBoundary?: number | undefined = undefined;
	@Input() itemProp?: string | undefined = undefined;
	@Input() isLazyLoaded?: boolean | undefined = true;

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
