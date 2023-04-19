export const initData = (count: number) => {
  const nodeArray = [];
  for (let i = 1; i < count; i++) {
    const obj: any = { id: '' + i, label: 'Employee' + i, attrs: [] };
    obj.key = 'Record' + i;
    obj.x = 100 * i;
    obj.y = 100 * i;
    obj.attrs = [
      {
        nodeId: '' + i,
        key: 'id',
        type: 'number(6)',
        relation: [
          {
            key: 'key',
            nodeId: '' + (i + 1),
          },
          {
            key: 'gender',
            nodeId: '' + (i + 1),
          },
        ],
      },
      {
        nodeId: '' + i,
        key: 'key',
        type: 'varchar(255)',
        relation: [
          {
            key: 'id',
            nodeId: '' + (i + 1),
          },
        ],
      },
      {
        nodeId: '' + i,
        key: 'gender',
        type: 'enum(M, F)',
        relation: [
          {
            key: 'id',
            nodeId: '' + (i + 1),
          },
        ],
      },
      {
        nodeId: '' + i,
        key: 'birthday',
        type: 'date',
        relation: [
          {
            key: 'birthday',
            nodeId: '' + (i + 1),
          },
        ],
      },
      {
        nodeId: '' + i,
        key: 'hometown',
        type: 'varchar(255)',
        relation: [
          {
            key: 'hometown',
            nodeId: '' + (i + 1),
          },
        ],
      },
      {
        nodeId: '' + i,
        key: 'country',
        type: 'varchar(255)',
        relation: [
          {
            key: 'country',
            nodeId: '' + (i + 1),
          },
        ],
      },
      {
        nodeId: '' + i,
        key: 'nation',
        type: 'varchar(255)',
        relation: [
          {
            key: 'nation',
            nodeId: '' + (i + 1),
          },
        ],
      },
      {
        nodeId: '' + i,
        key: 'jobId',
        type: 'number(3)',
        relation: [
          {
            key: 'jobId',
            nodeId: '' + (i + 1),
          },
        ],
      },
      {
        nodeId: '' + i,
        key: 'phone',
        type: 'varchar(255)',
        relation: [
          {
            key: 'phone',
            nodeId: '' + (i + 1),
          },
        ],
      },
      {
        nodeId: '' + i,
        key: 'deptId',
        type: 'number(6)',
        relation: [
          {
            key: 'deptId',
            nodeId: '' + (i + 1),
          },
        ],
      },
      {
        nodeId: '' + i,
        key: 'startTime',
        type: 'date',
        relation: [
          {
            key: 'startTime',
            nodeId: '' + (i + 1),
          },
        ],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime',
        type: 'date',
        relation: [
          {
            key: 'leaveTime',
            nodeId: '' + (i + 1),
          },
        ],
      },
    ];
    nodeArray.push(obj);
  }
  return nodeArray;
};

export const dataTransform = (data: any) => {
  const nodes: any[] = [];
  const edges: any[] = [];
  // TODO:测试node中的定位
  data.map((node: any) => {
    nodes.push({
      ...node,
    });
    if (node.attrs) {
      node.attrs.forEach((attr: any) => {
        if (attr.relation) {
          attr.relation.forEach((relation: any) => {
            edges.push({
              source: node.id,
              target: relation.nodeId,
              sourceAnchor: attr.key,
              targetAnchor: relation.key,
              label: relation.label,
            });
          });
        }
      });
    }
  });

  return {
    nodes,
    edges,
  };
};

// 自定义数据转换
export const transformData = (data: any) => {
  const nodes: any[] = [];
  // 用 map 实现对象去重
  const edgeMap: Map<string, any> = new Map();
  // 用 set 实现表名去重
  const tableFields: Set<any> = new Set();

  data.forEach((item: any) => {
    const targetField = item.targetField;
    const tableField = handleTableField(targetField);
    tableFields.add(tableField);
    if (item.refFields) {
      createEdge(edgeMap, tableFields, tableField, item.refFields);
    }
  });

  createNode(nodes, tableFields);
  const edges = Array.from(edgeMap.values());

  return {
    nodes,
    edges,
  };
};

/**
 * 创建 Edge 即连线即字段之间的连线
 */
const createEdge = (
  edgeMap: Map<string, any>,
  tableFields: Set<any>,
  tableField: string,
  refFields: any[]
) => {
  const target = getTableFieldName(tableField);
  const targetName = target.tableName;
  const targetAnchor = target.tableField;
  refFields.forEach((ref: any) => {
    const tableField = handleTableField(ref);
    tableFields.add(tableField);

    const source = getTableFieldName(tableField);
    const sourceName = source.tableName;
    const sourceAnchor = source.tableField;
    // 不能自连，防止绘制失败
    if (targetName === sourceName) {
      return;
    }

    const edge: any = {};
    edge.source = sourceName;
    edge.sourceAnchor = sourceAnchor;
    edge.target = targetName;
    edge.targetAnchor = targetAnchor;
    edge.label = ref.label;
    let key = sourceName + sourceAnchor + '-' + targetName + targetAnchor;
    edgeMap.set(key, edge);
  });
};

/**
 * 拼接表名+字段，逻辑可参考文档
 */
const handleTableField = (item: any) => {
  const fieldName = item.fieldName;
  let tableField = '';
  if (item.final) {
    tableField = fieldName;
  } else {
    tableField = `${item.level}-${item.index}:${fieldName}`;
  }
  return tableField;
};

/**
 * 拆分字符串获取表名称，字段名称
 */
