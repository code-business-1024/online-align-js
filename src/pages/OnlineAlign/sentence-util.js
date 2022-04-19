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
    console.log('1');
    return (finalArray = arr2);
  }
  if (!arr2 || arr2.length == 0) {
    console.log('2');
    return (finalArray = arr1);
  }

  if (arr1.length > arr2.length) {
    console.log('3');
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
        finalArray.push({ ...item1 });
      }
    });
  } else {
    console.log('4');
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
        finalArray.push({ ...item2 });
      }
    });
  }
  console.log(finalArray);
  return finalArray;
};
