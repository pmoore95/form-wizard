import {AbstractValidator} from "./AbstractValidator";

export default class RequiredValidator extends AbstractValidator
{
  public validate(value: string): boolean {
    return /(.|\s)*\S(.|\s)*/.test(value);
  }
}