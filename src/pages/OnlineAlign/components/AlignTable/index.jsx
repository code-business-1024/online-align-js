import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useSentences } from '../../sentence-hooks';
import { useInput } from '../../custom-hooks';
import ProTable from '@ant-design/pro-table';
import { Input } from 'antd';
import ToolBar from '../ToolBar/index';
import FileUpload from '../FileUpload/index';
import SentenceInput from '../SentenceInput/index';
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
            key: 'key',
            title: 'No.*',
            width: '2%',
            dataIndex: 'key',
            render: (_) => <a>{_}</a>,
          },
          {
            key: 'value1',
            title: '内容1',
            width: '43%',
            dataIndex: 'value1',
            render: (_, record) => <SentenceInput record={record} mark="value1" />,
          },
          {
            key: 'value2',
            title: '内容2',
            width: '43%',
            dataIndex: 'value2',
            render: (_, record) => <SentenceInput record={record} mark="value2" />,
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
