import validator from 'validator';
import { badRequest } from './index.js';
export const checkAmountValue = (amount) => {
  if (typeof amount !== 'number') {
    return false;
  }
  const checkValue = validator.isCurrency(amount.toFixed(2), {
    digits_after_decimal: [2],
    allow_negatives: false,
    decimal_separator: '.',
  });
  return checkValue;
};
export const checkIsTypeValid = (type) => {
  return ['GANHO', 'DESPESA', 'INVESTIMENTO'].includes(type);
};

export const checkAmountResponse = () => {
  return badRequest({
    message: 'Check the amount, this amount is not valid',
  });
};

export const checkTypeResponse = () => {
  return badRequest({
    message: 'Type not found',
  });
};
