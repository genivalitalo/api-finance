import validator from 'validator';
import { badRequest } from './index.js';
export const checkIfIdIsValid = (id) => validator.isUUID(id);
export const idInvalid = () => {
  badRequest({ message: 'ID invalid.' });
};

export const checkIsString = (value) => typeof value === 'string';
export const validateRequireFields = (params, requireFields) => {
  for (const field of requireFields) {
    const fieldMissing = !params[field];
    const fieldIsEmpty =
      checkIsString(params[field]) &&
      validator.isEmpty(params[field], {
        ignore_whitespace: true,
      });
    if (fieldMissing || fieldIsEmpty) {
      return {
        missingField: field,
        ok: false,
      };
    }
  }
  return {
    ok: true,
    missingField: undefined,
  };
};
