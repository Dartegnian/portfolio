import { Component } from '@angular/core';

@Component({
	selector: 'other-sites',
	templateUrl: './other-sites.component.html',
	styleUrls: ['./other-sites.component.scss']
})
export class OtherSitesComponent {
	otherSites: any[];

	constructor() {
		this.otherSites = [
			{
				name: "Tomasps.com",
				link: "https://tomasps.com",
				image: "portfolio",
				description: "My main website and landing page. This essentially features basic information about me as a person and the things I like."
			},
			{
				name: "Status",
				link: "https://status.tomasps.com",
				image: "main",
				description: "This is essentially my personal status page built with uptimekuma."
			},
			{
				name: "Blog",
				link: "https://blog.tomasps.com",
				image: "blog",
				description: "My new blog that's self-hosted and powered by Ghost CMS. Has a custom theme with my standard Material You color scheme."
			},
			{
				name: "Photography",
				link: "https://photography.tomasps.com",
				image: "web-stories",
				description: "All my photography work is hosted here. It's on flickr"
			},
			// {
			// 	name: "Placeholder",
			// 	link: "https://placeholder.com",
			// 	image: "wireguard",
			// 	description: "A fork of Emile Nijssen's project WG-Easy for managing a WireGuard VPN instance. This fork implements my standard Material You color scheme."
			// },
			// {
			// 	name: "Projects (Taiga)",
			// 	link: "https://projects.dartegnian.com",
			// 	image: "projects",
			// 	description: "A self-hosted instance of Taiga for the SCRUM management of my own projects and ideas."
			// }
		];
	}
}
