import { Base } from '@antv/layout/lib/layout/base';

import { DagreLayoutOptions, Node } from '@antv/layout/lib/layout/types';
import { maxLevel, nodeWidth } from '../../registerShape';

/**
 * 默认从左到右（maxLayer--->minLayer)
 * 默认居中对齐
 */
class CustomDagreLayout extends Base {
  /** 布局的起始（左上角）位置 */
  public begin: number[] = [0, 0];

  /** 节点水平间距(px) */
  public nodesep: number = 50;

  /** 每一层节点之间间距 */
  public ranksep: number = 50;

  constructor(options?: DagreLayoutOptions) {
    super();
    this.updateCfg(options);
  }

  public getDefaultCfg() {
    return {
      nodesep: 50, // 节点水平间距(px)
      ranksep: 50, // 每一层节点之间间距
      begin: [0, 0], // 布局的起点位置
    };
  }

  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const { nodes, edges, ranksep, nodesep, begin } = self;
    if (!nodes) return;
    const layerMap: Map<number, Node[]> = new Map();
    nodes.forEach((item: any, index, arr) => {
      if (!layerMap.has(item.level)) {
        layerMap.set(
          item.level,
          arr.filter((node: any) => node.level === item.level)
        );
      }
    });

    // TODO 重新调整层级
    const startX = begin[0];
    const startY = begin[1];
    const size = layerMap.size;
    const maxWidth = size * nodeWidth + (size - 1) * ranksep;
    const hr = Array.from(layerMap.values()).map((list: any[]) => {
      const sum = list.reduce((pre: any, curr: any) => {
        return pre + curr.size[1];
      }, 0);
      return sum + (list.length - 1) * nodesep;
    });
    const maxHeight = Math.max(...hr);
    const offsetX = startX + maxWidth;
    const offsetY = startY + maxHeight;
    const centerLine = offsetY - maxHeight / 2;

    layerMap.forEach((value, key) => {
      let d = key === maxLevel ? size - 1 : key;
      const x = offsetX - d * (nodeWidth + ranksep);
      const y = centerLine + hr[d] / 2;
      const sortNodes = value.sort((x: any, y: any) => y.order - x.order);
      let preY = y;
      sortNodes.forEach((e: any, index) => {
        const { size } = e;
        const margin = index === 0 ? 0 : nodesep;
        preY = preY - size[1] - margin;
        e.x = x;
        e.y = preY;
      });
    });
    if (self.onLayoutEnd) self.onLayoutEnd();
  }

  public getType() {
    return 'lineageLayout';
  }
}

export default CustomDagreLayout;
