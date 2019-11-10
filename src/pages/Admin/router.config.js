import TestA from './TestA';
import TestB from './TestB';
import Emotion from './Emotion';

import Setting from './Setting';
import Society from './Society';

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
  {
    menu: '设置',
    path: '/setting',
    component: Setting,
    icon: 'setting',
  },
  {
    menu: '亲社会实验',
    path: '/society',
    component: Society,
    icon: 'snippets',
  },
];
