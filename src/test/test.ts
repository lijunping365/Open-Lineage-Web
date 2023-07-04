import {
  itemHeight,
  nodeWidth,
} from '../components/LineageGraph/registerShape';

export const initData = (count: number) => {
  const nodeArray = [];
  for (let i = 1; i < count; i++) {
    const obj: any = { id: '' + i, label: 'Employee' + i, attrs: [] };
    obj.key = 'Record' + i;
    obj.x = 100;
    obj.y = 100;
    obj.level = i;
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
    const height = itemHeight * (obj.attrs.length + 1);
    obj.size = [nodeWidth, height];
    nodeArray.push(obj);
  }
  return nodeArray;
};

export const dataTransform = (data: any) => {
  const nodes: any[] = [];
  const edges: any[] = [];
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
