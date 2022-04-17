import { request } from 'umi';

// 上传文件解析句子
export async function uploadAndParser(file, language) {
  const formdata = new FormData();
  formdata.append('file', file);
  formdata.append('language', language);
  return request('/api/web/file/uploadAndParser', {
    method: 'POST',
    data: formdata,
  });
}
