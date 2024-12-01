import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';

@Component({
    selector: 'skill-info',
    templateUrl: './skill-info.component.html',
    styleUrls: ['./skill-info.component.scss'],
    standalone: true
})
export class SkillInfoComponent implements OnInit {
	private platformId = inject<Object>(PLATFORM_ID);

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

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {
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
