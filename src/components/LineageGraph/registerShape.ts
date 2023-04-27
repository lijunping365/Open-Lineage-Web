import G6 from '@antv/g6';

const itemHeight = 30;

const colorMap: any = {
  '0': { stroke: '#F49722' },
  last: { stroke: '#50E3C2' },
};

const handleLabel = (label: string) => {
  return (label && label.length) > 32 ? label.slice(0, 32) + '...' : label;
};

G6.registerNode('dice-er-box', {
  draw: function draw(cfg: any, group: any) {
    // 节点容器size
    const width = 250;
    // 边框、底色控制
    const boxStyle = cfg.boxStyle;
    const level: string = cfg.level;
    const { attrs, startIndex = 0 } = cfg;
    const height = itemHeight * (attrs.length + 1);
    const fillColor = colorMap[level]?.stroke || boxStyle.stroke;
    const radius =
      attrs.length > 0
        ? [boxStyle.radius, boxStyle.radius, 0, 0]
        : boxStyle.radius;
    // 节点顶部矩形
    group.addShape('rect', {
      attrs: {
        fill: fillColor,
        height: 30,
        width,
        radius: radius,
      },
      draggable: true,
      name: cfg.label,
    });

    let fontLeft = 12; //x 偏移量

    // 节点顶部文本
    group.addShape('text', {
      attrs: {
        y: 22,
        x: fontLeft,
        fill: '#fff',
        text: handleLabel(cfg.label),
        fontSize: 12,
        fontWeight: 500,
      },
      name: cfg.label,
    });

    const offsetY = (0.5 - (startIndex % 1)) * itemHeight + 30;

    // 边框
    const keyshape = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width,
        height: height,
        stroke: fillColor,
        lineWidth: 2,
        radius: boxStyle.radius,
        boxStyle: { ...boxStyle },
      },
      draggable: true,
    });

    const listContainer = group.addGroup({});

    if (attrs) {
      attrs.forEach((e: any, i: any) => {
        let { key = '', type } = e;
        if (type) {
          key += ' - ' + type;
        }

        // group部分图形控制
        listContainer.addShape('rect', {
          attrs: {
            x: 1,
            y: i * itemHeight - itemHeight / 2 + offsetY,
            width: width,
            height: itemHeight,
            radius: 2,
            lineWidth: 1,
            cursor: 'pointer',
          },
          name: `item-${Math.floor(startIndex) + i}-content`,
          draggable: true,
        });

        // group文本控制
        listContainer.addShape('text', {
          attrs: {
            x: 12,
            y: i * itemHeight + offsetY + 6,
            text: handleLabel(key),
            fontSize: 12,
            fill: '#000',
            fontFamily:
              'Avenir,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
            full: e,
            fontWeight: 500,
            cursor: 'pointer',
          },
          name: `item-${cfg.id}-${Math.floor(startIndex) + i}`,
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
      const selectedIndex = Number(name.split('-')[1]);
      //console.log('ppppppppppppp', selectedIndex);
      const shape = item.get('keyShape');
      // shape.get('parent').get('children')[3] 表示拿到 group，我们的字段就在 group 中
      const label = shape.get('parent').get('children')[3].get('children')[
        selectedIndex * 2 + 1
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
    const sourceNode = edge.getSource().getModel();
    const targetNode = edge.getTarget().getModel();

    const sourceIndex = sourceNode.attrs.findIndex(
      (e: any) => e.key === cfg.sourceAnchor
    );

    const sourceStartIndex = sourceNode.startIndex || 0;

    let sourceY = 15;

    if (sourceIndex > sourceStartIndex - 1) {
      sourceY = 30 + (sourceIndex - sourceStartIndex + 0.5) * 30;
    }

    const targetIndex = targetNode.attrs.findIndex(
      (e: any) => e.key === cfg.targetAnchor
    );

    const targetStartIndex = targetNode.startIndex || 0;

    let targetY = 15;

    if (targetIndex > targetStartIndex - 1) {
      targetY = (targetIndex - targetStartIndex + 0.5) * 30 + 30;
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
          stroke: '#6C6B6B',
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
        shape.attr('lineWidth', 1);
      }
    }
  },
});
