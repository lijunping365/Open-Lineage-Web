import React, { useEffect, useRef, useState } from 'react';
import Toolbar from '../Toolbar';
import Topbar from '../Topbar';
import G6 from '@antv/g6';
import './index.css';
import './registerShape';
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
  const ref = useRef(null);
  const toolbarRef = useRef(null);
  const graphRef = useRef<any>(null);
  const topbarRef = useRef<any>(null);
  const fieldCheckedRef = useRef<any>(true);
  const wholeCheckedRef = useRef<any>(true);
  const currentHighlightColorRef = useRef<any>(highlightColor);
  const [highlight, setHighlight] = useState<boolean>(false);
  const [lineageWholeData, setLineageWholeData] = useState<any>();
  const [lineagePartData, setLineagePartData] = useState<any>();

  useEffect(() => {
    fieldCheckedRef.current = true;
    wholeCheckedRef.current = true;
    topbarRef?.current?.setFieldChecked(true);
    topbarRef?.current?.setWholeChecked(true);

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
    if (highlight) {
      handleHighlightColor(graphRef.current, highlightColor);
    }
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

  const handleFieldClick = (graph: any, evt: any) => {
    const { item, target } = evt;
    const name = target.get('name');
    if (!name) return;

    const model = item.getModel();
    const edges = item.getEdges();

    // 当前节点选中的 下标
    const sourceIndex = name.split('-')[2];
    // 当前节点选中的 label
    const sourceAnchor = model.attrs[sourceIndex]['key'];

    const leftActiveEdges: any[] = [];

    getLeftRelation(edges, model, sourceAnchor, leftActiveEdges);

    const rightActiveEdges: any[] = [];

    getRightRelation(edges, model, sourceAnchor, rightActiveEdges);

    // 清除状态
    clearAllStats(graph);

    // 设置当前节点状态
    graph.setItemState(item, 'highlight-' + sourceIndex, true);

    // 设置左关联边及节点状态
    setLeftStats(
      graph,
      leftActiveEdges,
      currentHighlightColorRef.current,
      'highlight'
    );

    // 设置右关联边及节点状态
    setRightStats(
      graph,
      rightActiveEdges,
      currentHighlightColorRef.current,
      'highlight'
    );
  };

  const handleNodeClick = (graph: any, evt: any) => {
    const { item, target } = evt;

    console.log(item, target);
    const name = target.get('name');
    if (!name) return;

    const model = item.getModel();
    const edges = item.getEdges();

    // 当前节点选中的 label
    const sourceAnchor = name;

    const leftActiveEdges: any[] = [];

    getLeftRelation(edges, model, sourceAnchor, leftActiveEdges);

    const rightActiveEdges: any[] = [];

    getRightRelation(edges, model, sourceAnchor, rightActiveEdges);

    // 清除状态
    clearAllStats(graph);

    // 设置当前节点状态
    graph.setItemState(item, 'tableHighlight', true);

    // 设置左关联边及节点状态
    setLeftStats(
      graph,
      leftActiveEdges,
      currentHighlightColorRef.current,
      'tableHighlight'
    );

    // 设置右关联边及节点状态
    setRightStats(
      graph,
      rightActiveEdges,
      currentHighlightColorRef.current,
      'tableHighlight'
    );
  };

  const bindEvents = (graph: any) => {
    // 节点点击
    graph.off('node:click').on('node:click', (evt: any) => {
      console.log('node:click');
      setHighlight(true);
      if (fieldCheckedRef.current) {
        handleFieldClick(graph, evt);
      } else {
        handleNodeClick(graph, evt);
      }
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
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
        // 布局配置
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          align: 'UL',
          controlPoints: true,
          nodesepFunc: () => 0.2,
          ranksepFunc: () => 0.5,
        },
        defaultNode: {
          size: [300, 400],
          type: 'dice-er-box',
          color: '#5B8FF9',
          boxStyle: {
            stroke: '#096DD9',
            radius: 4,
          },
          style: {
            fill: '#9EC9FF',
            lineWidth: 3,
          },
          labelCfg: {
            style: {
              fill: 'black',
              fontSize: 20,
            },
          },
        },
        defaultEdge: {
          type: 'dice-er-edge',
          style: {
            stroke: '#5B8FF9',
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
            ref={topbarRef}
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
