import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultSentenceData from './sentence-data.json';
import {
  formatResponseObjArray,
  mergeObjArray,
  rebuildObjArrayKeyByIndex,
} from '../OnlineAlign/sentence-util';
import useListenerKey from './custom-hooks';
import { notification } from 'antd';

const defaultFilesData = [
  {
    language: 'auto',
    type: 'src',
    fileName: '',
  },
  {
    language: 'auto',
    type: 'tgt',
    fileName: '',
  },
];

// 创建 SentenceContext 上下文
const SentenceContext = createContext([]);

export const useSentences = () => useContext(SentenceContext);

export const SentenceProvider = ({ children }) => {
  // 当前操作标识 value1 value2
  const [opMark, setOpMark] = useState('value1');
  // 当用户按住shift可以在以下变量中存放多个数据
  const [opRecords, setOpRecords] = useState([]);

  const [sentences, setSentences] = useState([]);

  const [files, setFiles] = useState(defaultFilesData);

  const [checkboxMark, setCheckboxMark] = useState(true);

  const [focusElementId, setFocusElementId] = useState();

  const [dataStack, setDataStack] = useState([]);

  // 还需要维护这个值的变化
  const [stackIndex, setStackIndex] = useState(0);

  const updataFiles = (data) => {
    setFiles(data);
  };

  // 写入缓存
  const pushStack = (data) => {
    console.table(data);
    let currentStack = JSON.parse(localStorage.getItem('sentenceDataStack')) || [];
    console.log('🚀 ~ file: sentence-hooks.js ~ line 36 ~ pushStack ~ currentStack', currentStack);
    currentStack.push(data);
    console.log(currentStack);
    localStorage.setItem('sentenceDataStack', JSON.stringify(currentStack));
  };

  // 读取缓存
  const readStack = (index) => {
    let currentStack = JSON.parse(localStorage.getItem('sentenceDataStack')) || [];
    console.log('🚀 ~ file: sentence-hooks.js ~ line 44 ~ readStack ~ index', index);
    if (index < 0) {
      notification.warning({
        message: '回退失败!',
        description: '当前版本缓存记录已是最早的记录!',
        duration: 2,
      });
      return;
    }
    if (index > currentStack.length - 1) {
      notification.warning({
        message: '前进失败!',
        description: '当前版本缓存记录已是最新的记录!',
        duration: 2,
      });
      return;
    }
    // console.log('🚀 ~ file: sentence-hooks.js ~ line 45 ~ readStack ~ currentStack', currentStack);
    let currentSentences = currentStack[index != undefined ? index : currentStack.length - 1];
    setStackIndex(index != undefined ? index : currentStack.length - 1);
    // console.table(currentSentences);
    setSentences(currentSentences);
  };

  // 清除缓存
  const clearStack = () => {
    setSentences([]);
    localStorage.removeItem('sentenceDataStack');
  };

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
    // console.log(`最终合并Sentence数据 ${JSON.stringify(finalData)}`);
    setSentences(finalData);
    pushStack(finalData);
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
    pushStack(finalData);
  };

  // 上移 下移
  const moveSentence = (type) => {
    let opPartData = [];
    if (opRecords.length != 1) {
      notification.warning({
        message: '操作非法!',
        description: '有且仅能够选中一项进行操作!',
        duration: 2,
      });
      return;
    }
    let tempObj = {};
    let moveObj = {
      key: type === 'up' ? opRecords[0].key - 1 : opRecords[0].key + 1,
      value: opRecords[0][opMark],
    };
    sentences.map((item) => {
      tempObj = {
        key: item.key,
        value: item[opMark],
      };
      if (item.key === opRecords[0].key) {
      } else if (item.key === moveObj.key) {
        if (type === 'up') {
          opPartData.push(moveObj);
          opPartData.push(tempObj);
        } else {
          opPartData.push(tempObj);
          opPartData.push(moveObj);
        }
      } else {
        opPartData.push(tempObj);
      }
    });
    opPartData = rebuildObjArrayKeyByIndex(opPartData);
    console.table(opPartData);
    setPartValue(opMark, opPartData);
  };

  /**
   * 在上方插入 在下方插入
   * @param {*} type up & down
   * @param {*} key  number
   * @param {*} mark value1 & value2
   */
  const insertSentenceByKey = (type) => {
    let opPartData = [];
    console.log('🚀 ~ 插入前参数预览 => 当前活动列 opRecords:', opRecords);
    if (opRecords.length != 1) {
      notification.warning({
        message: '操作非法!',
        description: '有且仅能够选中一项进行操作!',
        duration: 2,
      });
      return;
    }
    let key = opRecords[0].key;
    // 处理插入逻辑
    sentences.map((item) => {
      let tempObj = {
        key: item.key,
        value: item[opMark],
      };
      let addObj = {
        key: type === 'up' ? key - 1 : key + 1,
        value: '',
      };
      if (type === 'up' && item.key === key) {
        opPartData.push(addObj);
        opPartData.push(tempObj);
      } else if (type === 'down' && item.key === key) {
        opPartData.push(tempObj);
        opPartData.push(addObj);
      } else {
        opPartData.push(tempObj);
      }
    });
    opPartData = rebuildObjArrayKeyByIndex(opPartData);
    console.table(opPartData);
    console.log('🚀 ~ file: sentence-hooks.js ~ line 147 ~ insertSentenceByKey ~ opMark', opMark);
    setPartValue(opMark, opPartData);
  };

  // 删除
  const deleteSentenceByKeyAndMark = () => {
    console.log('🚀 ~ 删除前参数预览 => 当前活动列 opRecords:', opRecords);
    console.table(opRecords);
    if (opRecords.length == 0) {
      notification.warning({
        message: '操作非法!',
        description: '请保证至少选中一项进行操作!',
        duration: 2,
      });
      return;
    }
    let maxKey = Math.max(...Object.keys(opRecords)) + 1;
    let opPartData = [];
    sentences.map((item) => {
      let tempOpRecord = opRecords.filter((opItem) => opItem.key === item.key)[0] || {};
      if (JSON.stringify(tempOpRecord) === '{}') {
        let tempObj = {};
        tempObj['key'] = item.key;
        tempObj['value'] = item[opMark];
        opPartData.push(tempObj);
      }
    });
    opPartData = rebuildObjArrayKeyByIndex(opPartData);
    console.log('🚀 ~ 删除前参数预览 => 删除后的部分结果列 opPartData:', opPartData);
    console.table(opPartData);
    setPartValue(opMark, opPartData);
  };

  // 拆分
  const splitSentence = () => {
    let opPartData = [];
    console.log(focusElementId);
    if (!focusElementId) {
      notification.warning({
        message: '操作非法!',
        description: '当前未检测到光标所聚焦元素!',
        duration: 2,
      });
      return;
    }
    let dom = document.getElementById(focusElementId);
    setTimeout(() => {
      console.log(dom.selectionStart, dom.selectionEnd);
    }, 0);
    let opContent = opRecords[0][opMark] + '';
    let key = opRecords[0].key;
    let splitObj1 = {
      key: key,
      value: opContent.substring(0, dom.selectionStart),
    };
    let splitObj2 = {
      key: key + 1,
      value: opContent.substring(dom.selectionStart),
    };
    sentences.map((item) => {
      if (item.key === key) {
        opPartData.push(splitObj1);
        opPartData.push(splitObj2);
      } else {
        let tempObj = {
          key: item.key,
          value: item[opMark],
        };
        opPartData.push(tempObj);
      }
    });
    opPartData = rebuildObjArrayKeyByIndex(opPartData);
    setPartValue(opMark, opPartData);
  };

  // 合并
  const mergeSentences = () => {
    console.table(opRecords);
    if (opRecords.length < 2) {
      notification.warning({
        message: '操作非法!',
        description: '请保证至少选中两项进行操作!',
        duration: 2,
      });
      return;
    }
    let opPartData = [];
    let mergeContent = '';
    opRecords.map((item) => {
      mergeContent = mergeContent + item[opMark];
      console.log(mergeContent);
    });
    let mergeObj = {
      key: Math.min(...Object.keys(opRecords)) + 1,
      value: mergeContent,
    };
    console.table(mergeObj);
    sentences.map((item) => {
      let tempOpRecord = opRecords.filter((opItem) => opItem.key === item.key)[0] || {};
      console.log(
        '🚀 ~ file: sentence-hooks.js ~ line 245 ~ opRecords.map ~ tempOpRecord',
        tempOpRecord,
      );

      if (JSON.stringify(tempOpRecord) === '{}') {
        let tempObj = {};
        tempObj['key'] = item.key;
        tempObj['value'] = item[opMark];
        opPartData.push(tempObj);
      } else if (item.key === mergeObj.key) {
        opPartData.push(mergeObj);
      }
    });
    opPartData = rebuildObjArrayKeyByIndex(opPartData);
    console.table(opPartData);
    setPartValue(opMark, opPartData);
  };

  // 调换
  const exchangeSentences = () => {
    let opPartData = [];
    if (opRecords.length != 2) {
      notification.warning({
        message: '操作非法!',
        description: '有且仅能够选中两项进行操作!',
        duration: 2,
      });
      return;
    }
    console.table(opRecords);
    let tempObj = {};
    sentences.map((item) => {
      if (item.key === opRecords[0].key) {
        tempObj = {
          key: opRecords[1].key,
          value: opRecords[1][opMark],
        };
        console.log('🚀 ~ file: sentence-hooks.js ~ line 378 ~ sentences.map ~ tempObj', tempObj);
        opPartData.push(tempObj);
      } else if (item.key === opRecords[1].key) {
        tempObj = {
          key: opRecords[0].key,
          value: opRecords[0][opMark],
        };
        console.log('🚀 ~ file: sentence-hooks.js ~ line 385 ~ sentences.map ~ tempObj', tempObj);
        opPartData.push(tempObj);
      } else {
        tempObj = {
          key: item.key,
          value: item[opMark],
        };
        opPartData.push(tempObj);
      }
    });
    opPartData = rebuildObjArrayKeyByIndex(opPartData);
    console.table(opPartData);
    setPartValue(opMark, opPartData);
  };

  return (
    <SentenceContext.Provider
      value={{
        opRecords,
        sentences,
        opMark,
        checkboxMark,
        focusElementId,
        stackIndex,
        dataStack,
        files,
        updataFiles,
        setDataStack,
        exchangeSentences,
        setStackIndex,
        pushStack,
        readStack,
        clearStack,
        moveSentence,
        mergeSentences,
        splitSentence,
        setFocusElementId,
        setCheckboxMark,
        clearOpObj,
        setOpObj,
        setOpMark,
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
