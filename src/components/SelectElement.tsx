import {convertToKebabCase, ucwords} from "../utils/string-utils";
import React, {ChangeEvent, useEffect} from "react";
import {InputElement, InputElementProps} from "./InputElement";
import {saveData} from "../redux/features/UserProgress/userProgressSlice";
import validate = WebAssembly.validate;
import {useDispatch} from "react-redux";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

type SelectElementProps = {options: {value: string, displayValue?: string}[] } & Omit<InputElementProps, 'type'>

export const SelectElement = (props: SelectElementProps) => {
  {
    const dispatch = useDispatch();
    let id = props.id ? props.id : convertToKebabCase(props.name);
    let mainProps = {...props};
    delete mainProps.placeholder;
    delete mainProps.validateCallback;

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

    const onChange = (event: SelectChangeEvent) => {
      let target = event.target as HTMLInputElement;
      let value = target.value;

      if(props.validateCallback)
      {
        props.validateCallback(validate(value), props.name);
      }

      dispatch(saveData({key: props.name, value: target.value}));
    }

    useEffect(()=>{
      if(props.value && props.validateCallback)
      {
        props.validateCallback(validate(props.value), props.name);
      }
    }, []);

    return <>
      <FormControl fullWidth className={'select'}>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
            {...mainProps}
            onChange={onChange}
        >
          {props.options.map((option, key)=>{
            return <MenuItem key={key} value={option.value}>{option.displayValue ? option.displayValue : ucwords(option.value)}</MenuItem>
          })}
        </Select>
      </FormControl>

      {/*{props.label && <label htmlFor={id}>{props.label}</label>}*/}
      {/*<select {...mainProps} onChange={onChange}>*/}
      {/*  {props.placeholder && <option value={''}>{props.placeholder}</option>}*/}
      {/*  {props.options.map((option, key) => {*/}
      {/*    return <option key={key} value={option.value}>{option.displayValue ? option.displayValue : ucwords(option.value)}</option>*/}
      {/*  })}*/}
      {/*</select>*/}
    </>
  }
}