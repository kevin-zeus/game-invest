import TestA from './TestA';
import TestB from './TestB';
import Society from './Society';

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
];
