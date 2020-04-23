import { isEmpty, validateLoginData, validateSignUpData } from './validators';

const validationErrorMessage = {
  missing: 'Field required',
  emailFormat: 'Must be valid email address',
  passwordMismatch: 'Passwords must be the same',
};

describe('validators', () => {
  describe('isEmpty', () => {
    it('return false when value passed', () => {
      expect(isEmpty('foo')).toEqual(false);
    });

    it('return true when value not passed', () => {
      expect(isEmpty()).toEqual(true);
    });

    it('return true when value empty', () => {
      expect(isEmpty('')).toEqual(true);
    });
  });

  describe('validateLoginData', () => {
    it('return true when email and password passed', () => {
      const data = {
        email: 'foo',
        password: 'bar',
      };

      expect(validateLoginData(data)).toEqual({
        errors: {},
        valid: true,
      });
    });

    it('return false when email blank', () => {
      const data = {
        email: '',
        password: 'bar',
      };

      expect(validateLoginData(data)).toEqual({
        errors: {
          email: validationErrorMessage.missing,
        },
        valid: false,
      });
    });

    it('return false when email missing', () => {
      const data = {
        password: 'bar',
      };

      expect(validateLoginData(data)).toEqual({
        errors: {
          email: validationErrorMessage.missing,
        },
        valid: false,
      });
    });

    it('return false when password blank', () => {
      const data = {
        email: 'foo',
      };

      expect(validateLoginData(data)).toEqual({
        errors: {
          password: validationErrorMessage.missing,
        },
        valid: false,
      });
    });

    it('return false when password missing', () => {
      const data = {
        email: 'foo',
      };

      expect(validateLoginData(data)).toEqual({
        errors: {
          password: validationErrorMessage.missing,
        },
        valid: false,
      });
    });
  });

  describe('validateSignUpData', () => {
    const validFields = {
      username: 'foo',
      email: 'foo@bar.com',
      password: 'password01',
      passwordConfirm: 'password01',
    };

    it('return true when all fields are valid', () => {
      expect(validateSignUpData(validFields)).toEqual({
        errors: {},
        valid: true,
      });
    });

    it('return false when username missing', () => {
      const fields = {
        ...validFields,
        username: '',
      };

      expect(validateSignUpData(fields)).toEqual({
        errors: {
          username: validationErrorMessage.missing,
        },
        valid: false,
      });
    });

    it('return false when email missing', () => {
      const fields = {
        ...validFields,
        email: '',
      };

      expect(validateSignUpData(fields)).toEqual({
        errors: {
          email: validationErrorMessage.missing,
        },
        valid: false,
      });
    });

    it('return false when email invalid format', () => {
      const fields = {
        ...validFields,
        email: 'foo',
      };

      expect(validateSignUpData(fields)).toEqual({
        errors: {
          email: validationErrorMessage.emailFormat,
        },
        valid: false,
      });
    });

    it('return false when password missing', () => {
      const fields = {
        ...validFields,
        password: '',
      };

      expect(validateSignUpData(fields)).toEqual({
        errors: {
          password: validationErrorMessage.missing,
        },
        valid: false,
      });
    });

    it('return false when passwords do not match', () => {
      const fields = {
        ...validFields,
        passwordConfirm: 'password02',
      };

      expect(validateSignUpData(fields)).toEqual({
        errors: {
          password: validationErrorMessage.passwordMismatch,
        },
        valid: false,
      });
    });
  });
});
