import { useEffect, useState } from 'react';
import { useSentences } from '../../sentence-hooks';
import { Input } from 'antd';
import './index.less';

const SentenceInput = ({ record, mark }) => {
  const [value, setValue] = useState('');
  const [lineRecord, setLineRecord] = useState(record);
  const [currentMark, setCurrentMark] = useState(mark);
  const [borderedMark, setBorderedMark] = useState(false);
  const { setSentenceValue, setFocusElementId, setOpObj, clearOpObj } = useSentences();

  const getPositionForTextArea = (e) => {
    console.log(e);
    var eleP = e.target.parentNode; //获取父级元素
    var pos = 0;
    if (e.target.nodeName == 'TEXTAREA') {
      pos = getPosition(e.target);
    }
  };

  // 输入框获取光标
  const getPosition = (element) => {
    let cursorPos = 0;
    cursorPos = element.selectionStart;
    // console.log('🚀 ~ file: index.jsx ~ line 28 ~ getPosition ~ cursorPos', cursorPos);
    return cursorPos;
  };

  useEffect(() => {
    const { key, value1, value2 } = record || {};
    setValue(mark === 'value1' ? value1 : value2);
    setLineRecord(record);
  }, [record, mark]);

  return (
    <>
      <Input.TextArea
        // disabled={lineRecord[currentMark] === '' ? true : false}
        className="custom-input"
        id={'textarea-' + currentMark + '-' + lineRecord.key}
        value={value}
        autoSize={{ minRows: 1, maxRows: 10 }}
        bordered={borderedMark}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          setBorderedMark(false);
          e.target.value != lineRecord[currentMark] &&
            setSentenceValue(currentMark, lineRecord.key, value);
        }}
        onFocus={(e) => {
          let elementId = 'textarea-' + currentMark + '-' + lineRecord.key;
          setFocusElementId(elementId);
          clearOpObj();
          setOpObj(true, currentMark, lineRecord);
          // console.table(e);
          setBorderedMark(true);
          // setOpObj(currentMark, lineRecord);
        }}
      />
    </>
  );
};

export default SentenceInput;
