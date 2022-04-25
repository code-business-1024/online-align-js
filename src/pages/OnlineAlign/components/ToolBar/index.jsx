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
    stackIndex,
    readStack,
  } = useSentences();
  return (
    <div className="root-container">
      <Button
        type="text"
        icon={<StepBackwardOutlined />}
        onClick={() => {
          readStack(stackIndex - 1);
        }}
      >
        回退
      </Button>
      <Button
        type="text"
        icon={<StepForwardOutlined />}
        onClick={() => {
          readStack(stackIndex + 1);
        }}
      >
        前进
      </Button>
      <Button type="text" icon={<SyncOutlined />}>
        缓存
      </Button>
      <Divider type="vertical" />
      <Button
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
        type="text"
        icon={<RetweetOutlined />}
        onClick={() => {
          console.log('调换');
        }}
      >
        调换
      </Button>
      <Divider type="vertical" />
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={() => {
          deleteSentenceByKeyAndMark();
          clearOpObj();
        }}
      >
        删除
      </Button>
      <Button
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
      {/* <Button type="text" icon={<SearchOutlined />}>
        查找与替换
      </Button>
      <Button type="text" icon={<UploadOutlined />}>
        提取术语
      </Button> */}
    </div>
  );
};

export default ToolBar;
