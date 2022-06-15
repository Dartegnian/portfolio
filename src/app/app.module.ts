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

@NgModule({
  declarations: [
    AppComponent,
    ProfileCardComponent,
    SurfaceTestComponent,
    ThemeSwitcherComponent,
    ProfileInfoComponent,
    ActiveColorSchemeComponent,
    HeroBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
