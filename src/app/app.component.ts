import { Component, OnInit } from '@angular/core';
import { AccentService } from '@services/accent-service.service';
import { IdbService } from '@services/idb.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = "Dartegnian's Portfolio";

	constructor(
		private idb: IdbService,
		private accent: AccentService
	) {}

	async ngOnInit() {
		this.idb.connectToIDB();
		const accentIndex = (await this.idb.getData("Material You", "themeIndex")) || 0;
		this.accent.setAccent(accentIndex)
	}
}
