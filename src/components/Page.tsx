import {DefaultReactProps} from "../interfaces/DefaultReactProps";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setPageValid, setPageInvalid} from "../redux/features/UserProgress/userProgressSlice";
import {AppState} from "../redux/store";
import {TextInputElement} from "./TextInputElement";
import {SelectElement} from "./SelectElement";
import {RadioInputElement} from "./RadioInputElement";

export const Page = (props: {pageNum: number} & DefaultReactProps) => {
    const [elements, setElements] = useState<any>({});
    const [isValid, setIsValid] = useState<boolean>();
    const dispatch = useDispatch();

    const checkIsValid = () =>
    {
        if(Object.keys(elements).length > 0)
        {
            let valid = true;
            Object.keys(elements).forEach((key)=>{
                if(!elements[key])
                {
                    return valid = false;
                }
            });

            setIsValid(valid);
        }
    }

    useEffect(()=>{
        if(isValid !== undefined)
        {
            if(isValid)
            {
                dispatch(setPageValid(props.pageNum));
            }
            else
            {
                dispatch(setPageInvalid(props.pageNum));
            }
        }
    }, [isValid])



    useEffect(()=>{
        let els:any = {};

        React.Children.map(props.children, (child, index)=>{
            if(React.isValidElement(child) &&
                (
                    child.type == TextInputElement ||
                    child.type == SelectElement ||
                    child.type == RadioInputElement
                )
            )
            {
                els[child.props.name] = false;
            }
        });

        setElements((prevState: any)=>{
            if(Object.keys(prevState).length > 0)
            {
                if(Object.keys(prevState).length === Object.keys(els).length)
                {
                    return prevState
                }
                else if(Object.keys(prevState).length > Object.keys(els).length)
                {
                    let test = {};

                    Object.keys(els).map((key:string) => {
                        if(prevState[key])
                        {
                            // @ts-ignore
                            test[key] = prevState[key];
                        }
                    });

                    return test;
                }
                else{
                    return {...els, ...prevState};
                }
            }

            return {
                ...els
            }
        });
    }, [props.children])

    useEffect(()=>{
        if(Object.keys(elements).length)
        {
            checkIsValid();
        }
    }, [elements]);

    const setElementValid = (valid: boolean, key: number) => {
        setElements((prevState: any) => ({
            ...prevState,
            [key]: valid
        }));
    }

    const giveInputsOnValidFunction = React.Children.map(props.children, (child, index) =>{
        if(React.isValidElement(child) &&
            (
                child.type == TextInputElement ||
                child.type == SelectElement ||
                child.type == RadioInputElement
            )
        )
        {
            return React.cloneElement(child, {validateCallback: setElementValid})
        }

        return child;
    });

    return <div className={'page'}>
        {giveInputsOnValidFunction}
    </div>
}