const getTableFieldName = (item: string) => {
  const names: string[] = item.split(':');
  let tableName = '';
  let tableField = '';
  if (names.length === 1) {
    const array = names[0].split('.');
    tableName = array[1];
    tableField = array[2];
  } else {
    const array = names[1].split('.');
    tableName = array[1] + '_' + names[0];
    tableField = array[2];
  }
  return { tableName, tableField };
};

/**
 * 获取表层级
 */
const getTableLevel = (tableField: string) => {
  let level = 'last';
  const endIndex = tableField.lastIndexOf('-');
  if (endIndex !== -1) {
    const startIndex = tableField.lastIndexOf('_');
    level = tableField.slice(startIndex + 1, endIndex);
  }
  return level;
};

/**
 * 创建 Node 即节点即表
 */
const createNode = (nodes: any[], tableFields: Set<any>) => {
  const tables: Map<string, string[]> = new Map();
  tableFields.forEach((item: any) => {
    const table = getTableFieldName(item);
    const tableName = table.tableName;
    const tableField = table.tableField;

    if (!tables.has(tableName)) {
      tables.set(tableName, [tableField]);
    } else {
      const attrs: any = tables.get(tableName);
      if (!attrs?.includes(tableField)) {
        attrs?.push(tableField);
        tables.set(tableName, attrs);
      }
    }
  });

  tables.forEach((value: string[], key: any, map) => {
    const attrs: any[] = [];
    value.forEach((attr: any) => {
      attrs.push({
        nodeId: key,
        key: attr,
        type: '',
      });
    });

    const level = getTableLevel(key);
    const obj: any = {
      id: key,
      key: key,
      label: key,
      x: 100,
      y: 100,
      level: level,
      attrs: attrs,
    };
    nodes.push(obj);
  });
};

/**
 * 处理表级数据，即当字段级血缘关系为 false 时
 */
export const collapseData = (data: any) => {
  const nodes: any[] = [];
  const edgeMap: Map<string, any> = new Map();
  const tableFields: Set<any> = new Set();

  data.forEach((item: any) => {
    const targetField = item.targetField;
    const tableField = handleTableField(targetField);
    tableFields.add(tableField);

    if (item.refFields) {
      createCollapsedEdge(edgeMap, tableFields, tableField, item.refFields);
    }
  });

  const edges = Array.from(edgeMap.values());
  createCollapsedNode(nodes, tableFields);

  console.log('collapseData', nodes, edges);
  return {
    nodes,
    edges,
  };
};

const createCollapsedEdge = (
  edgeMap: Map<string, any>,
  tableFields: Set<any>,
  tableField: string,
  refFields: any[]
) => {
  const target = getTableFieldName(tableField);
  const targetName = target.tableName;
  refFields.forEach((ref: any) => {
    const tableField = handleTableField(ref);
    tableFields.add(tableField);
    const source = getTableFieldName(tableField);
    const sourceName = source.tableName;
    // 不能自连，防止绘制失败
    if (targetName === sourceName) {
      return;
    }

    const edge: any = {};
    edge.source = sourceName;
    edge.sourceAnchor = sourceName;
    edge.target = targetName;
    edge.targetAnchor = targetName;
    edge.label = ref.label;
    let key = sourceName + '-' + targetName;
    edgeMap.set(key, edge);
  });
};

const createCollapsedNode = (nodes: any[], tableFields: Set<any>) => {
  const tables: Set<string> = new Set();
  tableFields.forEach((item: any) => {
    const table = getTableFieldName(item);
    const tableName = table.tableName;
    tables.add(tableName);
  });

  tables.forEach((key: string, value: any) => {
    const level = getTableLevel(key);
    const obj: any = {
      id: key,
      key: key,
      label: key,
      x: 100,
      y: 100,
      level: level,
      attrs: [],
    };
    nodes.push(obj);
  });
};

/**
 * 获取选中 label 的所有左关联边
 * @param edges node 的所有 edges
 * @param model node 的 model
 * @param sourceAnchor 选中的 label
 * @param leftActiveEdges 左关联边集合
 */
export const getLeftRelation = (
  edges: any[],
  model: any,
  sourceAnchor: any,
  leftActiveEdges: any[]
) => {
  const source = model['id']; // 当前节点
  edges
    .filter((edge: any) => !leftActiveEdges.includes(edge))
    .forEach((edge: any) => {
      if (
        edge.getModel()['target'] === source &&
        edge.getModel()['targetAnchor'] === sourceAnchor
      ) {
        leftActiveEdges.push(edge);

        const currentNode = edge.getSource();
        const currentModel = currentNode.getModel();
        const currentEdges = currentNode.getInEdges();
        const currentSourceAnchor = edge.getModel()['sourceAnchor'];
        getLeftRelation(
          currentEdges,
          currentModel,
          currentSourceAnchor,
          leftActiveEdges
        );
      }
    });
};

/**
 * 获取选中 label 的所有右关联边
 * @param edges node 的所有 edges
 * @param model node 的 model
 * @param sourceAnchor 选中的 label
 * @param rightActiveEdges 右关联边集合
 */
export const getRightRelation = (
  edges: any[],
  model: any,
  sourceAnchor: any,
  rightActiveEdges: any[]
) => {
  const source = model['id']; // 当前节点
  edges
    .filter((edge: any) => !rightActiveEdges.includes(edge))
    .forEach((edge: any) => {
      if (
        edge.getModel()['source'] === source &&
        edge.getModel()['sourceAnchor'] === sourceAnchor
      ) {
        rightActiveEdges.push(edge);

        const currentNode = edge.getTarget();
        const currentModel = currentNode.getModel();
        const currentEdges = currentNode.getOutEdges();
        const currentTargetAnchor = edge.getModel()['targetAnchor'];
        getRightRelation(
          currentEdges,
          currentModel,
          currentTargetAnchor,
          rightActiveEdges
        );
      }
    });
};
