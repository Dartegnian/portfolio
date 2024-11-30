import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'profile-info',
	templateUrl: './profile-info.component.html',
	styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  description: string = "";
	contactLinks = [
		{
			icon: "mail",
			link: "mailto:contact@tomasps.com",
			text: "contact@tomasps.com"
		},
		{
			icon: "code",
			link: "https://github.com/tresillo2017",
			text: "github.com/tresillo2017"
		},
		{
			icon: "edit",
			link: "https://blog.tomasps.com/",
			text: "https://blog.tomasps.com"
		},
		{
			icon: "work",
			link: "https://www.linkedin.com/in/tomasps/",
			text: "linkedin.com/in/tomasps"
		},
	];

	constructor( private translate: TranslateService) {
		// this.description = "Hi, I'm Tomas Palma! I’m an developer with a passion for curating innovative and responsive web applications, with highly-functional knowledge on various aspects of computer programming, web development, and hosting. Communicating well with others, troubleshooting, and fluency in English are some of my other skills.";

	}

	ngOnInit(): void {
    this.translate.get('DESCRIPTION').subscribe((res: string) => {
      this.description = res;
    });
	}

}
