import {InputElement, InputElementProps} from "./InputElement";

type TextInputElementProps = Omit<InputElementProps, "type">;

export const TextInputElement  = (props: TextInputElementProps) => {
  return <InputElement type={'text'} {...props}/>
}

