import TestA from './TestA';
import TestB from './TestB';
import Emotion from './Emotion';

import Setting from './Setting';

export default [
  {
    menu: '认知测试A',
    path: '/test-a',
    component: TestA,
    icon: 'snippets',
  },
  {
    menu: '认知测试B',
    path: '/test-b',
    component: TestB,
    icon: 'snippets',
  },
  {
    menu: '情绪问卷调查',
    path: '/emotion',
    component: Emotion,
    icon: 'snippets',
  },
  {
    menu: '设置',
    path: '/setting',
    component: Setting,
    icon: 'setting',
  },
];
