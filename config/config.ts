import { defineConfig } from 'umi';
import routes from './routes';
import path from 'path';

// 参考antd-pro 优化方式 https://github.com/alitajs/umi-antd-pro/blob/antd-pro/config/plugin.config.js
function getModulePackageName(module: { context: string }) {
  if (!module.context) return null;
  const nodeModulesPath = path.join(__dirname, '../node_modules/');
  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }
  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName: string | null = moduleDirName;
  if (packageName && packageName.match('^_')) {
    packageName = packageName.match(/^_(@?[^@]+)/)![1];
  }
  return packageName;
}

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  locale: {
    default: 'zh_CN',
    antd: false,
    title: true,
    baseNavigator: true,
    baseSeparator: '_',
  },
  hash: true, //编译加hash
  base: '/freeStyleTourism/',
  publicPath: '/freeStyleTourism/',
  // runtimePublicPath:true, //异步加载 JS、CSS 和图片等资源。
  routes: routes,
  fastRefresh: {},
  dynamicImport: {
    //配置打包按需加载
    loading: '@/components/Loading',
  },
  alias: {
    // 配置别名，对引用路径进行映射。第二步在tsconfig.json文件下面增加对应映射，可以忽略，但是会提示找不到模块,反人类的设计
    components: path.resolve(__dirname, '../src/components/'),
    utils: path.resolve(__dirname, '../src/utils/'),
    assets: path.resolve(__dirname, '../src/assets/'),
    video: path.resolve(process.cwd(), 'node_modules', 'video'),
  },
  dva: {
    immer: true, // 表示是否启用 immer 以方便修改 reducer
    hmr: true, // 表示是否启用 dva model 的热更新
  },
  // 配置具体含义见：https://github.com/umijs/umi-webpack-bundle-analyzer#options-for-plugin
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: false,

    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  ignoreMomentLocale: true, //忽略 moment 的 locale 文件，用于减少尺寸
  // esbuild: {},  //编译压缩  开发环境会报redux错误
  chunks: ['vendors', 'umi'],
  chainWebpack: function (config, { webpack }) {
    //通过 webpack-chain 的方式修改 webpack 配置。
    config.merge({
      optimization: {
        splitChunks: {
          name: 'vendors',
          chunks: 'async',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test: (module: { context: string }) => {
                const packageName = getModulePackageName(module) || '';
                if (packageName) {
                  return [
                    'react',
                    'react-dom',
                    'react-router',
                    'react-router-dom',
                    'dva',
                    'moment',
                    'video.js',
                    'swiper',
                    'material-ui',
                  ].includes(packageName);
                }
                return false;
              },
              priority: 10,
            },
            antd: {
              name: 'uiPlugin',
              test: /[\\/]node_modules[\\/](@ant-design|antd|antd-mobile)[\\/]/,
              chunks: 'all',
              priority: 9,
            },
          },
        },
      },
    });
  },
});
