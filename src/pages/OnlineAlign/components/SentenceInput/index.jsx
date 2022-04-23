import { useEffect, useState } from 'react';
import { useSentences } from '../../sentence-hooks';
import { Input } from 'antd';
import './index.less';

const SentenceInput = ({ record, mark }) => {
  const [value, setValue] = useState('');
  const [lineRecord, setLineRecord] = useState(record);
  const [currentMark, setCurrentMark] = useState(mark);
  const [borderedMark, setBorderedMark] = useState(false);
  const { setSentenceValue } = useSentences();

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
          setBorderedMark(true);
          // setOpObj(currentMark, lineRecord);
        }}
      />
    </>
  );
};

export default SentenceInput;
