import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

const DEFAULT_WIDTHS = [256, 512, 1024] as const;
const MODERN_FORMATS = ['avif', 'webp'] as const;

@Component({
	selector: 'responsive-image',
	templateUrl: './responsive-image.component.html',
	styleUrls: ['./responsive-image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
})
export class ResponsiveImageComponent {
	@Input({ required: true }) imageName!: string;
	@Input() imageAlt = '';
	@Input() imageWidth?: number;
	@Input() imageHeight?: number;
	@Input() imageBoundary?: number;
	@Input() itemProp?: string;
	@Input() isLazyLoaded = true;
	@Input() sizes: string | null = null;

	readonly modernFormats = MODERN_FORMATS;
	private readonly widths = DEFAULT_WIDTHS;
	private readonly basePath = 'assets/img/';

	buildSrcset(ext: string): string {
		if (!this.imageName) return '';
		return this.enabledWidths
			.map((w) => `${this.basePath}${this.imageName}-${w}.${ext} ${w}w`)
			.join(', ');
	}

	get fallbackSrc(): string {
		if (!this.imageName) return 'data:,';
		return `${this.basePath}${this.imageName}-${this.fallbackWidth}.jpg`;
	}

	get sizesAttr(): string {
		if (this.sizes) return this.sizes;
		if (this.imageWidth) return `${this.imageWidth}px`;
		if (this.imageBoundary) return `${this.imageBoundary}px`;
		return "(max-width: 580px) 256px, (max-width: 768px) 512px, 100vw";
	}

	private get enabledWidths(): readonly number[] {
		const max = this.imageBoundary ?? this.widths[this.widths.length - 1];
		const allowed = this.widths.filter((w) => w <= max);
		return allowed.length ? allowed : [this.widths[0]];
	}

	private get fallbackWidth(): number {
		const enabled = this.enabledWidths;
		return enabled[enabled.length - 1];
	}
}
