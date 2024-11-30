import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { isPlatformBrowser } from '@angular/common';

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

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

	ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.get('DESCRIPTION').subscribe((res: string) => {
        this.description = res;
      });
    }
  }
}
