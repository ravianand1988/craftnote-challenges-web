import { fakeAsync, tick } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';

import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockDeclarations } from 'ng-mocks';
import { NgxEchartsDirective } from 'ngx-echarts';
import { Mock, mockProviders } from 'src/testing';
import { MOCK_FEATURE_1 } from 'src/testing/mock-data';

import { FeatureFormComponent } from '../feature-form/feature-form.component';
import { FeaturesComponent } from './features.component';

describe('FeaturesComponent', () => {
  let spectator: Spectator<FeaturesComponent>;
  let component: FeaturesComponent;
  let mockFireStore: Mock;
  let mockDialog: Mock;
  let mockDialogRef: Mock;

  const factory = createComponentFactory<FeaturesComponent>({
    component: FeaturesComponent,
    declarations: [
      MockDeclarations(
        MatIcon,
        NgxEchartsDirective,
      ),
    ],
    imports: [
    ],
    providers: [
      mockProviders.AngularFireStore,
      mockProviders.MatDialog,
      mockProviders.MatDialogRef,
    ],
  });

  beforeEach(() => {
    spectator = factory();
    component = spectator.component;
    mockFireStore = spectator.inject(mockProviders.AngularFireStore.provide);
    mockDialog = spectator.inject(mockProviders.MatDialog.provide);
    mockDialogRef = spectator.inject(mockProviders.MatDialogRef.provide);
  });

  it('creates', () => {
    expect(spectator).toBeTruthy();
  });

  it('displays add feature buttons correctly', () => {
    expect('.button-add-feature').toExist();
    expect('.button-add-feature').toHaveLength(2);
  });

  it('calls addFeature() when clicking on add feature button', () => {
    const addFeatureSpy = spyOn(component, 'addFeature');
    spectator.click('.button-add-feature');

    expect(addFeatureSpy).toHaveBeenCalled();
  });

  it('displays features chart', () => {
    expect('.chart-features').toExist();
  });

  describe('addFeature()', () => {
    beforeEach(() => {
      (mockDialog.open as jasmine.Spy).and.returnValue(mockDialogRef);
    });

    it('opens dialog with feature form component', () => {
      component.addFeature();
      expect(mockDialog.open).toHaveBeenCalledWith(FeatureFormComponent, {
        width: '400px',
      });
    });

    it('calls add() from fire store if feature exists', fakeAsync(() => {
      (mockFireStore.collection('features').add as jasmine.Spy).calls.reset();
      component.addFeature();
      mockDialogRef.getSubject('afterClosed').next(MOCK_FEATURE_1);
      tick();

      expect(mockFireStore.collection('features').add).toHaveBeenCalled();
    }));

    it('does not call add() from fire store if no feature', fakeAsync(() => {
      (mockFireStore.collection('features').add as jasmine.Spy).calls.reset();
      component.addFeature();
      mockDialogRef.getSubject('afterClosed').next(undefined);
      tick();

      expect(mockFireStore.collection('features').add).not.toHaveBeenCalled();
    }));
  });
});
