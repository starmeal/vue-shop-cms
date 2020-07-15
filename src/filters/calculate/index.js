import { add, subtract, multiply, divide } from '@/utils/util';
export default function(value, operator = 'divide', radix = 100) {
  let result = '';
  switch (operator) {
    case 'add':
      result = add(Number(value), radix);
      break;
    case 'subtract':
      result = subtract(Number(value), radix);
      break;
    case 'multiply':
      result = multiply(Number(value), radix);
      break;
    default:
      result = divide(Number(value), radix);
  }
  return result;
}
