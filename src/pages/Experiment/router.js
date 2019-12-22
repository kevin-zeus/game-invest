import TestA from './TestA';
import TestB from './TestB';
import PreSociety from './PreSociety';
import PreRisk from './PreRisk';
import Society from './Society';
import Risk from './Risk';
import Weather from './Weather';
import Emotion from './Emotion';

export default [
  {
    path: '/test_b',
    component: TestB,
    name: '实验B',
    type: 'test_b',
  },
  {
    path: '/emotion',
    component: Emotion,
    name: '实验E',
    type: 'emotion',
  },
  {
    path: '/pre-society',
    component: PreSociety,
    name: '实验S-预',
    type: 'pre_society',
  },
  {
    path: '/pre-risk',
    component: PreRisk,
    name: '实验R-预',
    type: 'pre_risk',
  },
  {
    path: '/society',
    component: Society,
    name: '实验S',
    type: 'society',
  },
  {
    path: '/risk',
    component: Risk,
    name: '实验R',
    type: 'risk',
  },
  {
    path: '/weather',
    component: Weather,
    name: '实验W',
    type: 'weather',
  },
  {
    path: '/test_a',
    component: TestA,
    name: '实验A',
    type: 'test_a',
  },
];
