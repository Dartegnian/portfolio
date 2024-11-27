import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import MetaTags from '@interfaces/meta-tags.interface';

@Injectable({
	providedIn: 'root'
})
export class MetaService {
	isBrowser: boolean = false;

	constructor(
		private meta: Meta,
		private titleService: Title,
		@Inject(PLATFORM_ID) private platformId: Object
	) {
		this.isBrowser = isPlatformBrowser(this.platformId);
	}

	updateSiteInfoMeta(metaTags: MetaTags) {
		this.meta.updateTag({ name: 'description', content: metaTags.description });
		this.meta.updateTag({ name: 'keywords', content: metaTags.keywords });
		this.meta.updateTag({ property: 'og:title', content: metaTags.title });
		this.meta.updateTag({ property: 'og:description', content: metaTags.description });
		this.meta.updateTag({ property: 'og:image', content: metaTags.image });
		this.meta.updateTag({ property: 'og:image:secure_url', content: metaTags.image });
		this.meta.updateTag({ property: 'og:image:alt', content: metaTags.imageAlt });
		this.meta.updateTag({ name: 'twitter:title', content: metaTags.title });
		this.meta.updateTag({ name: 'twitter:description', content: metaTags.description });
		this.meta.updateTag({ name: 'twitter:image', content: metaTags.image });

		this.titleService.setTitle(metaTags.title);

		if (metaTags.favicons) {
			this.updateFavicons(metaTags.favicons);
		}
	}

	updateSiteColorMeta(color: string) {
		this.meta.updateTag({
			name: "theme-color",
			content: color
		});
	}

	updateFavicons(favicons: { type: string; sizes: string; href: string }[]) {
		if (this.isBrowser) {
			// Remove existing favicons
			const existingIcons = document.querySelectorAll("link[rel*='icon']");
			existingIcons.forEach(icon => icon.remove());
			this.writeFavicons(favicons);
		}
	}

	writeFavicons(favicons: { type: string; sizes: string; href: string }[]) {
		if (this.isBrowser) {
			// Add new favicons
			favicons.forEach(favicon => {
				const link: HTMLLinkElement = document.createElement('link');
				link.rel = 'icon';
				link.type = favicon.type;
				link.setAttribute('sizes', favicon.sizes); // Use setAttribute to handle read-only properties
				link.href = favicon.href;
				document.getElementsByTagName('head')[0].appendChild(link);
			});
		}
	}

	restoreOriginalSiteInfo() {
		const metaTags = {
			description: "The website and home page of tomasps.com. Includes a mood calendar, journal, MBTI, and other info.",
			keywords: "Tomas Palma, TomasPS, Portfolio, Landing Page, About Me, Home Page, Mood Calendar, Journal, Web Journal, MBTI",
			title: "TomasPS | Developer",
			image: "https://tomasps.com.com/assets/img/main-min-1024.jpg",
			imageAlt: "Material You-style introduction banner for tomasps.com",
			favicons: [
				{ type: "image/png", sizes: "192x192", href: "/assets/icons/icon-192x192.png" },
				{ type: "image/png", sizes: "32x32", href: "/assets/icons/favicon-32x32.png" },
				{ type: "image/png", sizes: "16x16", href: "/assets/icons/favicon-16x16.png" }
			]
		};

		this.updateSiteInfoMeta(metaTags);
	}
}
