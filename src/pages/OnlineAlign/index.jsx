import React from 'react';
import AlignTable from './components/AlignTable';
import ToolBar from './components/ToolBar/index';
import { SentenceProvider } from './sentence-hooks';

import './index.less';

const OnlineAlign = () => {
  return (
    <>
      <div className="table-container">
        <SentenceProvider>
          <ToolBar />
          <AlignTable />
        </SentenceProvider>
      </div>
    </>
  );
};

export default OnlineAlign;
