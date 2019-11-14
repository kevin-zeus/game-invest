import TestA from './TestA';
import TestB from './TestB';
import Society from './Society';
import Risk from './Risk';
import Emotion from './Emotion';

export default [
  {
    path: '/test_a',
    component: TestA,
    name: '实验A',
    type: 'test_a',
  },
  {
    path: '/test_b',
    component: TestB,
    name: '实验B',
    type: 'test_b',
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
    path: '/emotion',
    component: Emotion,
    name: '实验E',
    type: 'emotion',
  },
];
