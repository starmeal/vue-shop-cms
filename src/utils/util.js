const isInteger = (obj) => {
  return Math.floor(obj) === obj;
};

/*
 * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
 * @param floatNum {number} 小数
 * @return {object}
 * {times:100, num: 314}
 */
const toInteger = (floatNum) => {
  var ret = { times: 1, num: 0 };
  if (isInteger(floatNum)) {
    ret.num = floatNum;
    return ret;
  }
  var strfi = floatNum + '';
  var dotPos = strfi.indexOf('.');
  var len = strfi.substr(dotPos + 1).length;
  var times = Math.pow(10, len);
  var intNum = parseInt(floatNum * times + 0.5, 10);
  ret.times = times;
  ret.num = intNum;
  return ret;
};

/*
 * 核心方法，实现加减乘除运算，确保不丢失精度
 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
 *
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
 *
 */
export const operation = (a, b, op) => {
  var o1 = toInteger(a);
  var o2 = toInteger(b);
  var n1 = o1.num;
  var n2 = o2.num;
  var t1 = o1.times;
  var t2 = o2.times;
  var max = t1 > t2 ? t1 : t2;
  var result = null;
  switch (op) {
    case 'add':
      if (t1 === t2) {
        // 两个小数位数相同
        result = n1 + n2;
      } else if (t1 > t2) {
        // o1 小数位 大于 o2
        result = n1 + n2 * (t1 / t2);
      } else {
        // o1 小数位 小于 o2
        result = n1 * (t2 / t1) + n2;
      }
      return result / max;
    case 'subtract':
      if (t1 === t2) {
        result = n1 - n2;
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2);
      } else {
        result = n1 * (t2 / t1) - n2;
      }
      return result / max;
    case 'multiply':
      result = (n1 * n2) / (t1 * t2);
      return result;
    case 'divide':
      result = (n1 / n2) * (t2 / t1);
      return result;
  }
};
// 加减乘除的四个接口
export const add = (a, b) => {
  return operation(a, b, 'add');
};
export const subtract = (a, b) => {
  return operation(a, b, 'subtract');
};
export const multiply = (a, b) => {
  return operation(a, b, 'multiply');
};
export const divide = (a, b) => {
  return operation(a, b, 'divide');
};
export const debounce = function (func, wait = 1500, immediate = false) {
  if (typeof func !== 'function') {
    throw new TypeError('debounce func is not a function');
    return false;
  }
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    // 立即执行
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) func.apply(this, arguments);
      return false;
    }
    // 非立即执行
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
};
export const throttle = function (func, wait = 500, type = 1) {
  if (typeof func !== 'function') {
    throw new TypeError('throttle func is not a function');
    return false;
  }
  // type 1 时间戳版

  if (type === 1) {
    let prevTime = 0;
    return function () {
      let now = new Date().getTime();
      if (now - prevTime > wait) {
        func.apply(this, arguments);
        prevTime = now;
      }
    };
  }
  let timer;
  return function () {
    if (timer) {
      return false;
    }
    timer = setTimeout(() => {
      timer = null;
      func.apply(this, arguments);
    }, wait);
  };
};
export const deepClone = (value, hash = new WeakMap) => { // 弱引用，不要用map
  if (value == null || typeof value != 'object') { return value; }
  if (value instanceof RegExp) { return new RegExp(value) }
  if (value instanceof Date) { return new Date(value) }
  let obj = new value.constructor();
  if (hash.get(value)) {
    return hash.get(value)
  }
  hash.set(value, obj);
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      obj[key] = deepClone(value[key], hash);
    }
  }
  return obj
}
export function formatDate(date) {
  var date = new Date(date);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD + " " + hh + mm + ss;
}
export function descartes(array) {
  if (array.length < 2) return array[0] || [];
  return [].reduce.call(array, function (col, set) {
    var res = [];
    col.forEach(function (c) {
      set.forEach(function (s) {
        var t = [].concat(Array.isArray(c) ? c : [c]);
        t.push(s);
        res.push(t);
      });
    });
    return res;
  });
}
export function sortArr(arr, sort) {
  if (sort == 'mini') {
    var min
    for (var i = 0; i < arr.length; i++) {
      for (var j = i; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          min = arr[j];
          arr[j] = arr[i];
          arr[i] = min;
        }
      }
    }
  } else {
    //创建每次循环存储最大值得变量
    var max;
    //遍历数组，默认arr中的某一个元素为最大值，进行逐一比较
    for (var i = 0; i < arr.length; i++) {
      //外层循环一次，就拿arr[i] 和 内层循环arr.legend次的 arr[j] 做对比
      for (var j = i; j < arr.length; j++) {
        if (arr[i] < arr[j]) {
          //如果arr[j]大就把此时的值赋值给最大值变量max
          max = arr[j];
          arr[j] = arr[i];
          arr[i] = max;
        }
      }
    }
  }
  return arr
}
