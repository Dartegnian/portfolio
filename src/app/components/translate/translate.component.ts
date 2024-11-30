import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IdbService } from '@services/idb.service';
import { AccentService } from '@services/accent-service.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {
  currentLanguage: 'en' | 'es' = 'en';
  themeMode: 'dark' | 'light' = 'light';
  prefersDarkScheme: MediaQueryList;
  isDarkMode: boolean;
  prefersDarkSchemeFromIdb: 'dark' | 'light' = 'light';
  isBrowser: boolean = false;

  constructor(
    private translate: TranslateService,
    private idb: IdbService,
    private accent: AccentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      this.isDarkMode = this.prefersDarkScheme.matches;
      this.isBrowser = true;
    } else {
      this.prefersDarkScheme = { matches: false } as MediaQueryList;
      this.isDarkMode = false;
    }
    this.translate.setDefaultLang(this.currentLanguage);
  }

  async ngOnInit(): Promise<void> {
    // Initialize the language based on user preference or default
    const savedLanguage = localStorage.getItem('preferredLanguage') as 'en' | 'es';
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      this.translate.use(this.currentLanguage);
    }

    // Initialize the theme mode based on user preference or default
    this.idb.connectToIDB();
    this.prefersDarkSchemeFromIdb = (await this.idb.getData('Material You', 'preferredColorScheme')) || 'light';

    if (this.prefersDarkSchemeFromIdb) {
      this.themeMode = this.prefersDarkSchemeFromIdb;
      this.setThemeMode(this.themeMode);
    } else if (this.isDarkMode && !this.prefersDarkSchemeFromIdb) {
      this.setThemeMode('dark');
    } else {
      this.setThemeMode('light');
    }
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
    this.translate.use(this.currentLanguage);
    localStorage.setItem('preferredLanguage', this.currentLanguage);
  }

  toggleThemeMode(): void {
    if (this.themeMode === 'light') {
      this.setThemeMode('dark');
    } else {
      this.setThemeMode('light');
    }
  }

  setThemeMode(mode: 'light' | 'dark'): void {
    switch (mode) {
      case 'light':
        document.body.classList.toggle('dark-theme', false);
        document.body.classList.toggle('light-theme', true);
        this.themeMode = 'light';
        break;
      case 'dark':
        document.body.classList.toggle('dark-theme', true);
        document.body.classList.toggle('light-theme', false);
        this.themeMode = 'dark';
        break;
      default:
        console.error('Invalid theme');
    }

    this.accent.setThemeMode(this.themeMode);

    this.idb.writeToTheme('Material You', {
      preferredColorScheme: this.themeMode,
    });
  }
}
