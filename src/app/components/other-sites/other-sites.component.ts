import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'other-sites',
  templateUrl: './other-sites.component.html',
  styleUrls: ['./other-sites.component.scss']
})
export class OtherSitesComponent implements OnInit {
  otherSites: any[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translateOtherSites();
    this.translate.onLangChange.subscribe(() => {
      this.translateOtherSites();
    });
  }

  translateOtherSites(): void {
    this.translate.get('OTHER_SITES').subscribe((res: any[]) => {
      this.otherSites = res;
    });
  }
}
