import { Select, Input, Button, Upload } from 'antd';
import { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import defaultLangDict from '@/dict/lang-dict.json';
import { getDictList } from '@/services/api/dict';
import './index.less';

const { Option } = Select;

const FileInput = ({ className, doUploadSuccess = (f) => f }) => {
  const [langDictList, setLangDictList] = useState(defaultLangDict);
  const [currentLang, setCurrentLang] = useState('auto');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    (async () => {
      const res = await getDictList({
        dictName: 'UnityLang',
        fields: ['baseLang', 'desc'],
      });
      setLangDictList(res.data);
    })();
  }, []);

  return (
    <>
      <div className={className}>
        <div className="lanSelect-box">
          <span style={{ marginRight: 12 }}>检测语言: </span>
          <div>
            <Select
              defaultValue={currentLang}
              style={{ width: 120 }}
              onChange={(value) => {
                setCurrentLang(value);
              }}
            >
              {langDictList.map((item) => (
                <Option key={item.baseLang} value={item.baseLang}>
                  {item.desc}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="fileUpload-box">
          <div>
            <Input value={fileName} style={{ width: 200 }} placeholder="文件名" />
          </div>
          <div>
            <Upload
              showUploadList={false}
              action="http://127.0.0.1:8080/web/file/uploadAndParser"
              onChange={(file) => {
                console.log(file.file.status);
                if (file.file.status == 'done') {
                  const { data } = file.file.response;
                  doUploadSuccess(data);
                }
              }}
              data={{ language: currentLang }}
              beforeUpload={(file) => {
                setFileName(file.name);
              }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileInput;
