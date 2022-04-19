import React, { createContext, useContext, useState } from 'react';
import defaultSentenceData from './sentence-data.json';

// 创建 SentenceContext 上下文
const SentenceContext = createContext([]);

export const useSentence = () => useContext(SentenceContext);

const SentenceProvider = ({ children }) => {
  const [sentence, setSentence] = useState(defaultSentenceData);

  // 设置一部分值
  const setPartValue = (mark, data) => {
    switch (mark) {
      case 'value1':
        break;
      case 'value2':
        break;
      default:
        break;
    }
  };
};
