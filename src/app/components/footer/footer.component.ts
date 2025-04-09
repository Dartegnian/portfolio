import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AccentSwitcherComponent } from "../accent-switcher/accent-switcher.component";

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
	imports: [AccentSwitcherComponent]
})
export class FooterComponent {
	private platformId = inject<Object>(PLATFORM_ID);
	private viewportScroller = inject(ViewportScroller);
	isBrowser: boolean = isPlatformBrowser(this.platformId);

	footerLinks = [
		{
			icon: "photo_camera",
			link: "https://www.instagram.com/dartegnian/",
			text: "Instagram"
		},
		{
			icon: "work",
			link: "https://www.linkedin.com/in/dartegnian/",
			text: "LinkedIn"
		},
		{
			icon: "code",
			link: "https://github.com/dartegnian",
			text: "GitHub"
		},
		{
			icon: "queue_music",
			link: "https://www.last.fm/user/Dartegnian",
			text: "Last.fm"
		},
		{
			icon: "music_note",
			link: "https://open.spotify.com/user/dartegnian",
			text: "Spotify"
		},
		{
			icon: "alternate_email",
			link: "https://mastodon.social/@dartegnian",
			text: "Mastodon"
		},
		{
			icon: "palette",
			link: "https://www.behance.net/Dartegnian",
			text: "Behance"
		},
		{
			icon: "school",
			link: "https://scholar.google.com/citations?user=SPHbv8EAAAAJ",
			text: "Google Scholar"
		},
	];

	siteLinks = [
		{
			icon: "edit_note",
			link: "https://dartegnian.com",
			text: "Home"
		},
		{
			icon: "edit_note",
			link: "https://blog.dartegnian.com",
			text: "Blog"
		},
		{
			icon: "work_history",
			link: "https://portfolio.dartegnian.com",
			text: "Portfolio"
		},
		{
			icon: "web_stories",
			link: "https://stories.dartegnian.com",
			text: "Web Stories"
		},
	];

	constructor() { }

	scrollToTop(): void {
		this.viewportScroller.scrollToPosition([0, 0]);
	}
}
