import { Base } from '@antv/layout/lib/layout/base';

import {
  Edge,
  OutNode,
  DagreLayoutOptions,
  PointTuple,
  Point,
  Node,
} from '@antv/layout/lib/layout/types';
import { maxLevel, width } from '../LineageGraph/registerShape';

/**
 * 默认从左到右（maxLayer--->minLayer)
 * 默认居中对齐
 */
class CustomDagreLayout extends Base {
  /** 布局的起始（左上角）位置 */
  public begin: PointTuple | undefined;

  /** 节点水平间距(px) */
  public nodesep: number = 50;

  /** 每一层节点之间间距 */
  public ranksep: number = 50;

  /** 每层数据 */
  private layerMap: Map<number, Node[]> = new Map();

  /** 图的最大宽度 */
  private maxWidth: number = 0;

  /** 图的最大高度 */
  private maxHeight: number = 0;

  constructor(options?: DagreLayoutOptions) {
    super();
    this.updateCfg(options);
  }

  public getDefaultCfg() {
    return {
      nodesep: 50, // 节点水平间距(px)
      ranksep: 50, // 每一层节点之间间距
    };
  }

  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const { nodes, edges, ranksep, nodesep, begin } = self;
    if (!nodes) return;
    nodes.forEach((item: any, index, arr) => {
      if (!self.layerMap.has(item.level)) {
        self.layerMap.set(
          item.level,
          arr.filter((node: any) => node.level === item.level)
        );
      }
    });

    // key = maxLevel => self.layerMap.size -1
    const layers = self.layerMap.size;
    self.maxWidth = layers * width + (layers - 1) * ranksep;

    self.layerMap.forEach((value, key) => {
      value.forEach((e: any, index) => {
        const { size } = e;
        if (key === maxLevel) {
          const d = self.layerMap.size - 1;
          e.x = self.maxWidth - d * (width + ranksep);
          e.y = 0;
        } else {
          e.x = self.maxWidth - key * (width + ranksep);
          e.y = 0;
        }
      });
    });
    if (self.onLayoutEnd) self.onLayoutEnd();
  }

  public getType() {
    return 'lineageLayout';
  }
}

export default CustomDagreLayout;
