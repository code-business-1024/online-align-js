import { request } from 'umi';

// 获取字典列表
export async function getDictList(body) {
  return request('/api/dict/list', {
    method: 'POST',
    data: body,
  });
}
