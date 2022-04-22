import React, { createContext, useContext, useState } from 'react';
import defaultSentenceData from './sentence-data.json';
import { formatResponseObjArray, mergeObjArray } from '../OnlineAlign/sentence-util';

// 创建 SentenceContext 上下文
const SentenceContext = createContext([]);

export const useSentences = () => useContext(SentenceContext);

export const SentenceProvider = ({ children }) => {
  const [sentences, setSentences] = useState(defaultSentenceData);
  const [opKeys, setOpKeys] = useState([]);
  const [opMark, setOpMark] = useState();
  const [opSententces, setOpSentences] = useState([]);

  /**
   * 文件上传设置部分 table values 值
   * @param {*} mark 字段标记
   * @param {*} data 文本解析数据 {key, value}
   */
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

  /**
   * 修改 sentence 通过 input 输入框
   * @param {*} mark  字段标志
   * @param {*} key   索引/序号
   * @param {*} value 新值
   */
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

  // 在上方插入 在下方插入

  // 删除
  const deleteSentenecByKeyAndMark = (key, mark) => {
    console.log(`删除sentence => mark: ${mark} key: ${key}`);
    let opPartData = [];
    sentences.map((item) => {
      if (key === item.key) {
      } else {
        let tempObj = {};
        tempObj['key'] = item.key > key ? item.key - 1 : item.key;
        tempObj['value'] = item[mark];
        opPartData.push(tempObj);
      }
    });
    console.log(opPartData);
    setPartValue(mark, opPartData);
  };

  return (
    <SentenceContext.Provider
      value={{
        sentences,
        opKeys,
        opMark,
        opSententces,
        setOpKeys,
        setOpMark,
        setOpSentences,
        setPartValue,
        setSentenceValue,
        deleteSentenecByKeyAndMark,
      }}
    >
      {children}
    </SentenceContext.Provider>
  );
};
