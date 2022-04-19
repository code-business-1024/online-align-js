import React, { useState } from 'react';
import { DragSortTable } from '@ant-design/pro-table';
import { MenuOutlined } from '@ant-design/icons';
import { message } from 'antd';
// import value1Data from './value1Data.json';
// import value2Data from './value2Data.json';

import './index.less';

const defaultObjArray = [];

const data = [
  {
    key: 'key1',
    value: 'John Brown',
    index: 0,
  },
  {
    key: 'key2',
    value: 'Jim Green',
    index: 1,
  },
  {
    key: 'key3',
    value: 'Joe Black',
    index: 2,
  },
];

const ObjArray = () => {
  const [objArray, setObjArray] = useState(defaultObjArray);

  const columns2 = [
    {
      title: '排序',
      dataIndex: 'key',
    },
    {
      title: '姓名',
      dataIndex: 'value',
    },
  ];

  const [dataSource2, setDatasource2] = useState(data);

  const handleDragSortEnd2 = (newDataSource) => {
    console.log('排序后的数据', newDataSource);
    setDatasource2(newDataSource);
    message.success('修改列表排序成功');
  };

  const dragHandleRender = (rowData, idx) => (
    <>
      <MenuOutlined style={{ cursor: 'grab', color: 'gold' }} />
      &nbsp;{idx + 1} - {rowData.name}
    </>
  );

  return (
    <>
      <div className="table-container">
        <DragSortTable
          headerTitle="拖拽排序(自定义把手)"
          columns={columns2}
          rowKey="index"
          search={false}
          pagination={false}
          dataSource={dataSource2}
          dragSortKey="key"
          dragSortHandlerRender={dragHandleRender}
          onDragSortEnd={handleDragSortEnd2}
        />
        <DragSortTable
          headerTitle="拖拽排序(自定义把手)"
          columns={columns2}
          rowKey="index"
          search={false}
          pagination={false}
          dataSource={dataSource2}
          dragSortKey="sort"
          dragSortHandlerRender={dragHandleRender}
          onDragSortEnd={handleDragSortEnd2}
        />
      </div>
    </>
  );
};

export default ObjArray;
