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
			link: "mailto:contact@dartegnian.com",
			text: "contact@dartegnian.com"
		},
		{
			icon: "public",
			link: "https://dartegnian.com/",
			text: "https://dartegnian.com"
		},
		{
			icon: "code",
			link: "https://github.com/dartegnian",
			text: "github.com/dartegnian"
		},
		{
			icon: "work",
			link: "https://www.linkedin.com/in/dartegnian/",
			text: "linkedin.com/in/dartegnian"
		},
	];

	constructor() {
		this.description = "Hi, I'm Dartegnian Velarde. I’m an agile and determined developer with a passion for curating innovative and responsive web applications, with highly-functional knowledge of various web technologies. Communicating well with others, troubleshooting, and fluency in English are some of my other skills. Adaptability and conscientiousness are my predominant traits.";
	}

	ngOnInit(): void {
	}

}
