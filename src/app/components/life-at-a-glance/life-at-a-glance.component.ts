import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'life-at-a-glance',
  templateUrl: './life-at-a-glance.component.html',
  styleUrls: ['./life-at-a-glance.component.scss']
})
export class LifeAtAGlanceComponent implements OnInit {
  featureIndex = 0;
  features: any[] = [];
  feature: string = '';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.translateFeatures();
    });
    this.translateFeatures();
  }

  translateFeatures(): void {
    this.translate.get('FEATURES').subscribe((res: any[]) => {
      this.features = res;
      this.feature = this.features[this.featureIndex].title;
    });
  }

  setFeature(index: number): void {
    this.featureIndex = index;
    this.feature = this.features[index].title;
  }

  skipFeature(action: 'previous' | 'next'): void {
    let newFeatureIndex = this.featureIndex;
    if (action === 'previous' && this.featureIndex > 0) {
      newFeatureIndex -= 1;
    } else if (action === 'next' && this.featureIndex < this.features.length - 1) {
      newFeatureIndex += 1;
    }
    this.setFeature(newFeatureIndex);
  }

  shuffleFeature(): void {
    let randomFeatureIndex: number;
    do {
      randomFeatureIndex = Math.floor(Math.random() * this.features.length);
    } while (randomFeatureIndex === this.featureIndex);
    this.setFeature(randomFeatureIndex);
  }
}
