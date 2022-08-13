import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { SurfaceTestComponent } from './components/surface-test/surface-test.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ActiveColorSchemeComponent } from './components/active-color-scheme/active-color-scheme.component';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { AccentSwitcherComponent } from './components/accent-switcher/accent-switcher.component';
import { SkillPictureComponent } from './components/skill-picture/skill-picture.component';
import { SkillInfoComponent } from './components/skill-info/skill-info.component';
import { LifeAtAGlanceComponent } from './components/life-at-a-glance/life-at-a-glance.component';
import { SkillListComponent } from './components/skill-list/skill-list.component';
import { CommonModule } from '@angular/common';
import { EmailCtaComponent } from './components/email-cta/email-cta.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileCardComponent,
    SurfaceTestComponent,
    ThemeSwitcherComponent,
    ProfileInfoComponent,
    ActiveColorSchemeComponent,
    HeroBannerComponent,
    AccentSwitcherComponent,
    SkillPictureComponent,
    SkillInfoComponent,
    LifeAtAGlanceComponent,
    SkillListComponent,
    EmailCtaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
