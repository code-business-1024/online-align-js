import React, { createContext, useContext, useState } from 'react';
import defaultSentenceData from './sentence-data.json';
import { formatResponseObjArray, mergeObjArray } from '../OnlineAlign/sentence-util';

// 创建 SentenceContext 上下文
const SentenceContext = createContext([]);

export const useSentences = () => useContext(SentenceContext);

export const SentenceProvider = ({ children }) => {
  const [sentences, setSentences] = useState(defaultSentenceData);

  // 设置一部分值
  const setPartValue = (mark, data) => {
    let finalData = [];
    let formatData = formatResponseObjArray(mark, data);
    console.log(`格式化Response数据 ${JSON.stringify(formatData)}`);
    switch (mark) {
      case 'value1':
        finalData = mergeObjArray(data, sentences);
        break;
      case 'value2':
        finalData = mergeObjArray(sentences, data);
        break;
      default:
        break;
    }
    console.log(`最终合并Sentence数据 ${JSON.stringify(finalData)}`);
    setSentences(finalData);
  };

  // 设置Input值
  const setSentenceValue = (mark, key, value) => {
    let finalData = [];
    console.log(`输入框mark: ${mark} key: ${key} Input数据: ${JSON.stringify(value)}`);
    sentences.map((item) => {
      let tempObj = item;
      if (item.key === key) {
        tempObj[mark] = value;
      }
      console.log(tempObj);
      finalData.push(tempObj);
    });
    console.log(finalData);
    setSentences(finalData);
  };

  return (
    <SentenceContext.Provider value={{ sentences, setPartValue, setSentenceValue }}>
      {children}
    </SentenceContext.Provider>
  );
};
