import React, {ChangeEvent, Ref, useEffect, useState} from "react";
import { saveData } from "../redux/features/UserProgress/userProgressSlice";
import {convertToKebabCase} from "../utils/string-utils";
import {AbstractValidator} from "./validators/AbstractValidator";
import {useDispatch} from "react-redux";
import {FormControl, FormLabel, RadioGroup, TextField} from "@mui/material";

export interface InputElementProps {
  name: string,
  label?: string,
  type: string,
  value?: string,
  validateCallback?: (result:boolean, key:any)=>void,
  validators?: AbstractValidator[],
  placeholder?: string,
  id?: string,
  checked?: boolean,
  onChange?: (event: ChangeEvent)=>void,
  ref?: Ref<any>,
  inputProps?: any
}

export const InputElement = (props: InputElementProps) => {
  const dispatch = useDispatch();
  const id = props.id ? props.id : convertToKebabCase(props.name);
  const [isValid, setIsValid] = useState<boolean>();

  const validate = (inputValue: string): boolean =>
  {
    if(props.validators)
    {
      let valid = true;

      props.validators.map((validator:any)=>{
        if(!validator.validate(inputValue))
        {
          return valid = false;
        }
      });

      return valid;
    }

    return true;
  }

  const onChange = (event: ChangeEvent) => {
    let target = event.target as HTMLInputElement;
    let value = target.value;

    if(props.validateCallback)
    {
      let valid = validate(value);
      props.validateCallback(valid, props.name);
      setIsValid(valid);
    }

    dispatch(saveData({key: props.name, value: target.value}));
  }


  useEffect(()=>{
    if(props.value && props.validateCallback && props.type !== 'radio')
    {
      let valid = validate(props.value);
      props.validateCallback(valid, props.name);
      setIsValid(valid);
    }
  }, []);

  let errorProp = (isValid == undefined) ? undefined : !isValid;
  return <>
    {props.type == 'text' &&
      <TextField
          label={props.label}
          className={'text-input'}
          variant="outlined"
          ref={props.ref}
          id={id}
          type={props.type}
          onChange={props.onChange? props.onChange : onChange}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          inputProps={props.inputProps}
          error={errorProp}
      />
    }
    {/*{props.label &&*/}

    {/*<label htmlFor={id}>{props.label}</label>*/}
    {/*}*/}
    {/*<input*/}
    {/*    ref={props.ref}*/}
    {/*    id={id}*/}
    {/*    type={props.type}*/}
    {/*    onChange={props.onChange? props.onChange : onChange}*/}
    {/*    name={props.name}*/}
    {/*    value={props.value}*/}
    {/*    placeholder={props.placeholder}*/}
    {/*    checked={props.checked}*/}
    {/*/>*/}
  </>;
}