import { APP_INITIALIZER, ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '@routes/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(
			withInterceptorsFromDi(),  // Keep your interceptors if you use any
			withFetch()                // Add fetch API support
		),
		provideZoneChangeDetection({ eventCoalescing: true }),
		
		provideRouter(routes),
		provideClientHydration(),
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000',
		})
	]
};

const siteConfig = {
	LASTFM_API_KEY: "",
};

export default siteConfig;
