import {
  itemHeight,
  nodeWidth,
} from '../components/LineageGraph/registerShape';

export const initData = (count: number) => {
  const nodeArray = [];
  let level = count;
  for (let i = 1; i <= count; i++) {
    level = level - 1;
    const obj: any = { id: '' + i, label: 'Employee' + i, attrs: [] };
    obj.key = 'Record' + i;
    obj.x = 100;
    obj.y = 100;
    obj.level = level;
    obj.attrs = [
      {
        nodeId: '' + i,
        key: 'id',
        type: 'number(6)',
        relation:
          i !== count
            ? [
                {
                  key: 'key',
                  nodeId: '' + (i + 1),
                },
                {
                  key: 'gender',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'key',
        type: 'varchar(255)',
        relation:
          i !== count
            ? [
                {
                  key: 'id',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'gender',
        type: 'enum(M, F)',
        relation:
          i !== count
            ? [
                {
                  key: 'id',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'birthday',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'birthday',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'hometown',
        type: 'varchar(255)',
        relation:
          i !== count
            ? [
                {
                  key: 'hometown',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'country',
        type: 'varchar(255)',
        relation:
          i !== count
            ? [
                {
                  key: 'country',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'nation',
        type: 'varchar(255)',
        relation:
          i !== count
            ? [
                {
                  key: 'nation',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'jobId',
        type: 'number(3)',
        relation:
          i !== count
            ? [
                {
                  key: 'jobId',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'phone',
        type: 'varchar(255)',
        relation:
          i !== count
            ? [
                {
                  key: 'phone',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'deptId',
        type: 'number(6)',
        relation:
          i !== count
            ? [
                {
                  key: 'deptId',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'startTime',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'startTime',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
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
