import * as EmailValidator from 'email-validator';

export const validateEmail = (value: string) => {
  if (typeof value === 'undefined' || value.length === 0) {
    return '';
  }

  if (!EmailValidator.validate(value)) {
    return '';
  } else {
    return value;
  }
};
