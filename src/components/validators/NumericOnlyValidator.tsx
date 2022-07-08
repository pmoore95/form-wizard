import {AbstractValidator} from "./AbstractValidator";

export default class NumericOnlyValidator extends AbstractValidator
{
  public validate(value: string): boolean {
    return /^[0-9]*$/.test(value);
  }
}