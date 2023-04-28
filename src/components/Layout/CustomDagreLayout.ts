import { Base } from '@antv/layout/lib/layout/base';

import {
  Edge,
  OutNode,
  DagreLayoutOptions,
  PointTuple,
  Point,
  Node,
} from '@antv/layout/lib/layout/types';

import dagre from '@antv/layout/lib/layout/dagre/index';

import {
  isArray,
  isNumber,
  isObject,
  getEdgeTerminal,
  getFunc,
  isString,
} from '@antv/layout/lib/util';

import { Graph as DagreGraph } from '@antv/layout/lib/layout/dagre/graph';

class CustomDagreLayout extends Base {
  /** layout 方向, 可选 TB, BT, LR, RL */
  public rankdir: 'TB' | 'BT' | 'LR' | 'RL' = 'TB';

  /** 节点对齐方式，可选 UL, UR, DL, DR */
  public align: undefined | 'UL' | 'UR' | 'DL' | 'DR';

  /** 布局的起始（左上角）位置 */
  public begin: PointTuple;

  /** 节点大小 */
  public nodeSize: number | number[] | undefined;

  /** 节点水平间距(px) */
  public nodesepFunc: ((d?: any) => number) | undefined;

  /** 每一层节点之间间距 */
  public ranksepFunc: ((d?: any) => number) | undefined;

  /** 节点水平间距(px) */
  public nodesep: number = 50;

  /** 每一层节点之间间距 */
  public ranksep: number = 50;

  /** 是否保留布局连线的控制点 */
  public controlPoints: boolean = false;

  /** 每层节点是否根据节点数据中的 comboId 进行排序，以防止同层 combo 重叠 */
  public sortByCombo: boolean = false;

  /** 是否保留每条边上的dummy node */
  public edgeLabelSpace: boolean = true;

  /** 是否基于 dagre 进行辐射布局，若是，第一层节点将被放置在最内环上，其余层依次向外辐射 */
  public radial: boolean = false;

  /** 给定的节点顺序，配合keepNodeOrder使用 */
  public nodeOrder: string[];

  /** 上次的布局结果 */
  public preset: {
    nodes: OutNode[];
    edges: any[];
  };

  public nodes: OutNode[] = [];

  public edges: Edge[] = [];

  /** 迭代结束的回调函数 */
  public onLayoutEnd: () => void = () => {};

  private nodeMap: {
    [id: string]: OutNode;
  };

  constructor(options?: DagreLayoutOptions) {
    super();
    this.updateCfg(options);
  }

  public getDefaultCfg() {
    return {
      rankdir: 'TB', // layout 方向, 可选 TB, BT, LR, RL
      align: undefined, // 节点对齐方式，可选 UL, UR, DL, DR
      nodeSize: undefined, // 节点大小
      nodesepFunc: undefined, // 节点水平间距(px)
      ranksepFunc: undefined, // 每一层节点之间间距
      nodesep: 50, // 节点水平间距(px)
      ranksep: 50, // 每一层节点之间间距
      controlPoints: false, // 是否保留布局连线的控制点
      radial: false, // 是否基于 dagre 进行辐射布局
      focusNode: null, // radial 为 true 时生效，关注的节点
    };
  }

  public layoutNode = (nodeId: string) => {
    const self = this;
    const { nodes } = self;
    const node = nodes.find((node) => node.id === nodeId);
    if (node) {
      const layout = node.layout !== false;
      return layout;
    }
    return true;
  };

  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const {
      nodes,
      nodeSize,
      rankdir,
      combos,
      begin,
      radial,
      comboEdges = [],
      vedges = [],
    } = self;
    if (!nodes) return;
    const edges = (self.edges as any[]) || [];
    const g = new DagreGraph({
      multigraph: true,
      compound: true,
    });

    // collect the nodes in their combo, to create virtual edges for comboEdges
    self.nodeMap = {};
    const nodeComboMap = {} as any;
    nodes.forEach((node) => {
      self.nodeMap[node.id] = node;
      if (!node.comboId) return;
      nodeComboMap[node.comboId] = nodeComboMap[node.comboId] || [];
      nodeComboMap[node.comboId].push(node.id);
    });

    let nodeSizeFunc: (d?: any) => number[];
    if (!nodeSize) {
      nodeSizeFunc = (d: any) => {
        if (d.size) {
          if (isArray(d.size)) {
            return d.size;
          }
          if (isObject(d.size)) {
            return [d.size.width || 40, d.size.height || 40];
          }
          return [d.size, d.size];
        }
        return [40, 40];
      };
    } else if (isArray(nodeSize)) {
      nodeSizeFunc = () => nodeSize;
    } else {
      nodeSizeFunc = () => [nodeSize, nodeSize];
    }
    const ranksepfunc = getFunc(self.ranksep, 50, self.ranksepFunc);
    const nodesepfunc = getFunc(self.nodesep, 50, self.nodesepFunc);
    let horisep: Function = nodesepfunc;
    let vertisep: Function = ranksepfunc;

