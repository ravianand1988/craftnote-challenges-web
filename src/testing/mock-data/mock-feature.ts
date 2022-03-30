import { Feature } from 'src/app/modules/dashboard/pages';

const MOCK_FEATURE_1: Feature = {
  featureName: 'foo', importance: 2.2, quantity: 3
};

const MOCK_FEATURES: Feature[] = [
  MOCK_FEATURE_1,
  { featureName: 'bar', importance: 2.2, quantity: 4 },
  { featureName: 'baz', importance: 2.2, quantity: 5 },
];

export {
  MOCK_FEATURE_1,
  MOCK_FEATURES,
};
