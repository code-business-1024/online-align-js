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
} from '@ant-design/icons';

import './index.less';

const ToolBar = () => {
  const { deleteSentenceByKeyAndMark, insertSentenceByKey, clearOpObj } = useSentences();

  return (
    <div className="root-container">
      <Button type="text" icon={<StepBackwardOutlined />}>
        回退
      </Button>
      <Button type="text" icon={<StepForwardOutlined />}>
        前进
      </Button>
      <Divider type="vertical" />
      <Button
        type="text"
        icon={<VerticalAlignMiddleOutlined />}
        onClick={() => {
          console.log('合并');
        }}
      >
        合并
      </Button>
      <Button
        type="text"
        icon={<ColumnHeightOutlined />}
        onClick={() => {
          console.log('拆分');
        }}
      >
        拆分
      </Button>
      <Button
        type="text"
        icon={<VerticalAlignTopOutlined />}
        onClick={() => {
          console.log('上移');
        }}
      >
        上移
      </Button>
      <Button
        type="text"
        icon={<VerticalAlignBottomOutlined />}
        onClick={() => {
          console.log('下移');
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
