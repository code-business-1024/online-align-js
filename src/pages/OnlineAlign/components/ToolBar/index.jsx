import { Button, Divider } from 'antd';
import { useSentences } from '../../sentence-hooks';
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  VerticalAlignMiddleOutlined,
  ColumnHeightOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  RetweetOutlined,
  PlusOutlined,
  CloseOutlined,
  SearchOutlined,
  UploadOutlined,
  CloudSyncOutlined,
  DownloadOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import './index.less';

const ToolBar = () => {
  const {
    deleteSentenceByKeyAndMark,
    insertSentenceByKey,
    clearOpObj,
    splitSentence,
    mergeSentences,
    moveSentence,
    exchangeSentences,
    stackIndex,
    readStack,
    clearStack,
    doExportTmx,
  } = useSentences();
  return (
    <div className="root-container">
      <Button
        className="toolbar-button"
        type="primary"
        icon={<DownloadOutlined />}
        onClick={() => {
          doExportTmx();
        }}
      >
        导出
      </Button>
      <Button
        className="toolbar-button"
        type="text"
        icon={<StepBackwardOutlined />}
        onClick={() => {
          readStack(stackIndex - 1);
        }}
      >
        回退
      </Button>
      <Button
        className="toolbar-button"
        type="text"
        icon={<StepForwardOutlined />}
        onClick={() => {
          readStack(stackIndex + 1);
        }}
      >
        前进
      </Button>
      <Divider type="vertical" />
      <Button
        className="toolbar-button"
        type="text"
        icon={<VerticalAlignMiddleOutlined />}
        onClick={() => {
          mergeSentences();
          clearOpObj();
        }}
      >
        合并
      </Button>
      <Button
        className="toolbar-button"
        type="text"
        icon={<ColumnHeightOutlined />}
        onClick={() => {
          splitSentence();
          clearOpObj();
        }}
      >
        拆分
      </Button>
      <Button
        className="toolbar-button"
        type="text"
        icon={<VerticalAlignTopOutlined />}
        onClick={() => {
          moveSentence('up');
          clearOpObj();
        }}
      >
        上移
      </Button>
      <Button
        className="toolbar-button"
        type="text"
        icon={<VerticalAlignBottomOutlined />}
        onClick={() => {
          moveSentence('down');
          clearOpObj();
        }}
      >
        下移
      </Button>
      <Button
        className="toolbar-button"
        type="text"
        icon={<RetweetOutlined />}
        onClick={() => {
          exchangeSentences();
          clearOpObj();
        }}
      >
        调换
      </Button>
      <Divider type="vertical" />
      <Button
        className="toolbar-button"
        type="text"
        icon={<PlusOutlined />}
        onClick={() => {
          insertSentenceByKey('up');
          clearOpObj();
        }}
      >
        上方插入
      </Button>
      <Button
        className="toolbar-button"
        type="text"
        icon={<PlusOutlined />}
        onClick={() => {
          insertSentenceByKey('down');
          clearOpObj();
        }}
      >
        下方插入
      </Button>
      <Divider type="vertical" />
      {/* <Button className="toolbar-button" type="text" icon={<SearchOutlined />}>
        查找与替换
      </Button>
      <Button className="toolbar-button" type="text" icon={<UploadOutlined />}>
        提取术语
      </Button> */}
      <Button
        className="toolbar-button"
        type="primary"
        danger
        icon={<CloseOutlined />}
        onClick={() => {
          deleteSentenceByKeyAndMark();
          clearOpObj();
        }}
      >
        删除
      </Button>
      <Button className="toolbar-button" type="text" icon={<CloudSyncOutlined />}>
        缓存
      </Button>
      <Button
        className="toolbar-button"
        type="primary"
        danger
        icon={<SyncOutlined />}
        onClick={() => {
          clearStack();
          clearOpObj();
        }}
      >
        重置
      </Button>
    </div>
  );
};

export default ToolBar;
