const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', { // 配置antd环境
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({ // 添加less解析，并设置antd的主题颜色
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#FF9912',
      '@link-color': '#FF9912',
    },
  }),
  addDecoratorsLegacy(), // 配置装饰器
);
