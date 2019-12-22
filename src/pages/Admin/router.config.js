import TestA from './TestA';
import TestB from './TestB';
import Emotion from './Emotion';
import Setting from './Setting';
import PreSociety from './PreSociety';
import PreRisk from './PreRisk';
import Society from './Society';
import Risk from './Risk';
import Weather from './Weather';

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
    menu: '【预】亲社会实验',
    path: '/pre-society',
    component: PreSociety,
    icon: 'snippets',
  },
  {
    menu: '亲社会实验',
    path: '/society',
    component: Society,
    icon: 'snippets',
  },
  {
    menu: '【预】风险偏好',
    path: '/pre-risk',
    component: PreRisk,
    icon: 'snippets',
  },
  {
    menu: '风险偏好',
    path: '/risk',
    component: Risk,
    icon: 'snippets',
  },
  {
    menu: '天气感知问卷',
    path: '/weather',
    component: Weather,
    icon: 'snippets',
  },
  {
    menu: '设置',
    path: '/setting',
    component: Setting,
    icon: 'setting',
  },
];
