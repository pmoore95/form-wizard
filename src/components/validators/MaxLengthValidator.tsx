import {AbstractValidator} from "./AbstractValidator";

export default class MaxLengthValidator extends AbstractValidator
{
  private readonly maxLength: number;

  public constructor(maxLength: number)
  {
    super();
    this.maxLength = maxLength;
  }

  public validate(value: string): boolean {
    return value.length <= this.maxLength;
  }
}