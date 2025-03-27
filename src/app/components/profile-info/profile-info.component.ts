import { Component, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.scss'],
    imports: [NgTemplateOutlet]
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
			icon: "code",
			link: "https://github.com/dartegnian",
			text: "github.com/dartegnian"
		},
		{
			icon: "edit",
			link: "https://blog.dartegnian.com/",
			text: "https://blog.dartegnian.com"
		},
		{
			icon: "work",
			link: "https://www.linkedin.com/in/dartegnian/",
			text: "linkedin.com/in/dartegnian"
		},
	];

	constructor() {
		this.description = "Hi, I'm Dartegnian Velarde! I'm an agile and determined IT senior developer with a passion for curating innovative and responsive web applications, with highly-functional knowledge on various aspects of computer programming, web development, and the DevOps process. Communicating well with others, troubleshooting, and fluency in English are some of my other skills. Adaptability and conscientiousness are my predominant traits.";
	}

	ngOnInit(): void {
	}

}
