import { validate } from 'class-validator';

export default abstract class BaseRequest {
  async validate(): Promise<boolean> {
    const validateErrors = await validate(this);
    if (validateErrors.length <= 0) {
      return true;
    }

    throw validateErrors;
  }
}