import validator from 'validator';
import { badRequest } from './index.js';
export const checkIfIdIsValid = (id) => validator.isUUID(id);
export const idInvalid = () => {
  badRequest({ message: 'ID invalid.' });
};
