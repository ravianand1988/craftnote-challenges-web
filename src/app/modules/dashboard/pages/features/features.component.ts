import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { FeatureFormComponent } from '../feature-form/feature-form.component';

interface Feature {
  featureName: string;
  importance: number;
  quantity: number;
}

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  public options: any;
  private featureCollection: AngularFirestoreCollection<Feature>;
  public features: Observable<Feature[]>;

  constructor(
    private dialog: MatDialog,
    private fireStore: AngularFirestore,
  ) {
    this.featureCollection = this.fireStore.collection<Feature>('features');
    this.features = this.featureCollection.valueChanges().pipe(
      tap((features) => {
        const xAxisData = features.map(f => f.featureName);
        const data1 = features.map(f => f.importance);
        const data2 = features.map(f => f.quantity);
        this.options = {
          legend: {
            data: ['importance', 'quantity'],
            align: 'left',
          },
          tooltip: {},
          xAxis: {
            data: xAxisData,
            silent: false,
            splitLine: {
              show: false,
            },
          },
          yAxis: {},
          series: [
            {
              name: 'importance',
              type: 'bar',
              data: data1,
              animationDelay: (idx: number) => idx * 10,
            },
            {
              name: 'quantity',
              type: 'bar',
              data: data2,
              animationDelay: (idx: number) => idx * 10 + 100,
            },
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: (idx: number) => idx * 5,
        };
      }),
    );
  }

  ngOnInit(): void {
  }

  public addFeature(): void {
    const dialogRef = this.dialog.open(FeatureFormComponent, {
      width: '400px',
      data: {
        feature: {},
      },
    });

    dialogRef.afterClosed().subscribe(
      ((feature: Feature | undefined) => {
        console.log('feature from dialog: ', feature);

        if (!feature) {
          return;
        }

        this.featureCollection.add(feature);
      }),
    );
  }
}

export {
  Feature,
}
