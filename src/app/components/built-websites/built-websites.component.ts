import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'built-websites',
	templateUrl: './built-websites.component.html',
	styleUrls: ['./built-websites.component.scss']
})
export class BuiltWebsitesComponent implements OnInit {
	builtWebsites: any[];

	constructor() {
		this.builtWebsites = [
			{
				name: "Jollibee.com.ph (2021)",
				link: "https://web.archive.org/web/20211116200829/https://www.jollibee.com.ph/",
				image: "jollibee-website",
				description: "I built the landing page and other parts of jollibee.com.ph, the Philippines' #1 fast food chain."
			},
			{
				name: "Jollibee Group",
				link: "https://jollibeegroup.com/",
				image: "jollibeegroup.com",
				description: "The main website of the Jollibee Foods Corp group of companies. It lists they brands that they have."
			},
			{
				name: "Allianz Touch",
				link: "https://touch.allianzpnblife.ph",
				image: "allianz-touch",
				description: "Allianz Touch is a consumer-facing portal where users can manage their active insurance plans."
			},
			{
				name: "Allianz Assist",
				link: "https://assist.allianzpnblife.ph/",
				image: "allianz-assist",
				description: "Allianz Assist is a web app for insurance agents."
			},
			{
				name: "Pioneer.com.ph",
				link: "https://pioneer.com.ph/",
				image: "pioneer-main-website",
				description: "The main website of Pioneer. I primarily helped in the deployment and DevOps side of things."
			}
		];
	}

	ngOnInit(): void {
	}
}
