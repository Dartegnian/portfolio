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
			link: "https://www.instagram.com/dartegnian/",
			text: "Instagram"
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

  constructor() { }

  ngOnInit(): void {
  }

}
