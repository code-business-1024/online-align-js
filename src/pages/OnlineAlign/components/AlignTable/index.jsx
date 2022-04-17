import React, { useCallback, useEffect, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import FileUpload from '../FileUpload/index';
import './index.less';

const columns = [
  {
    title: '序号',
    width: 50,
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

const defaultSentences = [
  {
    value1: 'An elderly couple raised their 4 children on a frugal basis. ',
    value2: 'An elderly couple raised their 4 children on a frugal basis. ',
    key: 1,
  },
  {
    value1:
      'Time flies, they have been married for 50 years, and the children with excellent income are secretly discussing what kind of golden wedding gift to give their parents.',
    value2:
      'Time flies, they have been married for 50 years, and the children with excellent income are secretly discussing what kind of golden wedding gift to give their parents.',
    key: 2,
  },
];

const AlignTable = () => {
  const [sentences, setSentences] = useState(defaultSentences);

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
                let newData = [];
                let tempObj = {};
                data.map((item) => {
                  tempObj = item;
                  tempObj['value1'] = item['value'];
                  tempObj['value2'] = '';
                  delete tempObj['value'];
                  newData.push(tempObj);
                });
                // console.log(newData);
                setSentences(newData);
              }}
            />
            <FileUpload
              className="right-upload"
              key="2"
              doUploadSuccess={(data) => {
                let oldData = sentences;
                let newData = [];
                let finalData = [];
                let tempObj = {};
                data.map((item) => {
                  tempObj = item;
                  tempObj['value2'] = item['value'];
                  delete tempObj['value'];
                  newData.push(tempObj);
                });
                oldData.forEach((item1) => {
                  newData.forEach(
                    (item2) => item1.key === item2.key && finalData.push({ ...item1, ...item2 }),
                  );
                });
                // console.log(finalData);
                setSentences(finalData);
              }}
            />
          </div>,
        ]}
      />
    </>
  );
};

export default AlignTable;
