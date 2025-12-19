import { Injectable, PLATFORM_ID, afterNextRender, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import {
	Hct,
	argbFromHex,
	hexFromArgb,
	DynamicScheme,
	Variant,
	sourceColorFromImage
} from '@dartegnian/material-color-utilities';

import { IdbService } from '@services/idb.service';

@Injectable({
	providedIn: 'root'
})
export class AccentService {
	private idb = inject(IdbService);
	private meta = inject(Meta);

	readonly images = ['custom', 'primary', 'secondary', 'tertiary'] as const;
	readonly themeMode = signal<'light' | 'dark'>('light');
	readonly activeIndex = signal<number>(1);
	readonly activeKey = computed(() => this.images[this.activeIndex()]);
	readonly customImage = signal<string | ArrayBuffer | null>(null);
	readonly themeRawColorData = signal<DynamicScheme | null>(null);

	private platformId = inject<object>(PLATFORM_ID);
	isBrowser = isPlatformBrowser(this.platformId);

	private readonly GOOGLE_BLUE = '#4285f4';

	private readonly TOKENS = [
		// Core palettes
		'primary',
		'onPrimary',
		'primaryContainer',
		'onPrimaryContainer',
		'inversePrimary',
		'inverseOnPrimary',

		'secondary',
		'onSecondary',
		'secondaryContainer',
		'onSecondaryContainer',

		'tertiary',
		'onTertiary',
		'tertiaryContainer',
		'onTertiaryContainer',

		'error',
		'onError',
		'errorContainer',
		'onErrorContainer',

		'background',
		'onBackground',

		'surface',
		'onSurface',

		// Extra tonal variants
		'primaryDim',
		'secondaryDim',
		'tertiaryDim',
		'errorDim',
		'surfaceDim',
		'surfaceBright',

		// “Fixed” variants
		'primaryFixed',
		'primaryFixedDim',
		'onPrimaryFixed',
		'onPrimaryFixedVariant',

		'secondaryFixed',
		'secondaryFixedDim',
		'onSecondaryFixed',
		'onSecondaryFixedVariant',

		'tertiaryFixed',
		'tertiaryFixedDim',
		'onTertiaryFixed',
		'onTertiaryFixedVariant',

		// Palette key-colors
		'primaryPaletteKeyColor',
		'secondaryPaletteKeyColor',
		'tertiaryPaletteKeyColor',
		'neutralPaletteKeyColor',
		'neutralVariantPaletteKeyColor',
		'errorPaletteKeyColor',

		// Surface-container granularities
		'surfaceContainerLowest',
		'surfaceContainerLow',
		'surfaceContainer',
		'surfaceContainerHigh',
		'surfaceContainerHighest',
		'onSurfaceContainer',

		// Surface variants
		'surfaceVariant',
		'onSurfaceVariant',

		// Misc
		'inverseSurface',
		'inverseOnSurface',
		'outline',
		'outlineVariant',
		'shadow',
		'scrim',
		'surfaceTint'
	] as const;

	constructor() {
		if (!this.isBrowser) {
			this.themeMode.set('light');
			return;
		}

		// Start IDB connection early.
		this.idb.connectToIDB();

		// -----------------------------
		// Fast synchronous cache (localStorage)
		// -----------------------------
		const cachedMode = localStorage.getItem('m3ThemeMode') as ('light' | 'dark' | null);
		const initialMode =
			cachedMode ??
			(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		this.themeMode.set(initialMode);
		this.applyThemeModeClass(initialMode);

		const cachedIndexRaw = localStorage.getItem('m3ThemeIndex');
		const cachedIndex = cachedIndexRaw != null ? Number(cachedIndexRaw) : 1;
		if (!Number.isNaN(cachedIndex) && cachedIndex >= 0 && cachedIndex < this.images.length) {
			this.activeIndex.set(cachedIndex);
		}

		const cachedSeedHex = localStorage.getItem('m3SeedHex');
		if (cachedSeedHex) {
			void this.setM3SimpleColorAndTarget(cachedSeedHex, document.body, true);
		}

		// -----------------------------
		// Async hydration from IDB (authoritative)
		// -----------------------------
		void this.fetchDataFromIdb();

		// Recompute from actual accent image once the view is painted.
		afterNextRender(() => {
			this.scheduleNonPlayingThemeUpdate();
		});
	}

	private scheduleNonPlayingThemeUpdate(): void {
		if (!this.isBrowser) return;
		const run = () => {
			void this.setThemeFromM3();
		};
		const w = window as unknown as {
			requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
		};
		if (typeof w.requestIdleCallback === 'function') {
			w.requestIdleCallback(run, { timeout: 3000 });
		} else {
			setTimeout(run, 500);
		}
	}

	private async fetchDataFromIdb(): Promise<void> {
		const pref = await this.idb.getData('Material You', 'preferredColorScheme');
		const idx = await this.idb.getData('Material You', 'themeIndex');
		const img = await this.idb.getData('Material You', 'customImage');

		if (pref === 'light' || pref === 'dark') {
			if (this.themeMode() !== pref) {
				this.themeMode.set(pref);
				this.applyThemeModeClass(pref);
				try { localStorage.setItem('m3ThemeMode', pref); } catch { }
			}
		}

		if (idx != null) {
			const parsed = Number(idx);
			if (!Number.isNaN(parsed) && parsed >= 0 && parsed < this.images.length) {
				this.activeIndex.set(parsed);
				try { localStorage.setItem('m3ThemeIndex', String(parsed)); } catch { }
			}
		}

		if (img) {
			this.customImage.set(img);
		}

		this.scheduleNonPlayingThemeUpdate();
	}

	public setAccent(index: number, noTrigger = false) {
		const next = Number(index);
		if (Number.isNaN(next) || next < 0 || next >= this.images.length) return;

		this.activeIndex.set(next);
		try { localStorage.setItem('m3ThemeIndex', String(next)); } catch { }

		if (!noTrigger) void this.setThemeFromM3();
		this.writeThemeIndex(next);
	}

	public setThemeMode(mode: 'light' | 'dark', noTrigger = false) {
		this.themeMode.set(mode);
		this.applyThemeModeClass(mode);
		try { localStorage.setItem('m3ThemeMode', mode); } catch { }

		if (!noTrigger) {
			void this.setThemeFromM3();
		}

		this.idb.writeToTheme('Material You', { preferredColorScheme: mode });
	}

	private writeThemeIndex(i: number) {
		this.idb.connectToIDB();
		this.idb.writeToTheme('Material You', {
			imageName: this.images[i],
			materialScheme: this.images[i],
			themeIndex: `${i}`
		});
	}

	/** Update `<meta name="theme-color">` from the current scheme */
	public setMetaTagColor(scheme: DynamicScheme) {
		const argb = (scheme as any).primaryContainer as number;
		this.meta.updateTag({
			name: 'theme-color',
			content: this.argbToRgb(argb)
		});
	}

	/** Kick off image-based theme & store it */
	public async setThemeFromM3() {
		const scheme = await this.setM3ColorAndTarget(
			`accent-${this.images[this.activeIndex()]}`,
			document.body,
			true
		);
		this.themeRawColorData.set(scheme);
	}

	/** ARGB → #rrggbb */
	argbToRgb(color: number) {
		return '#' + ('000000' + (color & 0xFFFFFF).toString(16)).slice(-6);
	}

	public setCustomImage(img: string | ArrayBuffer | null, noTrigger = false) {
		this.customImage.set(img);
		if (!noTrigger) this.setAccent(0);
		this.idb.writeToTheme('Material You', {
			customImage: img?.toString() ?? ''
		});
	}

	private waitForElement(id: string, timeout = 5000): Promise<HTMLElement> {
		return new Promise((res, rej) => {
			let elapsed = 0;
			const iv = setInterval(() => {
				const el = document.getElementById(id);
				if (el) { clearInterval(iv); res(el); }
				elapsed += 100;
				if (elapsed >= timeout) { clearInterval(iv); rej(`"${id}" not found`); }
			}, 100);
		});
	}

	/** Simple hex → DynamicScheme → CSS vars */
	public async setM3SimpleColorAndTarget(
		colorHex: string,
		target: string | HTMLElement,
		isSiteFrame = false
	): Promise<void> {
		if (!this.isBrowser) return;
		try {
			const seed = argbFromHex(colorHex);
			const scheme = new DynamicScheme({
				sourceColorHct: Hct.fromInt(seed),
				variant: Variant.TONAL_SPOT,
				contrastLevel: 0,
				isDark: this.themeMode() === 'dark',
				specVersion: '2025'
			});
			this.applySchemeToElement(scheme, target, isSiteFrame);
		} catch {
			this.buildFallbackScheme(target, isSiteFrame);
		}
	}

	/**
	 * Image-based DynamicScheme → CSS vars
	 */
	public async setM3ColorAndTarget(
		parentOfImg: string,
		target: string | HTMLElement,
		isSiteFrame = false
	): Promise<DynamicScheme> {
		if (!this.isBrowser) {
			return this.buildFallbackScheme(target, isSiteFrame);
		}

		let container: HTMLElement;
		try {
			container = await this.waitForElement(parentOfImg);
		} catch {
			return this.buildFallbackScheme(target, isSiteFrame);
		}

		const img = container.querySelector<HTMLImageElement>('img');
		if (!img) {
			return this.buildFallbackScheme(target, isSiteFrame);
		}

		// Ensure the image is decoded before sampling pixels, but don't hang forever.
		try {
			if (!img.complete) {
				const loadPromise =
					typeof img.decode === 'function'
						? img.decode()
						: new Promise<void>((resolve) =>
							img.addEventListener('load', () => resolve(), { once: true })
						);
				await Promise.race([
					loadPromise,
					new Promise<void>((_, reject) => setTimeout(() => reject(new Error('decode-timeout')), 2000))
				]);
			}
		} catch {
			// If decode/load fails, we still attempt to sample and may fallback.
		}

		// Avoid canvas taint errors by using a CORS-enabled clone for cross-origin sources.
		const sampleImg = await this.getSafeImageForSampling(img);
		if (!sampleImg) {
			return this.buildFallbackScheme(target, isSiteFrame);
		}

		let seedArgb: number;
		try {
			seedArgb = await sourceColorFromImage(sampleImg);
		} catch {
			return this.buildFallbackScheme(target, isSiteFrame);
		}

		const scheme = new DynamicScheme({
			sourceColorHct: Hct.fromInt(seedArgb),
			variant: Variant.TONAL_SPOT,
			contrastLevel: 0,
			isDark: this.themeMode() === 'dark',
			specVersion: '2025'
		});

		this.applySchemeToElement(scheme, target, isSiteFrame);
		return scheme;
	}

	/**
	 * Returns an image safe to read pixels from.
	 * For cross-origin images without CORS, returns null to prevent tainted-canvas errors.
	 */
	private async getSafeImageForSampling(img: HTMLImageElement): Promise<HTMLImageElement | null> {
		if (!this.isBrowser) return null;

		const src = img.currentSrc || img.src;
		if (!src) return null;

		// Blob/data/same-origin images are safe.
		try {
			const url = new URL(src, window.location.href);
			if (
				url.protocol === 'blob:' ||
				url.protocol === 'data:' ||
				url.origin === window.location.origin
			) {
				return img;
			}
		} catch {
			// If URL parsing fails, fall back to sampling original.
			return img;
		}

		// Cross-origin: load a separate CORS-enabled image for sampling.
		return await new Promise<HTMLImageElement | null>((resolve) => {
			const probe = new Image();
			probe.crossOrigin = 'anonymous';
			probe.decoding = 'async';

			const done = (result: HTMLImageElement | null) => {
				probe.onload = null;
				probe.onerror = null;
				resolve(result);
			};

			probe.onload = () => done(probe);
			probe.onerror = () => done(null);

			// Avoid hanging on slow/blocked hosts.
			const timeout = setTimeout(() => done(null), 2000);
			probe.onload = () => {
				clearTimeout(timeout);
				done(probe);
			};
			probe.onerror = () => {
				clearTimeout(timeout);
				done(null);
			};

			probe.src = src;
		});
	}

	/** Set all TOKENS on `target` */
	private applySchemeToElement(
		scheme: DynamicScheme,
		target: string | HTMLElement,
		isSiteFrame: boolean
	) {
		const el = typeof target === 'string'
			? document.getElementById(target)!
			: target;
		for (const token of this.TOKENS) {
			const argb = (scheme as any)[token] as number;
			const css = token.replace(/([A-Z])/g, '-$1').toLowerCase();
			el.style.setProperty(`--md-sys-color-${css}`, hexFromArgb(argb));
		}
		if (isSiteFrame) this.setMetaTagColor(scheme);
		try {
			localStorage.setItem('m3SeedHex', hexFromArgb(scheme.sourceColorArgb));
		} catch { }
	}

	/** Fallback → GOOGLE_BLUE seed */
	private buildFallbackScheme(
		target: string | HTMLElement,
		isSiteFrame = false
	): DynamicScheme {
		const seed = argbFromHex(this.GOOGLE_BLUE);
		const scheme = new DynamicScheme({
			sourceColorHct: Hct.fromInt(seed),
			variant: Variant.TONAL_SPOT,
			contrastLevel: 0,
			isDark: this.themeMode() === 'dark',
			specVersion: '2025'
		});
		this.applySchemeToElement(scheme, target, isSiteFrame);
		return scheme;
	}

	private applyThemeModeClass(mode: 'light' | 'dark'): void {
		document.body.classList.toggle('dark-theme', mode === 'dark');
		document.body.classList.toggle('light-theme', mode === 'light');
	}
}
