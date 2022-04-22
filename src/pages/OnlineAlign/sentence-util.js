// 格式化 response 对象数据
export const formatResponseObjArray = (value, data) => {
  let formatData = [];
  let tempObj = {};
  data.map((item) => {
    tempObj = item;
    tempObj[value] = item['value'];
    tempObj[value === 'value1' ? 'value2' : 'value1'] = '---';
    delete tempObj['value'];
    formatData.push(tempObj);
  });
  return formatData;
};

// 合并对象数组
export const mergeObjArray = (arr1, arr2) => {
  let finalArray = [];
  if (!arr1 || arr1.length == 0) {
    console.log('Case1:左侧数据为空,单独渲染右侧数据!');
    return (finalArray = arr2);
  }
  if (!arr2 || arr2.length == 0) {
    console.log('Case2:右侧数据为空,单独渲染左侧数据!');
    return (finalArray = arr1);
  }

  if (arr1.length > arr2.length) {
    console.log('Case3:左侧数据大于右侧数据,以左侧数据为主渲染右侧数据');
    finalArray = [];
    arr1.map((item1) => {
      let { key, value2 } = arr2.filter((item2) => item2.key === item1.key)[0] || {};
      if (item1.key === key) {
        finalArray.push({
          key: item1.key,
          value1: item1.value1,
          value2: value2,
        });
      } else {
        finalArray.push({
          key: item1.key,
          value1: item1.value1,
          value2: '---',
        });
      }
    });
  } else {
    console.log('Case4:右侧数据大于左侧数据,以右侧数据为主渲染左侧数据');
    finalArray = [];
    arr2.map((item2) => {
      let { key, value1 } = arr1.filter((item1) => item1.key === item2.key)[0] || {};
      if (item2.key === key) {
        finalArray.push({
          key: item2.key,
          value1: value1,
          value2: item2.value2,
        });
      } else {
        finalArray.push({
          key: item2.key,
          value1: '---',
          value2: item2.value2,
        });
      }
    });
  }
  console.log(finalArray);
  return finalArray;
};