    if (rankdir === 'LR' || rankdir === 'RL') {
      horisep = ranksepfunc;
      vertisep = nodesepfunc;
    }
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph(self);

    const comboMap: { [key: string]: any } = {};

    nodes
      .filter((node) => node.layout !== false)
      .forEach((node) => {
        const size = nodeSizeFunc(node);
        const verti = vertisep(node);
        const hori = horisep(node);
        const width = size[0] + 2 * hori;
        const height = size[1] + 2 * verti;
        const layer = node.layer;
        if (isNumber(layer)) {
          // 如果有layer属性，加入到node的label中
          g.setNode(node.id, { width, height, layer });
        } else {
          g.setNode(node.id, { width, height });
        }

        if (this.sortByCombo && node.comboId) {
          if (!comboMap[node.comboId]) {
            comboMap[node.comboId] = { id: node.comboId };
            g.setNode(node.comboId, {});
          }
          g.setParent(node.id, node.comboId);
        }
      });

    edges.forEach((edge) => {
      // dagrejs Wiki https://github.com/dagrejs/dagre/wiki#configuring-the-layout
      const source = getEdgeTerminal(edge, 'source');
      const target = getEdgeTerminal(edge, 'target');
      if (this.layoutNode(source) && this.layoutNode(target)) {
        g.setEdge(source, target, {
          weight: edge.weight || 1,
        });
      }
    });

    // 考虑增量图中的原始图
    let prevGraph: DagreGraph | undefined = undefined;
    if (self.preset?.nodes) {
      prevGraph = new DagreGraph({
        multigraph: true,
        compound: true,
      });
      self.preset.nodes.forEach((node) => {
        prevGraph?.setNode(node.id, node);
      });
    }

    dagre.layout(g, {
      prevGraph,
      edgeLabelSpace: self.edgeLabelSpace,
      keepNodeOrder: Boolean(!!self.nodeOrder),
      nodeOrder: self.nodeOrder,
    });

    const dBegin = [0, 0];
    if (begin) {
      let minX = Infinity;
      let minY = Infinity;
      g.nodes().forEach((node) => {
        const coord = g.node(node)!;
        if (minX > coord.x!) minX = coord.x!;
        if (minY > coord.y!) minY = coord.y!;
      });
      g.edges().forEach((edge) => {
        const coord = g.edge(edge)!;
        coord.points?.forEach((point: any) => {
          if (minX > point.x) minX = point.x;
          if (minY > point.y) minY = point.y;
        });
      });
      dBegin[0] = begin[0] - minX;
      dBegin[1] = begin[1] - minY;
    }

    const isHorizontal = rankdir === 'LR' || rankdir === 'RL';

    const layerCoords: Set<number> = new Set();
    const isInvert = rankdir === 'BT' || rankdir === 'RL';
    const layerCoordSort = isInvert
      ? (a: number, b: number) => b - a
      : (a: number, b: number) => a - b;
    g.nodes().forEach((node: any) => {
      const coord = g.node(node)!;
      if (!coord) return;
      let ndata: any = this.nodeMap[node];
      if (!ndata) {
        ndata = combos?.find((it) => it.id === node);
      }
      if (!ndata) return;
      ndata.x = coord.x! + dBegin[0];
      ndata.y = coord.y! + dBegin[1];
      // @ts-ignore: pass layer order to data for increment layout use
      ndata._order = coord._order;
      layerCoords.add(isHorizontal ? ndata.x : ndata.y);
    });
    const layerCoordsArr = Array.from(layerCoords).sort(layerCoordSort);

    // pre-define the isHorizontal related functions to avoid redundant calc in interations
    const isDifferentLayer = isHorizontal
      ? (point1: Point, point2: Point) => point1.x !== point2.x
      : (point1: Point, point2: Point) => point1.y !== point2.y;
    const filterControlPointsOutOfBoundary = isHorizontal
      ? (ps: Point[], point1: Point, point2: Point) => {
          const max = Math.max(point1.y, point2.y);
          const min = Math.min(point1.y, point2.y);
          return ps.filter((point) => point.y <= max && point.y >= min);
        }
      : (ps: Point[], point1: Point, point2: Point) => {
          const max = Math.max(point1.x, point2.x);
          const min = Math.min(point1.x, point2.x);
          return ps.filter((point) => point.x <= max && point.x >= min);
        };

