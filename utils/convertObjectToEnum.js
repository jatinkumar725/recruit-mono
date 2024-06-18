const convertObjectToEnum = (obj, from = 'values') => {
  const enumArr = [];
  if ('keys' === from) {
    Object.keys(obj).map((key) => enumArr.push(obj[key]));
    return enumArr;
  }
  Object.values(obj).map((val) => enumArr.push(val));
  return enumArr;
};

module.exports = convertObjectToEnum;
