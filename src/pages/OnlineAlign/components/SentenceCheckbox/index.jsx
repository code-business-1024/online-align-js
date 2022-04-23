import { useEffect, useState } from 'react';
import { useSentences } from '../../sentence-hooks';
import { Checkbox } from 'antd';
import './index.less';

const SentenceSheckbox = ({ record, mark }) => {
  const { setOpObj, checkboxMark, setCheckboxMark } = useSentences();
  const [checkState, setCheckState] = useState(false);

  // 处理选中框问题
  useEffect(() => {
    if (checkboxMark === false) {
      setCheckState(false);
    }
  }, [checkboxMark]);

  return (
    <>
      <Checkbox
        checked={checkState && checkboxMark}
        disabled={record[mark] === '' ? true : false}
        onChange={(e) => {
          // 更新当前活动列
          setCheckboxMark(true);
          setCheckState(!checkState);
          setOpObj(e.target.checked, mark, record);
        }}
      />
    </>
  );
};

export default SentenceSheckbox;