    g.edges().forEach((edge: any) => {
      const coord = g.edge(edge);
      const i = edges.findIndex((it) => {
        const source = getEdgeTerminal(it, 'source');
        const target = getEdgeTerminal(it, 'target');
        return source === edge.v && target === edge.w;
      });
      if (i <= -1) return;
      if (
        self.edgeLabelSpace &&
        self.controlPoints &&
        edges[i].type !== 'loop'
      ) {
        const sourceNode = self.nodeMap[edge.v];
        const targetNode = self.nodeMap[edge.w];
        edges[i].controlPoints = getControlPoints(
          coord?.points,
          sourceNode,
          targetNode,
          layerCoordsArr,
          isHorizontal,
          isDifferentLayer,
          filterControlPointsOutOfBoundary
        );
        edges[i].controlPoints.forEach((point: any) => {
          point.x += dBegin[0];
          point.y += dBegin[1];
        });
      }
    });

    if (self.onLayoutEnd) self.onLayoutEnd();
    return {
      nodes,
      edges,
    };
  }

  public getType() {
    return 'dagre';
  }
}

/**
 * Format controlPoints to avoid polylines crossing nodes
 * @param points
 * @param sourceNode
 * @param targetNode
 * @param layerCoordsArr
 * @param isHorizontal
 * @returns
 */
const getControlPoints = (
  points: Point[] | undefined,
  sourceNode: OutNode,
  targetNode: OutNode,
  layerCoordsArr: number[],
  isHorizontal: boolean,
  isDifferentLayer: (point1: Point, point2: Point) => boolean,
  filterControlPointsOutOfBoundary: (
    ps: Point[],
    point1: Point,
    point2: Point
  ) => Point[]
) => {
  let controlPoints = points?.slice(1, points.length - 1) || []; // 去掉头尾
  // 酌情增加控制点，使折线不穿过跨层的节点
  if (sourceNode && targetNode) {
    let { x: sourceX, y: sourceY } = sourceNode;
    let { x: targetX, y: targetY } = targetNode;
    if (isHorizontal) {
      sourceX = sourceNode.y;
      sourceY = sourceNode.x;
      targetX = targetNode.y;
      targetY = targetNode.x;
    }
    // 为跨层级的边增加第一个控制点。忽略垂直的/横向的边。
    // 新控制点 = {
    //   x: 终点x,
    //   y: (起点y + 下一层y) / 2,   #下一层y可能不等于终点y
    // }
    if (targetY !== sourceY && sourceX !== targetX) {
      const sourceLayer = layerCoordsArr.indexOf(sourceY);
      const sourceNextLayerCoord = layerCoordsArr[sourceLayer + 1];
      if (sourceNextLayerCoord) {
        const firstControlPoint = controlPoints[0];
        const insertStartControlPoint = isHorizontal
          ? {
              x: (sourceY + sourceNextLayerCoord) / 2,
              y: firstControlPoint?.y || targetX,
            }
          : {
              x: firstControlPoint?.x || targetX,
              y: (sourceY + sourceNextLayerCoord) / 2,
            };
        // 当新增的控制点不存在（!=当前第一个控制点）时添加
        if (
          !firstControlPoint ||
          isDifferentLayer(firstControlPoint, insertStartControlPoint)
        ) {
          controlPoints.unshift(insertStartControlPoint);
        }
      }

      const targetLayer = layerCoordsArr.indexOf(targetY);
      const layerDiff = Math.abs(targetLayer - sourceLayer);
      if (layerDiff === 1) {
        controlPoints = filterControlPointsOutOfBoundary(
          controlPoints,
          sourceNode,
          targetNode
        );
        // one controlPoint at least
        if (!controlPoints.length) {
          controlPoints.push(
            isHorizontal
              ? {
                  x: (sourceY + targetY) / 2,
                  y: sourceX,
                }
              : {
                  x: sourceX,
                  y: (sourceY + targetY) / 2,
                }
          );
        }
      } else if (layerDiff > 1) {
        const targetLastLayerCoord = layerCoordsArr[targetLayer - 1];
        if (targetLastLayerCoord) {
          const lastControlPoints = controlPoints[controlPoints.length - 1];
          const insertEndControlPoint = isHorizontal
            ? {
                x: (targetY + targetLastLayerCoord) / 2,
                y: lastControlPoints?.y || targetX,
              }
            : {
                x: lastControlPoints?.x || sourceX,
                y: (targetY + targetLastLayerCoord) / 2,
              };
          // 当新增的控制点不存在（!=当前最后一个控制点）时添加
          if (
            !lastControlPoints ||
            isDifferentLayer(lastControlPoints, insertEndControlPoint)
          ) {
            controlPoints.push(insertEndControlPoint);
          }
        }
      }
    }
  }
  return controlPoints;
};

export default CustomDagreLayout;
