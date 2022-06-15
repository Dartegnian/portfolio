import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'profile-card',
	templateUrl: './profile-card.component.html',
	styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
	name = "Dartegnian L. Velarde";
	tagline = "Software engineer, web developer, Linux enthusiast, DevOps engineer";

	constructor() { }

	ngOnInit(): void {
	}

}
