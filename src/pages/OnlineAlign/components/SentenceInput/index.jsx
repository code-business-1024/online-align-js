import { useEffect, useState } from 'react';
import { useSentences } from '../../sentence-hooks';
import { Input } from 'antd';
import './index.less';

const SentenceInput = ({ record, mark }) => {
  const [value, setValue] = useState('');
  const [lineRecord, setLineRecord] = useState(record);
  const [currentMark, setCurrentMark] = useState(mark);
  const [borderedMark, setBorderedMark] = useState(false);
  const { setSentenceValue, setOpKeys, setOpSentences, setOpMark, deleteSentenecByKeyAndMark } =
    useSentences();

  useEffect(() => {
    const { key, value1, value2 } = record || {};
    setValue(mark === 'value1' ? value1 : value2);
    setLineRecord(record);
  }, [record, mark]);

  return (
    <>
      <Input.TextArea
        className="custom-input"
        value={value}
        autoSize={{ minRows: 1 }}
        bordered={borderedMark}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          // setBorderedMark(false);
          setSentenceValue(currentMark, lineRecord.key, value);
        }}
        onFocus={(e) => {
          console.log(`聚焦元素 => key: ${lineRecord.key} mark: ${currentMark} value: ${value}`);
          setBorderedMark(true);
          let opKeys = [];
          opKeys.push(lineRecord.key);
          setOpKeys(opKeys);
          let opSentences = [];
          opSentences.push(value);
          setOpSentences(opSentences);
          setOpMark(currentMark);
        }}
        onKeyDown={(e) => console.log(e)}
      />
    </>
  );
};

export default SentenceInput;
