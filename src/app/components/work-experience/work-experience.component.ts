import { Component } from "@angular/core";
import IWorkExperience from "@interfaces/work-experience.interface";
import workExperience from "@data/work-experience/work-experience";

@Component({
  selector: 'work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent {
  workExperience: IWorkExperience[];

  constructor() {
    this.workExperience = workExperience;
  }
}
