import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useSentences } from '../../sentence-hooks';
import { useInput } from '../../custom-hooks';
import ProTable from '@ant-design/pro-table';
import { Input } from 'antd';
import ToolBar from '../ToolBar/index';
import FileUpload from '../FileUpload/index';
import './index.less';
import { formatResponseObjArray, mergeObjArray } from '../../sentence-util';
import defaultSentencesData from '../../sentence-data.json';
import Item from 'antd/lib/list/Item';

const AlignTable = () => {
  const { currentInputValue, setCurrentInputValue } = useState('');
  const { value, setValue } = useState('');

  const { sentences, setPartValue, setSentenceValue } = useSentences();

  useEffect(() => {
    console.log('useE');
  }, [, currentInputValue]);

  return (
    <>
      {/* <h1>在线对齐</h1> */}
      <ProTable
        columns={[
          {
            title: 'No.*',
            width: '2%',
            dataIndex: 'key',
            render: (_) => <a>{_}</a>,
          },
          {
            title: '内容1',
            width: '43%',
            dataIndex: 'value1',
            render: (_, record, index, action) => (
              <Input.TextArea
                value={currentInputValue ? currentInputValue : record.value1}
                autoSize={{ minRows: 1 }}
                bordered={true}
                onFocus={(e) => {
                  console.log(_, record, index, action);
                  console.log(record.value1);
                  // setCurrentInputValue(record.value1);
                  console.log(currentInputValue);
                }}
                onChange={(e) => {
                  console.log(e);
                  setCurrentInputValue(e.target.value);
                }}
                onBlur={(e) => setSentenceValue('value1', e.target.value)}
              />
            ),
          },
          {
            title: '内容2',
            width: '49%',
            dataIndex: 'value2',
            render: (_, record) => (
              <Input.TextArea value={record.value2} autoSize={{ minRows: 1 }} bordered={true} />
            ),
          },
        ]}
        dataSource={sentences}
        rowKey="key"
        search={false}
        dateFormatter="string"
        toolBarRender={(rowKey) => [
          <div className="upload-group" key="1">
            <FileUpload
              className="left-upload"
              key="value1"
              doUploadSuccess={(data) => {
                setPartValue('value1', data);
              }}
            />
            <FileUpload
              className="right-upload"
              key="value2"
              doUploadSuccess={(data) => {
                setPartValue('value2', data);
              }}
            />
          </div>,
        ]}
      />
    </>
  );
};

export default AlignTable;
