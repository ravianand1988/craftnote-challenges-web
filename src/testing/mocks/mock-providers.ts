import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { of } from 'rxjs';

import { MOCK_FEATURES } from '../mock-data';
import { createMockProvider } from '../util';

const MOCK_ANGULAR_FIRE_AUTH_PROVIDER = createMockProvider(AngularFireAuth, {
  promises: [
    'createUserWithEmailAndPassword',
    'signInWithEmailAndPassword',
    'signOut',
  ],
  propertyObservables: ['user'],
});

const MOCK_ANGULAR_FIRE_STORE_VALUE_CHANGES = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(MOCK_FEATURES)),
  add: jasmine.createSpy('add').and.resolveTo({ status: 200 }),
};

const MOCK_ANGULAR_FIRE_STORE_PROVIDER = createMockProvider(AngularFirestore, {
  base: {
    collection: (_path: string = 'features') => MOCK_ANGULAR_FIRE_STORE_VALUE_CHANGES,
  }
});

const MOCK_ROUTER = createMockProvider(Router, {
  propertyObservables: ['events'],
  methods: ['navigate', 'navigateByUrl'],
  base: { url: '' },
});

const MOCK_MAT_DIALOG = createMockProvider(MatDialog, {
  methods: ['open'],
});

const MOCK_MAT_DIALOG_REF = createMockProvider(MatDialogRef, {
  methods: ['close'],
  observables: ['afterClosed'],
});

const mockProviders = {
  AngularFireAuth: MOCK_ANGULAR_FIRE_AUTH_PROVIDER,
  AngularFireStore: MOCK_ANGULAR_FIRE_STORE_PROVIDER,
  MatDialog: MOCK_MAT_DIALOG,
  MatDialogRef: MOCK_MAT_DIALOG_REF,
  Router: MOCK_ROUTER,
};

export {
  mockProviders,
};
