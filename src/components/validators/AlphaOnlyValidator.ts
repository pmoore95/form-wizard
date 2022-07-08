import {AbstractValidator} from "./AbstractValidator";

export default class AlphaOnlyValidator extends AbstractValidator
{
  public validate(value: string): boolean {
    return /^[A-Za-z ]+$/.test(value);
  }
}