import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultSentenceData from './sentence-data.json';
import {
  formatResponseObjArray,
  mergeObjArray,
  rebuildObjArrayKeyByIndex,
} from '../OnlineAlign/sentence-util';
import useListenerKey from './custom-hooks';

// 创建 SentenceContext 上下文
const SentenceContext = createContext([]);

export const useSentences = () => useContext(SentenceContext);

export const SentenceProvider = ({ children }) => {
  // 当前操作标识 value1 value2
  const [opMark, setOpMark] = useState('value1');
  // 当用户按住shift可以在以下变量中存放多个数据
  const [opKeys, setOpKeys] = useState([]);
  const [opSententces, setOpSentences] = useState([]);

  const [opRecords, setOpRecords] = useState([]);

  const [sentences, setSentences] = useState(defaultSentenceData);

  const [checkboxMark, setCheckboxMark] = useState(true);

  /**
   * 设置当前操作标识参数
   * @param {*} mark
   * @param {*} key
   * @param {*} sentence
   */
  const setOpObj = (flag, mark, record) => {
    console.log('🚀 ~ setOpObj ~~ flag:', flag, 'mark:', mark);
    console.table(record);
    let finalOpRecord = [];
    if (mark) {
      setOpMark(mark);
      console.log('🚀 ~ setOpObj ~~ mark:', mark, ' => opMark:', opMark);
    }
    if (flag) {
      // 新增
      finalOpRecord = opRecords;
      finalOpRecord.push(record);
    } else {
      // 减少
      finalOpRecord = opRecords.filter((item) => item.key != record.key);
    }
    setOpRecords(finalOpRecord);
    console.log('🚀 ~ setOpRecords ~~ finalOpRecord:', finalOpRecord, '=> opRecords:', opRecords);
    console.table(finalOpRecord);
  };

  /**
   * 清空当前操作标识列表
   * 清空选中项
   */
  const clearOpObj = () => {
    setOpRecords([]);
    setCheckboxMark(false);
    console.log(
      '🚀 ~ file: sentence-hooks.js ~ line 63 ~ clearOpObj ~ setCheckboxMark',
      checkboxMark,
    );
  };

  /**
   * 文件上传设置部分 table values 值
   * @param {*} mark 字段标记
   * @param {*} data 文本解析数据 {key, value}
   */
  const setPartValue = (mark, data) => {
    let finalData = [];
    let formatData = formatResponseObjArray(mark, data);
    // console.log(`格式化Response数据 ${JSON.stringify(formatData)}`);
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
    // console.log(`最终合并Sentence数据 ${JSON.stringify(finalData)}`);
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
    // console.table(mark, key, value);
    sentences.map((item) => {
      let tempObj = item;
      if (item.key === key) {
        tempObj[mark] = value;
      }
      // console.log(tempObj);
      finalData.push(tempObj);
    });
    setSentences(finalData);
    console.table(sentences);
  };

  // 在上方插入 在下方插入
  const insertSentenceByKey = (key, mark) => {};

  // 删除
  const deleteSentenceByKeyAndMark = () => {
    console.log('🚀 ~ 删除前参数预览 => 当前活动列 opRecords:', opRecords);
    console.table(opRecords);
    let maxKey = Math.max(...Object.keys(opRecords)) + 1;
    let opPartData = [];
    sentences.map((item) => {
      let tempOpRecord = opRecords.filter((opItem) => opItem.key === item.key)[0] || {};
      console.log(
        '🚀 ~ file: sentence-hooks.js ~ line 105 ~ sentences.map ~ tempOpRecord',
        tempOpRecord,
      );
      if (JSON.stringify(tempOpRecord) === '{}') {
        let tempObj = {};
        tempObj['key'] = item.key;
        tempObj['value'] = item[opMark];
        console.log('🚀 ~ file: sentence-hooks.js ~ line 111 ~ sentences.map ~ tempObj', tempObj);
        opPartData.push(tempObj);
      }
    });
    opPartData = rebuildObjArrayKeyByIndex(opPartData);
    console.log('🚀 ~ 删除前参数预览 => 删除后的部分结果列 opPartData:', opPartData);
    console.table(opPartData);
    setPartValue(opMark, opPartData);
  };

  return (
    <SentenceContext.Provider
      value={{
        opRecords,
        sentences,
        opKeys,
        opMark,
        opSententces,
        checkboxMark,
        setCheckboxMark,
        clearOpObj,
        setOpObj,
        setOpKeys,
        setOpMark,
        setOpSentences,
        setPartValue,
        setSentenceValue,
        deleteSentenceByKeyAndMark,
        insertSentenceByKey,
      }}
    >
      {children}
    </SentenceContext.Provider>
  );
};
