import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import MetaTags from '@interfaces/meta-tags.interface';

@Injectable({
	providedIn: 'root'
})
export class MetaService {
	private meta = inject(Meta);
	private titleService = inject(Title);
	private platformId = inject<Object>(PLATFORM_ID);
	private router = inject(Router);
	private document = inject(DOCUMENT);
	isBrowser: boolean = false;

	constructor() {
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
			description: "The website and home page of Dartegnian Velarde—dartegnian.com. Includes a mood calendar, journal, MBTI, and other info.",
			keywords: "Dartegnian, Dartegnian Velarde, Velarde Dartegnian, Dartegnian L. Velarde, Portfolio, Home Page, About Me, Home Page, Mood Calendar, Journal, Web Journal, MBTI",
			title: "Dartegnian L. Velarde | DevOps Engineer",
			image: "https://dartegnian.com/assets/img/main-min-1024.jpg",
			imageAlt: "Material You-style introduction banner for Dartegnian.com",
			favicons: [
				{ type: "image/png", sizes: "192x192", href: "/assets/icons/icon-192x192.png" },
				{ type: "image/png", sizes: "32x32", href: "/assets/icons/favicon-32x32.png" },
				{ type: "image/png", sizes: "16x16", href: "/assets/icons/favicon-16x16.png" }
			]
		};

		this.updateSiteInfoMeta(metaTags);
	}

	updateCanonicalUrl(): void {
		// Get the current URL dynamically
		const url = this.router.url;

		// Use the current host from window.location for both localhost and production
		const baseUrl = isPlatformBrowser(this.platformId) ? window.location.origin : "https://dartegnian.com";
		const fullUrl = `${baseUrl}${url}`;

		if (this.isBrowser) {
			// If it's a browser, update or create the canonical link dynamically
			let canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
			if (!canonicalLink) {
				canonicalLink = document.createElement('link');
				canonicalLink.setAttribute('rel', 'canonical');
				document.head.appendChild(canonicalLink);
			}
			canonicalLink.setAttribute('href', fullUrl);
		} else {
			// For SSR, use the Meta service to ensure the canonical tag is rendered server-side
			this.meta.updateTag({ rel: 'canonical', href: fullUrl }, 'rel=canonical');
		}
	}

	writeJsonLd(jsonLdObject: Object): void {
		// Check if a script already exists
		let scriptTag = this.document.head.querySelector("#structured-data");
		if (!scriptTag) {
			scriptTag = this.document.createElement("script");
			scriptTag.setAttribute("type", "application/ld+json");
			scriptTag.setAttribute("id", "structured-data");
			this.document.head.appendChild(scriptTag);
		}
		scriptTag.textContent = JSON.stringify(jsonLdObject);

		// NEW: Create a <script> element
		// const scriptEl = this.document.createElement("script");
		// scriptEl.setAttribute("type", "application/ld+json");
		// scriptEl.setAttribute("id", "structured-data");
		// scriptEl.textContent = JSON.stringify(jsonLdObject);
	
		// // Append to <head> (or <body>, if you prefer)
		// this.document.head.appendChild(scriptEl);
	}
}
