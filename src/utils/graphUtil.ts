// 放大
import { dataTransform, initData } from './common'

export const handleZoomOut = (graph: any) => {
  if (!graph) return;
  const current = graph.getZoom();
  const canvas = graph.get('canvas');
  const point = canvas.getPointByClient(
    canvas.get('width') / 2,
    canvas.get('height') / 2
  );
  const pixelRatio = canvas.get('pixelRatio') || 1;
  const ratio = 1 + 0.05 * 5;
  if (ratio * current > 5) {
    return;
  }
  graph.zoom(ratio, {
    x: point.x / pixelRatio,
    y: point.y / pixelRatio,
  });
  return {
    text: `${Math.round(ratio * current * 100)}%`,
    ratio: ratio * current,
  };
};

// 缩小
export const handleZoomIn = (graph: any) => {
  if (!graph) return;
  const current = graph.getZoom();
  const canvas = graph.get('canvas');
  const point = canvas.getPointByClient(
    canvas.get('width') / 2,
    canvas.get('height') / 2
  );
  const pixelRatio = canvas.get('pixelRatio') || 1;
  const ratio = 1 - 0.05 * 5;
  if (ratio * current < 0.3) {
    return;
  }
  graph.zoom(ratio, {
    x: point.x / pixelRatio,
    y: point.y / pixelRatio,
  });

  return {
    text: `${Math.round(ratio * current * 100)}%`,
    ratio: ratio * current,
  };
};

// 实际大小
export const handleRealZoom = (graph: any) => {
  if (!graph) return;
  const current = graph.getZoom();
  graph.zoom(1 / current);
  graph.fitCenter();
  return {
    text: '100%',
    ratio: 1,
  };
};

// 自适应canvas大小
export const handleAutoZoom = (graph: any) => {
  if (!graph) return;
  const nodes = graph.getNodes();
  if (nodes.length > 0) {
    graph.fitView([20, 20]);
  }
  const current = graph.getZoom();
  return {
    text: `${Math.round(current * 100)}%`,
    ratio: current,
  };
};

// 恢复布局
export const handleRefreshLayout = (graph: any) => {
  if (!graph) return;
  graph.layout();
};

// 下载图片
export const handleDownloadImage = (graph: any) => {
  if (!graph) return;
  graph.downloadFullImage('open-lineage', 'image/png', {
    padding: [30, 15, 15, 15],
  });
};

/**
 * 字段血缘
 */
export const handleFieldLineage = (graph: any, checked: boolean) => {
  if (!graph) return;
  console.log('字段血缘', checked);
  if (checked) {
    // 展开
    const data = dataTransform(initData(100));
    console.log('datadddddddddddd', data);
    graph.data(data);
    graph.render();
  } else {
    const data = dataTransform(initData(10));
    console.log('datadddddddddddd', data);
    graph.data(data);
    graph.render();
  }
};

/**
 * 完整血缘
 */
export const handleWholeLineage = (graph: any, checked: boolean) => {
  if (!graph) return;
  console.log('完整血缘', checked);
  if (checked) {
    // 展开
    const data = dataTransform(initData(100));
    console.log('datadddddddddddd', data);
    graph.data(data);
    graph.render();
  } else {
    const data = dataTransform(initData(10));
    console.log('datadddddddddddd', data);
    graph.data(data);
    graph.render();
  }
};

// 设置文字水印
export const handleTextWaterMarker = (graph: any, text: string) => {
  if (!graph) return;
  //setTextWaterMarker(text);
  console.log('', text);
  graph.setTextWaterMarker(text);
};

// 设置高亮颜色
export const handleHighlightColor = (graph: any, color: string) => {
  //setHighlightColor(color);
  // graphRef.current.setTextWaterMarker(text || 'beike');
};

/**
 * 清除状态
 */
export const clearAllStats = (graph: any) => {
  if (!graph) return;
  graph.setAutoPaint(false);
  // 清除节点状态
  graph.getNodes().forEach(function (node: any) {
    graph.clearItemStates(node);
  });
  // 清除边状态
  graph.getEdges().forEach(function (edge: any) {
    graph.clearItemStates(edge);
  });
  graph.paint();
  graph.setAutoPaint(true);
};

/**
 * 设置左边关联节点及边状态
 * @param edges 边
 */
export const setLeftStats = (graph: any, edges: any[]) => {
  if (!graph) return;
  edges.forEach(function (edge: any) {
    graph.setItemState(edge, 'highlight', true);
    edge.toFront();

    const sourceAnchor = edge.getModel()['sourceAnchor'];
    const sourceNode = edge.getSource().getModel();

    const sourceIndex = sourceNode.attrs.findIndex(
      (e: any) => e.key === sourceAnchor
    );

    graph.setItemState(edge.getSource(), 'highlight-' + sourceIndex, true);
  });
};

/**
 * 设置右边关联节点及边状态
 * @param edges 边
 */
export const setRightStats = (graph: any, edges: any[]) => {
  if (!graph) return;
  edges.forEach(function (edge: any) {
    graph.setItemState(edge, 'highlight', true);
    edge.toFront();

    const targetAnchor = edge.getModel()['targetAnchor'];
    const targetNode = edge.getTarget().getModel();

    const targetIndex = targetNode.attrs.findIndex(
      (e: any) => e.key === targetAnchor
    );

    graph.setItemState(edge.getTarget(), 'highlight-' + targetIndex, true);
  });
};
