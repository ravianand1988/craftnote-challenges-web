import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FeatureFormComponent } from '../feature-form/feature-form.component';

interface Feature {
  featureName: string;
  importance: number;
  quantity: number;
}

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesComponent implements OnInit {
  private _featureCollection: AngularFirestoreCollection<Feature>;

  public chartOptions$: Observable<any>;

  constructor(
    private dialog: MatDialog,
    private fireStore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this._featureCollection = this.fireStore.collection<Feature>('features');
    this.chartOptions$ = this._featureCollection.valueChanges().pipe(
      map((features) => {
        const xAxisData = features.map(f => f.featureName);
        const dataImportance = features.map(f => f.importance);
        const dataQuantity = features.map(f => f.quantity);

        return {
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
              data: dataImportance,
              animationDelay: (idx: number) => idx * 10,
            },
            {
              name: 'quantity',
              type: 'bar',
              data: dataQuantity,
              animationDelay: (idx: number) => idx * 10 + 100,
            },
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: (idx: number) => idx * 5,
        };
      }),
    );
  }

  public addFeature(): void {
    const dialogRef = this.dialog.open(FeatureFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(
      ((feature: Feature | undefined) => {
        if (!feature) {
          return;
        }

        this._featureCollection.add(feature);
      }),
    );
  }
}

export {
  Feature,
}
