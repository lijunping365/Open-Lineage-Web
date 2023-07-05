import React, { useEffect, useRef, useState } from 'react';
import Toolbar from '../LineageGraph/components/Toolbar';
import G6 from '@antv/g6';
import '../LineageGraph/index.css';
import '../LineageGraph/registerShape';
import '../LineageGraph/registerLayout';
import { getLeftRelation, getRightRelation } from '../../utils/common';
import {
  clearAllStats,
  handleAutoZoom,
  handleDownloadImage,
  handleEnterFullscreen,
  handleExitFullscreen,
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
import { dataTransform } from '../../test/test';

interface LineageGraphProps {
  /**
   * 布局
   */
  layout: any;
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

const LineageGraphTest = ({
  layout,
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

  useEffect(() => {
    if (lineageData) {
      const data = dataTransform(lineageData);
      renderGraph(graphRef.current, data);
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

  useEffect(() => {
    if (graphRef.current) {
      const windowWidth = document.documentElement.clientWidth;
      const windowHeight = document.documentElement.clientHeight;
      const height = window.outerHeight - 141 || windowHeight;
      const width = layout === 'preview' ? windowWidth : windowWidth - 340;
      graphRef.current.changeSize(width, height);
      graphRef.current.fitView();
    }
  }, [layout]);

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

  // 更改canvas宽高
  const handleChangeSize = (width: any, height: any) => {
    graphRef.current.changeSize(width, height);
    graphRef.current.fitView();
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
      const windowWidth = document.documentElement.clientWidth;
      const windowHeight = document.documentElement.clientHeight;
      const width = layout === 'preview' ? windowWidth : windowWidth - 340;
      const height = window.outerHeight - 141 || windowHeight;
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
      <div
        ref={ref}
        className='canvas-wrapper'
      >
        <div
          ref={toolbarRef}
          className='g6-component-toolbar'
        >
          <Toolbar
            layout={layout}
            handleChangeSize={handleChangeSize}
            handleZoomOut={() => handleZoomOut(graphRef.current)}
            handleZoomIn={() => handleZoomIn(graphRef.current)}
            handleRealZoom={() => handleRealZoom(graphRef.current)}
            handleAutoZoom={() => handleAutoZoom(graphRef.current)}
            handleRefreshLayout={() => handleRefreshLayout(graphRef.current)}
            handleDownloadImage={() => handleDownloadImage(graphRef.current)}
            handleEnterFullscreen={() => handleEnterFullscreen(ref.current)}
            handleExitFullscreen={() => handleExitFullscreen()}
          />
        </div>
      </div>
    </div>
  );
};

export default LineageGraphTest;
