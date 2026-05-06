import validator from 'validator';
export const checkAmountValue = (amount) => {
  const checkValue = validator.isCurrency(amount.toString(), {
    digits_after_decimal: [2],
    allow_negatives: false,
    decimal_separator: '.',
  });
  return checkValue;
};
