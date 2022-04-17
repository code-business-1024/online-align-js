import { Button, Divider } from 'antd';
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

function ToolBar() {
  return (
    <div className="root-container">
      <Button type="text" icon={<StepBackwardOutlined />}>
        回退
      </Button>
      <Button type="text" icon={<StepForwardOutlined />}>
        前进
      </Button>
      <Divider type="vertical" />
      <Button type="text" icon={<VerticalAlignMiddleOutlined />}>
        合并
      </Button>
      <Button type="text" icon={<ColumnHeightOutlined />}>
        拆分
      </Button>
      <Button type="text" icon={<VerticalAlignTopOutlined />}>
        上移
      </Button>
      <Button type="text" icon={<VerticalAlignBottomOutlined />}>
        下移
      </Button>
      <Button type="text" icon={<RetweetOutlined />}>
        调换
      </Button>
      <Divider type="vertical" />
      <Button type="text" icon={<CloseOutlined />}>
        删除
      </Button>
      <Button type="text" icon={<PlusOutlined />}>
        插入
      </Button>
      <Divider type="vertical" />
      <Button type="text" icon={<SearchOutlined />}>
        查找与替换
      </Button>
      <Button type="text" icon={<UploadOutlined />}>
        提取术语
      </Button>
    </div>
  );
}

export default ToolBar;
