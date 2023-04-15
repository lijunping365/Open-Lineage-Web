import G6 from '@antv/g6';

const itemHeight = 30;

G6.registerNode('dice-er-box', {
  draw: function draw(cfg: any, group: any) {
    // 节点容器size
    const width = 250;
    // 边框、底色控制
    const boxStyle = cfg.boxStyle;
    const { attrs, startIndex = 0 } = cfg;

    const height = itemHeight * (attrs.length + 1);

    // 节点顶部矩形
    group.addShape('rect', {
      attrs: {
        fill: boxStyle.stroke,
        height: 30,
        width,
        radius: [boxStyle.radius, boxStyle.radius, 0, 0],
      },
      draggable: true,
    });

    let fontLeft = 12; //x 偏移量

    // 节点顶部文本
    group.addShape('text', {
      attrs: {
        y: 22,
        x: fontLeft,
        fill: '#fff',
        text: cfg.label,
        fontSize: 12,
        fontWeight: 500,
      },
    });

    const offsetY = (0.5 - (startIndex % 1)) * itemHeight + 30;

    // 边框
    const keyshape = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width,
        height: height,
        ...boxStyle,
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
        const label = key.length > 26 ? key.slice(0, 24) + '...' : key;

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
            text: label,
            fontSize: 12,
            fill: '#000',
            fontFamily:
              'Avenir,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
            full: e,
            fontWeight: 100,
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
        label.attr('fontWeight', 500);
      } else {
        //label.attr('fill', '#A3B1BF');
        //label.attr('fill', 'red');
        label.attr('fontWeight', 100);
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
          stroke: '#5B8FF9',
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
    if (name === 'highlight') {
      if (value) {
        //shape.attr('opacity', 0.2);

        shape.attr('stroke', 'red');
        shape.attr('lineWidth', 3);
      } else {
        //shape.attr('opacity', 1);

        shape.attr('stroke', '#5B8FF9');
        shape.attr('lineWidth', 1);
      }
    }
  },
});
