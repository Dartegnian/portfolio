import { Component, computed, effect, inject, PLATFORM_ID, afterNextRender, Injector } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ResponsiveImageComponent } from '@components/responsive-image/responsive-image.component';
import { AccentService } from '@services/accent-service.service';

@Component({
  selector: 'accent-switcher',
  templateUrl: './accent-switcher.component.html',
  styleUrls: ['./accent-switcher.component.scss'],
  imports: [ResponsiveImageComponent],
})
export class AccentSwitcherComponent {
  private readonly accent = inject(AccentService);
  private readonly injector = inject(Injector);

  private platformId = inject<Object>(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  // keep names used by template
  readonly images = computed(() => this.accent.images); // string[]
  readonly activeIndex = computed(() => this.accent.activeKey());
  readonly customImage = computed(() => this.accent.customImage());

  private lastThemeRecalcToken: string | null = null;

  titleMappings: { [key: string]: string } = {
    primary: 'Dartegnian Blue',
    secondary: 'Vibrant Green',
    tertiary: 'Filling Station Purple',
  };

  constructor() {
    effect(() => {
      if (!this.isBrowser) return;

      const mode = this.accent.themeMode();
      const key = this.accent.activeKey();
      const custom = this.accent.customImage();

      const customToken =
        typeof custom === 'string' ? custom : custom instanceof ArrayBuffer ? 'arraybuffer' : 'none';
      const token = `${mode}:${key}:${key === 'custom' ? customToken : ''}`;

      if (this.lastThemeRecalcToken === token) return;
      this.lastThemeRecalcToken = token;

      if (key === 'custom' && !custom) return;

      afterNextRender(() => this.accent.setThemeFromM3(), { injector: this.injector });
    });
  }

  changeAccent(imageIndex: number, imageName: string): void {
    if (imageName !== this.activeIndex()) {
      this.accent.setAccent(imageIndex);
    }
  }

  // your template calls this, so keep it
  setCustomImage(): void {
    if (this.accent.customImage()) {
      this.accent.setAccent(0);
    }
  }

  async onFileSelected(event: any) {
    const file: File | undefined = event?.target?.files?.[0];
    if (!file) return;

    const dataUrl = await this.getFileDataUrl(file);
    this.accent.setCustomImage(dataUrl);
  }

  removeCustomImage() {
    this.accent.setCustomImage(null, true);

    if (this.accent.activeIndex() === 0) {
      this.changeAccent(1, 'primary');
    }
  }

  private getFileDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => resolve(e.target.result);
      reader.onerror = (e: any) => reject(e.target.error);
      reader.readAsDataURL(file);
    });
  }
}
