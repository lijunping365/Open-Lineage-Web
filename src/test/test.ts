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
      {
        nodeId: '' + i,
        key: 'leaveTime1',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime1',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime2',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime2',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime3',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime3',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime4',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime4',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime5',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime5',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime6',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime6',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime7',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime7',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime8',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime8',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime9',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime9',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime10',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime10',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime11',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime11',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime12',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime12',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime13',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime13',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime14',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime14',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime15',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime15',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime16',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime16',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime17',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime17',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime18',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime18',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime19',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime19',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime20',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime20',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime21',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime21',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime22',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime22',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime23',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime23',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime24',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime24',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime25',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime25',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime26',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime26',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime27',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime27',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime28',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime28',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime29',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime29',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime30',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime30',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime31',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime31',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime32',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime32',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime33',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime33',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime34',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime34',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime35',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime35',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime36',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime36',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime37',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime37',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime38',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime38',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime39',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime39',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime40',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime40',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime41',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime41',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime42',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime42',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime43',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime43',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime44',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime44',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime45',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime45',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime46',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime46',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime47',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime47',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime48',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime48',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime49',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime49',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime50',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime50',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime51',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime51',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime52',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime52',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime53',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime53',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime54',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime54',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime55',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime55',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime56',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime56',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime57',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime57',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime58',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime58',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime59',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime59',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime60',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime60',
                  nodeId: '' + (i + 1),
                },
              ]
            : [],
      },
      {
        nodeId: '' + i,
        key: 'leaveTime61',
        type: 'date',
        relation:
          i !== count
            ? [
                {
                  key: 'leaveTime61',
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
