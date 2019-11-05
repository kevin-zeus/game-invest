import TestA from './TestA';
import TestB from './TestB';
import Emotion from './Emotion';

export default [
  {
    menu: '认知测试A',
    path: '/text-a',
    component: TestA,
    icon: 'snippets',
  },
  {
    menu: '认知测试B',
    path: '/text-b',
    component: TestB,
    icon: 'snippets',
  },
  {
    menu: '情绪问卷调查',
    path: '/emotion',
    component: Emotion,
    icon: 'snippets',
  },
];
