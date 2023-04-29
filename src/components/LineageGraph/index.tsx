import React, { useEffect, useRef, useState } from 'react';
import Toolbar from '../Toolbar';
import Topbar from '../Topbar';
import G6 from '@antv/g6';
import './index.css';
import './registerShape';
import './registerLayout';
import {
  collapseData,
  getLeftRelation,
  getRightRelation,
  transformData,
  dataTransform,
  initData,
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

  const onFieldLineage = (checked: boolean) => {
    fieldCheckedRef.current = checked;
    if (!lineageWholeData || !lineagePartData) {
      return;
    }

    if (checked) {
      if (wholeCheckedRef.current) {
        const t1 = transformData(lineageWholeData);
        renderGraph(graphRef.current, t1);
      } else {
        const t2 = transformData(lineagePartData);
        renderGraph(graphRef.current, t2);
      }
    } else {
      if (wholeCheckedRef.current) {
        const t1 = collapseData(lineageWholeData);
        renderGraph(graphRef.current, t1);
      } else {
        const t2 = collapseData(lineagePartData);
        renderGraph(graphRef.current, t2);
      }
    }
  };

  const onWholeLineage = (checked: boolean) => {
    wholeCheckedRef.current = checked;
    if (!lineageWholeData || !lineagePartData) {
      return;
    }

    if (checked) {
      if (fieldCheckedRef.current) {
        const t1 = transformData(lineageWholeData);
        renderGraph(graphRef.current, t1);
      } else {
        const t1 = collapseData(lineageWholeData);
        renderGraph(graphRef.current, t1);
      }
    } else {
      if (fieldCheckedRef.current) {
        const t2 = transformData(lineagePartData);
        renderGraph(graphRef.current, t2);
      } else {
        const t1 = collapseData(lineagePartData);
        renderGraph(graphRef.current, t1);
      }
    }
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
      const height = container.scrollHeight || 600;
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
          type: 'dagre',
          rankdir: 'LR',
          align: undefined,
          controlPoints: true,
          nodesep: 100,
          ranksep: 200,
          // nodesepFunc: () => 0.2,
          // ranksepFunc: () => 0.5,
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
