import {InputElementProps} from "./InputElement";
import React, {ChangeEvent, createRef, Ref, RefObject, SyntheticEvent, useEffect, useRef, useState} from "react";
import {saveData} from "../redux/features/UserProgress/userProgressSlice";
import {useDispatch} from "react-redux";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {ucwords} from "../utils/string-utils";

type RadioInputElementProps = {options: {value: string, displayValue?: string, checked?: boolean}[], onChange: any } & Omit<InputElementProps, 'type' | 'onChange'>

export const RadioInputElement  = (props: RadioInputElementProps) => {
  const dispatch = useDispatch();

  let mainProps = {...props};
  delete mainProps.label;

  const onChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    let target = event.target as HTMLInputElement;

    if(props.validateCallback)
    {
      props.validateCallback(true, props.name);
    }

    dispatch(saveData({key: props.name, value: target.value}));
  }

  useEffect(()=>{
    if(props.validateCallback && props.options)
    {
      props.options.map(option => {
        if(option.checked)
        {
          // @ts-ignore
          props.validateCallback(true, props.name);
        }
      });
    }
  }, []);

  return <FormControl>
    <FormLabel id="demo-radio-buttons-group-label">Driver?</FormLabel>
    <RadioGroup
        name="radio-buttons-group"
    >
      {props.options.map((option, index) => {
        return <FormControlLabel
            {...mainProps}
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.displayValue ? option.displayValue : ucwords(option.value)}
            checked={option.checked ? option.checked : false}
            onChange={(event, checked)=>{onChange(event, checked); if(props.onChange){props.onChange()}}}
        />
      })}
    </RadioGroup>
  </FormControl>;



  // <>
  //   {<label htmlFor={id}>{props.label}</label>}
  //   {props.options.map((option, index) => {
  //     return <InputElement
  //         key={index}
  //         label={option.displayValue ? option.displayValue : ucwords(option.value)}
  //         type={'radio'}
  //         value={option.value}
  //         checked={option.checked ? option.checked : false}
  //         onChange={onChange}
  //         {...mainProps} />
  //   })}
  //   </>

}