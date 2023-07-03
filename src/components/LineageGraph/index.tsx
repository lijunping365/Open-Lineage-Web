import React, { useEffect, useRef, useState } from 'react';
import Toolbar from './components/Toolbar';
import Topbar from './components/Topbar';
import G6 from '@antv/g6';
import './index.css';
import './registerShape';
import './registerLayout';
import {
  collapseData,
  getLeftRelation,
  getRightRelation,
  transformData,
} from '../../utils/common';
import {
  clearAllStats,
  handleAutoZoom,
  handleDownloadImage,
  handleHighlightColor,
  handleRealZoom,
  handleRefreshLayout,
  handleTextWaterMarker,
  handleZoomIn,
  handleZoomOut,
  renderGraph,
  setLeftStats,
  setRightStats,
} from '../../utils/graphUtil';
import { dataTransform, initData } from '../../test/test';

interface LineageGraphProps {
  /**
   * 血缘数据
   */
  lineageData: any;
  /**
   * 水印文字
   */
  textWaterMarker: string;
  /**
   * 高亮颜色
   */
  highlightColor: string;
}

const LineageGraph = ({
  lineageData,
  highlightColor,
  textWaterMarker,
}: LineageGraphProps) => {
  const ref = useRef<any>();
  const toolbarRef = useRef<any>();
  const graphRef = useRef<any>();
  const topBarRef = useRef<any>();
  const fieldCheckedRef = useRef<any>(true);
  const wholeCheckedRef = useRef<any>(true);
  const currentHighlightColorRef = useRef<any>(highlightColor);
  const [lineageWholeData, setLineageWholeData] = useState<any>();
  const [lineagePartData, setLineagePartData] = useState<any>();

  useEffect(() => {
    fieldCheckedRef.current = true;
    wholeCheckedRef.current = true;
    topBarRef?.current?.setFieldChecked(true);
    topBarRef?.current?.setWholeChecked(true);

    if (lineageData) {
      const wholeData = lineageData.withProcessData[0];
      const partData = lineageData.noProcessData[0];
      setLineageWholeData(wholeData);
      setLineagePartData(partData);
      const t1 = transformData(wholeData);
      renderGraph(graphRef.current, t1);
      //renderGraph(graphRef.current, dataTransform(initData(100)));
    }
  }, [lineageData]);

  useEffect(() => {
    handleTextWaterMarker(graphRef.current, textWaterMarker);
  }, [textWaterMarker]);

  useEffect(() => {
    currentHighlightColorRef.current = highlightColor;
    handleHighlightColor(graphRef.current, highlightColor);
  }, [highlightColor]);

  /**
   * 处理字段血缘切换
   */
  const onFieldLineage = (checked: boolean) => {
    fieldCheckedRef.current = checked;
    if (!lineageWholeData || !lineagePartData) {
      return;
    }
    let data: any;
    if (checked) {
      if (wholeCheckedRef.current) {
        data = transformData(lineageWholeData);
      } else {
        data = transformData(lineagePartData);
      }
    } else {
      if (wholeCheckedRef.current) {
        data = collapseData(lineageWholeData);
      } else {
        data = collapseData(lineagePartData);
      }
    }
    renderGraph(graphRef.current, data);
  };

  /**
   * 处理完整血缘链路切换
   */
  const onWholeLineage = (checked: boolean) => {
    wholeCheckedRef.current = checked;
    if (!lineageWholeData || !lineagePartData) {
      return;
    }
    let data: any;
    if (checked) {
      if (fieldCheckedRef.current) {
        data = transformData(lineageWholeData);
      } else {
        data = collapseData(lineageWholeData);
      }
    } else {
      if (fieldCheckedRef.current) {
        data = transformData(lineagePartData);
      } else {
        data = collapseData(lineagePartData);
      }
    }
    renderGraph(graphRef.current, data);
  };

  /**
   * 处理节点点击事件
   */
  const handleNodeClick = (
    graph: any,
    item: any,
    currentAnchor: string,
    name: string
  ) => {
    const model = item.getModel();
    const edges = item.getEdges();

    const leftActiveEdges: any[] = [];

    getLeftRelation(edges, model, currentAnchor, leftActiveEdges);

    const rightActiveEdges: any[] = [];

    getRightRelation(edges, model, currentAnchor, rightActiveEdges);

    // 清除状态
    clearAllStats(graph);

    // 设置当前节点状态
    graph.setItemState(item, name + '-' + currentAnchor, true);

    // 设置左关联边及节点状态
    setLeftStats(
      graph,
      leftActiveEdges,
      currentHighlightColorRef.current,
      name
    );

    // 设置右关联边及节点状态
    setRightStats(
      graph,
      rightActiveEdges,
      currentHighlightColorRef.current,
      name
    );
  };

  /**
   * 处理连线点击事件
   */
  const handleEdgeClick = (graph: any, item: any, name: string) => {
    const sourceNode = item.getSource();
    const sourceModel = sourceNode.getModel();
    const sourceEdges = sourceNode.getInEdges();

    // 获取当前连线的 source 节点
    const sourceAnchor = item.getModel()['sourceAnchor'];

    const leftActiveEdges: any[] = [];
    leftActiveEdges.push(item);

    getLeftRelation(sourceEdges, sourceModel, sourceAnchor, leftActiveEdges);

    const targetNode = item.getTarget();
    const targetModel = targetNode.getModel();
    const targetEdges = targetNode.getOutEdges();

    // 获取当前连线的 target 节点
    const targetAnchor = item.getModel()['targetAnchor'];

    const rightActiveEdges: any[] = [];
    rightActiveEdges.push(item);

    getRightRelation(targetEdges, targetModel, targetAnchor, rightActiveEdges);

    // 清除状态
    clearAllStats(graph);

    // 设置左关联边及节点状态
    setLeftStats(
      graph,
      leftActiveEdges,
      currentHighlightColorRef.current,
      name
    );

    // 设置右关联边及节点状态
    setRightStats(
      graph,
      rightActiveEdges,
      currentHighlightColorRef.current,
      name
    );
  };

  const bindEvents = (graph: any) => {
    // 监听节点点击事件
    graph.off('node:click').on('node:click', (evt: any) => {
      const { item, target } = evt;
      const currentAnchor = target.get('name');
      if (!currentAnchor) return;

      if (fieldCheckedRef.current) {
        handleNodeClick(graph, item, currentAnchor, 'highlight');
      } else {
        handleNodeClick(graph, item, currentAnchor, 'tableHighlight');
      }
    });

    // 监听连线点击事件
    graph.off('edge:click').on('edge:click', (evt: any) => {
      const { item } = evt;
      if (fieldCheckedRef.current) {
        handleEdgeClick(graph, item, 'highlight');
      } else {
        handleEdgeClick(graph, item, 'tableHighlight');
      }
    });

    //监听只在 canvas 空白处点击事件
    graph.off('canvas:click').on('canvas:click', (ev: any) => {
      // 清除状态
      clearAllStats(graph);
    });
  };

  useEffect(() => {
    if (!graphRef.current) {
      // 实例化 Minimap
      const minimap = new G6.Minimap();
      // 工具栏
      const toolbar = new G6.ToolBar({
        getContent: () => {
          return toolbarRef.current || '';
        },
      });
      //网格画布
      const grid = new G6.Grid();
      const container: any = ref.current;
      const width = container.scrollWidth;
      const height = container.scrollHeight || 672;
      // 实例化 Graph
      graphRef.current = new G6.Graph({
        container: container || '',
        width: width,
        height: height,
        plugins: [grid, minimap, toolbar],
        fitView: true,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
        // 布局配置
        layout: {
          type: 'lineageLayout',
          controlPoints: true,
          nodesep: 200,
          ranksep: 600,
          begin: [1000, 1000],
        },
        defaultNode: {
          // size: [300, 800],
          type: 'dice-er-box',
          color: '#096DD9',
          boxStyle: {
            stroke: '#096DD9',
            lineWidth: 6,
            radius: 4,
          },
          style: {
            fill: '#096DD9',
          },
          labelCfg: {
            style: {
              fill: '#ffffff',
              fontSize: 20,
            },
          },
        },
        defaultEdge: {
          type: 'dice-er-edge',
          style: {
            stroke: '#6C6B6B',
            lineWidth: 2,
            endArrow: true,
          },
        },
      });
    }

    if (graphRef.current) {
      const graph = graphRef.current;
      // 设置文字水印
      graph.setTextWaterMarker(textWaterMarker);
      bindEvents(graph);
    }
  }, []);

  return (
    <div>
      <div ref={ref}>
        <div className='g6-component-topbar'>
          <Topbar
            ref={topBarRef}
            handleFieldLineage={(checked: any) => onFieldLineage(checked)}
            handleWholeLineage={(checked: any) => onWholeLineage(checked)}
          />
        </div>
        <div
          ref={toolbarRef}
          className='g6-component-toolbar'
        >
          <Toolbar
            handleZoomOut={() => handleZoomOut(graphRef.current)}
            handleZoomIn={() => handleZoomIn(graphRef.current)}
            handleRealZoom={() => handleRealZoom(graphRef.current)}
            handleAutoZoom={() => handleAutoZoom(graphRef.current)}
            handleRefreshLayout={() => handleRefreshLayout(graphRef.current)}
            handleDownloadImage={() => handleDownloadImage(graphRef.current)}
          />
        </div>
      </div>
    </div>
  );
};

export default LineageGraph;
