import { badRequest } from './http.js';
import validator from 'validator';

export const invalidPassword = () =>
  badRequest({ message: 'Password invalid.' });
export const userNotFoundResponse = () =>
  badRequest({ message: 'User not found.' });

export const invalidEmail = () => badRequest({ message: 'E-mail invalid.' });
export const checkIfPasswordIsValid = (password) => password.length > 6;
export const checkIfEmailIsValid = (email) => validator.isEmail(email);
