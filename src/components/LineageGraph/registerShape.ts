import G6 from '@antv/g6';

// 行高
export const itemHeight = 42;
// 字体大小
const fontSize = 24;
// 文字 X 轴偏移量
const fontOffsetX = 12;
// 文字 Y 轴偏移量
const fontOffsetY = itemHeight / 2 + fontSize / 2;
// 边框线框
const lineWidth = 6;
// 最外层层级大小
export const maxLevel = -1;
// 节点宽度
export const nodeWidth = 400;

const colorMap: any = {
  '0': { fill: '#F49722' },
  '-1': { fill: '#50E3C2' },
};

const handleLabelLength = (label: string) => {
  return (label && label.length) > 26 ? label.slice(0, 26) + '...' : label;
};

G6.registerNode('dice-er-box', {
  draw: function draw(cfg: any, group: any) {
    const style = cfg.style;
    // 边框、底色控制
    const boxStyle = cfg.boxStyle;
    const level: string = cfg.level;
    const { attrs } = cfg;
    const height = itemHeight * (attrs.length + 1);
    const fillColor = colorMap[level]?.fill || style.fill;
    const radius =
      attrs.length > 0
        ? [boxStyle.radius, boxStyle.radius, 0, 0]
        : boxStyle.radius;

    // 节点顶部矩形
    group.addShape('rect', {
      attrs: {
        fill: fillColor,
        height: itemHeight,
        width: nodeWidth,
        radius: radius,
      },
      draggable: true,
      name: cfg.label,
    });

    // 节点顶部文本
    group.addShape('text', {
      attrs: {
        y: fontOffsetY,
        x: fontOffsetX,
        fill: '#fff',
        text: handleLabelLength(cfg.label),
        fontSize: fontSize,
        fontWeight: 500,
      },
      draggable: true,
      name: cfg.label,
    });

    // 边框
    const keyshape = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: nodeWidth,
        height: height,
        stroke: fillColor,
        lineWidth: lineWidth,
        radius: boxStyle.radius,
        boxStyle: { ...boxStyle },
      },
      draggable: true,
    });

    const listContainer = group.addGroup({});

    if (attrs) {
      attrs.forEach((e: any, i: any) => {
        const { key } = e;
        // group部分图形控制
        listContainer.addShape('rect', {
          attrs: {
            x: 0,
            y: i * itemHeight + itemHeight,
            fill: '#ffffff',
            width: nodeWidth,
            height: itemHeight,
            cursor: 'pointer',
          },
          name: key,
          draggable: true,
        });

        // group文本控制
        listContainer.addShape('text', {
          attrs: {
            x: fontOffsetX,
            y: (i + 1) * itemHeight + fontOffsetY,
            text: handleLabelLength(key),
            fontSize: fontSize,
            fill: '#000',
            fontWeight: 500,
            cursor: 'pointer',
          },
          name: key,
          draggable: true,
        });
      });
    }

    return keyshape;
  },

  /**
   * 更改状态，主要用于高亮
   * @param name 状态名称
   * @param value true | false
   * @param item 要改变的节点
   */
  setState(name, value, item: any) {
    // 字段高亮
    if (name && name.startsWith('highlight')) {
      const anchor = name.split('-')[1];

      const shape = item.get('keyShape');
      // 查找 label 下标
      const anchorIndex = item
        .getModel()
        .attrs.findIndex((e: any) => e.key === anchor);
      // 查找 label 元素，通过下标来找
      const label = shape.get('parent').get('children')[3].get('children')[
        anchorIndex * 2 + 1
      ];

      if (value) {
        //label.attr('fill', '#A3B1BF');
        //label.attr('fill', 'red');
        label.attr('fontWeight', 800);
      } else {
        //label.attr('fill', '#A3B1BF');
        //label.attr('fill', 'red');
        label.attr('fontWeight', 500);
      }
    }

    // 表名称高亮
    if (name && name.startsWith('tableHighlight')) {
      const shape = item.get('keyShape');
      // shape.get('parent').get('children')[1] 表示拿到 text
      const label = shape.get('parent').get('children')[1];
      if (value) {
        //label.attr('fill', '#A3B1BF');
        //label.attr('fill', 'red');
        label.attr('fontWeight', 800);
      } else {
        //label.attr('fill', '#A3B1BF');
        //label.attr('fill', 'red');
        label.attr('fontWeight', 500);
      }
    }
  },

  getAnchorPoints() {
    return [
      [0, 0],
      [1, 0],
    ];
  },
});

G6.registerEdge('dice-er-edge', {
  draw: function draw(cfg: any, group: any) {
    const edge = group.cfg.item;
    const style = cfg.style;
    const sourceNode = edge.getSource().getModel();
    const targetNode = edge.getTarget().getModel();

    const sourceIndex = sourceNode.attrs.findIndex(
      (e: any) => e.key === cfg.sourceAnchor
    );

    const sourceStartIndex = sourceNode.startIndex || 0;

    let sourceY = itemHeight / 2 + lineWidth / 2;

    if (sourceIndex > sourceStartIndex - 1) {
      sourceY =
        itemHeight + (sourceIndex - sourceStartIndex + 0.5) * itemHeight;
    }

    const targetIndex = targetNode.attrs.findIndex(
      (e: any) => e.key === cfg.targetAnchor
    );

    const targetStartIndex = targetNode.startIndex || 0;

    let targetY = itemHeight / 2 + lineWidth / 2;

    if (targetIndex > targetStartIndex - 1) {
      targetY =
        (targetIndex - targetStartIndex + 0.5) * itemHeight + itemHeight;
    }

    const startPoint = {
      ...cfg.startPoint,
    };
    const endPoint = {
      ...cfg.endPoint,
    };

    startPoint.y = startPoint.y + sourceY;
    endPoint.y = endPoint.y + targetY;

    let shape; // 就是那条线

    if (sourceNode.id !== targetNode.id) {
      shape = group.addShape('path', {
        attrs: {
          stroke: style.stroke,
          lineWidth: style.lineWidth,
          path: [
            ['M', startPoint.x, startPoint.y],
            [
              'C',
              endPoint.x / 3 + (2 / 3) * startPoint.x,
              startPoint.y,
              endPoint.x / 3 + (2 / 3) * startPoint.x,
              endPoint.y,
              endPoint.x,
              endPoint.y,
            ],
          ],
          endArrow: true,
        },
        name: 'path-shape',
      });
    }

    return shape;
  },

  /**
   * 设置状态，主要用于高亮
   * @param name 状态
   * @param value true | false
   * @param item 要改变状态的边
   */
  setState(name, value, item: any) {
    const shape = item.get('keyShape');
    // 字段连线高亮或表连线高亮
    if (name && name.startsWith('highlight')) {
      const highlightColor = name.split('-')[1];
      if (value) {
        //shape.attr('opacity', 0.2);

        shape.attr('stroke', highlightColor);
        shape.attr('lineWidth', 3);
      } else {
        //shape.attr('opacity', 1);

        shape.attr('stroke', '#6C6B6B');
        shape.attr('lineWidth', 2);
      }
    }
  },
});
