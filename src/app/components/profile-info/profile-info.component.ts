import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'profile-info',
	templateUrl: './profile-info.component.html',
	styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
	description: string;
	contactLinks = [
		{
			icon: "mail",
			link: "contact@dartegnian.com",
			text: "contact@dartegnian.com"
		}
	];

	constructor() {
		this.description = "I’m an agile and determined developer with a passion for curating innovative and responsive web applications, with highly-functional knowledge of various web technologies. Communicating well with others, troubleshooting, and fluency in English are some of my other skills. Adaptability and conscientiousness are my predominant traits.";
	}

	ngOnInit(): void {
	}

}
