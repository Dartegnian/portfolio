import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'other-sites',
	templateUrl: './other-sites.component.html',
	styleUrls: ['./other-sites.component.scss']
})
export class OtherSitesComponent implements OnInit {
	otherSites: any[];

	constructor() {
		this.otherSites = [,
			{
				name: "Dartegnian.com",
				link: "https://dartegnian.com",
				image: "main",
				description: "My main website and landing page. This essentially features basic information about me as a person and the things I like."
			},
			{
				name: "Portfolio",
				link: "https://portfolio.dartegnian.com",
				image: "portfolio",
				description: "This is essentially my online web portfolio. All my work and career-related info can be found here, as well as my core competencies as a developer."
			},
			{
				name: "Blog",
				link: "https://blog.dartegnian.com",
				image: "blog",
				description: "My new blog that's self-hosted and powered by Ghost CMS. Has a custom theme with my standard Material You color scheme."
			},
			{
				name: "Forever One (WG-Easy)",
				link: "https://wg.dartegnian.com",
				image: "wireguard",
				description: "A fork of Emile Nijssen's project WG-Easy for managing a WireGuard VPN instance. This fork implements my standard Material You color scheme."
			},
			{
				name: "Projects (Taiga)",
				link: "https://projects.dartegnian.com",
				image: "projects",
				description: "A self-hosted instance of Taiga for the SCRUM management of my own projects and ideas."
			}
		];
	}

	ngOnInit(): void {
	}
}
