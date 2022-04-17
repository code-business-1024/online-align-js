import React from 'react';
import ToolBar from './components/ToolBar/index';
import AlignTable from './components/AlignTable';

import './index.less';

const OnlineAlign = () => {
  return (
    <>
      {/* <h1>在线对齐</h1> */}
      <ToolBar />
      <div className="table-container">
        <AlignTable />
        {/* <AlignTable id="right-at" /> */}
      </div>
    </>
  );
};

export default OnlineAlign;
