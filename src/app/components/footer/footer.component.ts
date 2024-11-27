import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	footerLinks = [
		{
			icon: "photo_camera",
			link: "https://photography.tomasps.com",
			text: "Photograpgy"
		},
		{
			icon: "public",
			link: "https://tomasps.com/",
			text: "https://tomasps.com"
		},
		{
			icon: "code",
			link: "https://github.com/tresillo2017/portfolio2025",
			text: "Source Code"
		},
		{
			icon: "work",
			link: "https://www.linkedin.com/in/tomasps/",
			text: "linkedin.com/in/tomasps/"
		},
	];

  constructor() { }

  ngOnInit(): void {
  }

}
