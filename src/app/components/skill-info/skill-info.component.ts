import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

@Component({
	selector: 'skill-info',
	templateUrl: './skill-info.component.html',
	styleUrls: ['./skill-info.component.scss']
})
export class SkillInfoComponent implements OnInit {
	webAttributes = [
		"focused",
		"inspired",
		"driven",
		"oriented",
		"impassioned"
	];
	webAttributeIndex = 0;
	webAttributeCharacter = 0;
	webAttribute = this.webAttributes[this.webAttributeIndex];
	cursorInterval: ReturnType<typeof setTimeout> | undefined;
	isBrowser: boolean = false;

	constructor(
		@Inject(PLATFORM_ID) private platformId: Object
	) {
		this.isBrowser = isPlatformBrowser(this.platformId);
	}

	ngOnInit(): void {
		if (this.isBrowser) { 
			this.cursorInterval = setInterval(() => this.writeType(), 100);
		}
	}

	writeType() {
		const activeText = this.webAttributes[this.webAttributeIndex].substring(0, this.webAttributeCharacter + 1);
		this.webAttribute = activeText;
		this.webAttributeCharacter++;

		if (activeText === this.webAttributes[this.webAttributeIndex]) {

			clearInterval(this.cursorInterval);
			setTimeout(() => {
				this.cursorInterval = setInterval(() => this.deleteType(), 50);
			}, 1500);
		}
	}

	deleteType() {
		const activeText = this.webAttributes[this.webAttributeIndex].substring(0, this.webAttributeCharacter - 1);
		this.webAttribute = activeText;
		this.webAttributeCharacter--;

		if (activeText === "") {
			clearInterval(this.cursorInterval);

			if (this.webAttributeIndex === (this.webAttributes.length - 1)) {
				this.webAttributeIndex = 0;
			}
			else {
				this.webAttributeIndex++;
			}

			this.webAttributeCharacter = 0;

			setTimeout(() => {
				this.cursorInterval = setInterval(() => this.writeType(), 100);
			}, 500);
		}
	}
}
