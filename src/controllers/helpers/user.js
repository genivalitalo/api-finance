import { badRequest } from './http.js';
import validator from 'validator';

export const invalidPassword = () =>
  badRequest({ message: 'Password invalid.' });

export const invalidEmail = () => badRequest({ message: 'E-mail invalid.' });

export const idInvalid = () => {
  badRequest({ message: 'ID invalid.' });
};

export const checkIfPasswordIsValid = (password) => password.length > 6;
export const checkIfEmailIsValid = (email) => validator.isEmail(email);
export const checkIfIdIsValid = (id) => validator.isUUID(id);
