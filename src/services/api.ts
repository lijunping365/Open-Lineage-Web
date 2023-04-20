import request from '../utils/request';

export async function getLineageData(dbType: string, querySql: string) {
  return request('/sql/getLineageData', {
    method: 'POST',
    data: { dbType, querySql },
  });
}
