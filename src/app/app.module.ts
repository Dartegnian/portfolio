import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { ProfileCardComponent } from '@components/profile-card/profile-card.component';
import { SurfaceTestComponent } from '@components/surface-test/surface-test.component';
import { ThemeSwitcherComponent } from '@components/theme-switcher/theme-switcher.component';
import { ProfileInfoComponent } from '@components/profile-info/profile-info.component';
import { HeroBannerComponent } from '@components/hero-banner/hero-banner.component';
import { AccentSwitcherComponent } from '@components/accent-switcher/accent-switcher.component';
import { SkillPictureComponent } from '@components/skill-picture/skill-picture.component';
import { SkillInfoComponent } from '@components/skill-info/skill-info.component';
import { LifeAtAGlanceComponent } from '@components/life-at-a-glance/life-at-a-glance.component';
import { SkillListComponent } from '@components/skill-list/skill-list.component';
import { EmailCtaComponent } from '@components/resume-request/resume-request.component';
import { FooterComponent } from '@components/footer/footer.component';
import { ResponsiveImageComponent } from '@components/responsive-image/responsive-image.component';
import { OtherSitesComponent } from '@components/other-sites/other-sites.component';
import { UpdatingSnackbarComponent } from '@components/updating-snackbar/updating-snackbar.component';

import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClientModule

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateComponent } from "@components/translate/translate.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [
		AppComponent,
    ProfileCardComponent,
		SurfaceTestComponent,
		ThemeSwitcherComponent,
		ProfileInfoComponent,
		HeroBannerComponent,
		AccentSwitcherComponent,
		SkillPictureComponent,
		SkillInfoComponent,
		LifeAtAGlanceComponent,
		SkillListComponent,
		EmailCtaComponent,
		FooterComponent,
		ResponsiveImageComponent,
		OtherSitesComponent,
    TranslateComponent
  ],
  imports: [
    UpdatingSnackbarComponent,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      // registrationStrategy: 'registerWhenStable:30000'
      registrationStrategy: 'registerImmediately'
    }),
    RouterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
