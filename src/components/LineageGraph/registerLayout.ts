import G6, { Util } from '@antv/g6';
import { CustomDagreLayout } from './components/Layout';

G6.registerLayout('lineageLayout', CustomDagreLayout);

// G6.registerLayout('lineageLayout', {
//   /**
//    * 定义自定义行为的默认参数，会与用户传入的参数进行合并
//    */
//   getDefaultCfg() {
//     return {};
//   },
//   /**
//    * 初始化
//    * @param {Object} data 数据
//    */
//   init(data: any) {
//     const self = this;
//     self.nodes = data.nodes;
//     self.edges = data.edges;
//   },
//   /**
//    * 执行布局
//    */
//   execute() {
//     // TODO
//   },
//   /**
//    * 根据传入的数据进行布局
//    * @param {Object} data 数据
//    */
//   layout(data: any) {
//     const self = this;
//     self.init(data);
//     self.execute();
//   },
//   /**
//    * 更新布局配置，但不执行布局
//    * @param {Object} cfg 需要更新的配置项
//    */
//   updateCfg(cfg: any) {
//     const self = this;
//     Util.mix(self, cfg);
//   },
//   /**
//    * 销毁
//    */
//   destroy() {
//     const self = this;
//     self.positions = null;
//     self.nodes = null;
//     self.edges = null;
//     self.destroyed = true;
//   },
// });
