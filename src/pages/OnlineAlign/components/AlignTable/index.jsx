import React, { useCallback, useEffect, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import FileUpload from '../FileUpload/index';
import './index.less';
import { formatResponseObjArray, mergeObjArray } from '../../sentence-util';
import defaultSentencesData from '../../sentence-data.json';

const columns = [
  {
    title: 'No.*',
    width: '4%',
    dataIndex: 'key',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '内容',
    width: '48%',
    dataIndex: 'value1',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '内容',
    width: '48%',
    dataIndex: 'value2',
    render: (_) => <a>{_}</a>,
  },
];

const AlignTable = () => {
  const [sentences, setSentences] = useState([]);

  return (
    <>
      <ProTable
        columns={columns}
        dataSource={sentences}
        rowKey="key"
        search={false}
        dateFormatter="string"
        toolBarRender={(rowKey) => [
          <div className="upload-group" key="1">
            <FileUpload
              className="left-upload"
              key="1"
              doUploadSuccess={(data) => {
                let formatData = formatResponseObjArray('value1', data);
                let arr2 = sentences;
                let finalArray = mergeObjArray(formatData, arr2);
                setSentences(finalArray);
              }}
            />
            <FileUpload
              className="right-upload"
              key="2"
              doUploadSuccess={(data) => {
                let formatData = formatResponseObjArray('value2', data);
                let arr1 = sentences;
                let finalArray = mergeObjArray(arr1, formatData);
                setSentences(finalArray);
              }}
            />
          </div>,
        ]}
      />
    </>
  );
};

export default AlignTable;
