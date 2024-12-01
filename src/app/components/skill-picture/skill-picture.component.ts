import { Component, OnInit } from '@angular/core';
import { ResponsiveImageComponent } from '../responsive-image/responsive-image.component';

@Component({
    selector: 'skill-picture',
    templateUrl: './skill-picture.component.html',
    styleUrls: ['./skill-picture.component.scss'],
    standalone: true,
    imports: [ResponsiveImageComponent]
})
export class SkillPictureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
