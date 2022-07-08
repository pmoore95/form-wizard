import React, {useEffect, useState} from 'react';
import { Page } from './components/Page';
import {Pagination} from "./components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "./redux/store";
import RequiredValidator from "./components/validators/RequiredValidator";
import AlphaOnlyValidator from "./components/validators/AlphaOnlyValidator";
import {TextInputElement} from "./components/TextInputElement";
import {SelectElement} from "./components/SelectElement";
import {RadioInputElement} from "./components/RadioInputElement";
import NumericOnlyValidator from "./components/validators/NumericOnlyValidator";
import MaxLengthValidator from "./components/validators/MaxLengthValidator";
import { clearData, removeDataByKey } from './redux/features/UserProgress/userProgressSlice';
import { hasSubmitted } from './redux/features/App/appSlice';

function App() {
  const appState = useSelector((state: AppState)=>state.app);
  const userProgressState = useSelector((state: AppState)=> state.userProgress);
  const isSubmitted = useSelector((state: AppState)=>state.app.hasSubmitted);
  const dispatch = useDispatch();

  const getData = (key:string) => {
    // @ts-ignore
    return userProgressState.data[key];
  }

  const restartForm = () => {
    dispatch(clearData());
    dispatch(hasSubmitted(false));
  }

  if(isSubmitted)
  {
    return <>
      <h1>Form is submitted!</h1>
      <p>Collected Data:</p>
      <code>{JSON.stringify(userProgressState.data)}</code>
      <p>Restart the form <a className={'underline cursor-pointer'} onClick={restartForm}>here</a></p>
    </>;
  }

  const removeData = () => {
    if(getData('driver')==='no')
    {
      dispatch(removeDataByKey('driving_experience'));
    }
  }

  return (
      <div className="app bg-gray-200">
        <div className={"app__container bg-gray-50 drop-shadow-md rounded"}>
          <h1 className={'text-2xl'}>Example Form Wizard</h1>
          <form>
            {userProgressState && (userProgressState.activePage == 1) &&
              <Page pageNum={1}>
                <TextInputElement validators={[new RequiredValidator, new AlphaOnlyValidator]} name={'first_name'} label={'First name'} value={getData('first_name') || ''}/>
                <TextInputElement validators={[new RequiredValidator, new AlphaOnlyValidator]} name={'last_name'} label={'Last name'} value={getData('last_name') || ''}/>
              </Page>
            }
            {userProgressState && (userProgressState.activePage == 2) &&
              <Page pageNum={2}>
                <SelectElement validators={[new RequiredValidator]} label={'Do you have Children?'} options={[{value: 'yes'}, {value: 'no'}]} name={'has_children'} placeholder={'Please select an option'} value={getData('has_children') || ''}/>
                <SelectElement validators={[new RequiredValidator]} label={'Do you enjoy any of the following hobbies?'}  options={[{value: 'hiking'}, {value:'music'}, {value: 'programming'}, {value: 'none_of_the_above', displayValue:'None of the above'}]} name={'hobbies'} placeholder={'Please select an option'} value={getData('hobbies') || ''}/>
              </Page>
            }
            {userProgressState && (userProgressState.activePage == 3) &&
              <Page pageNum={3}>
                <RadioInputElement
                    validators={[new RequiredValidator]}
                    name={'driver'}
                    label={'Do you drive?'}
                    options={[
                        {'value': 'yes', checked: getData('driver') == 'yes'},
                        {'value':'no', checked: getData('driver') == 'no'}
                    ]}
                    onChange={removeData}
                />

                {getData('driver') == 'yes' &&
                  <TextInputElement
                      inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                      validators={[new RequiredValidator, new NumericOnlyValidator, new MaxLengthValidator(2)]}
                      name={'driving_experience'} label={'How many years driving experience do you have?'}
                      value={getData('driving_experience') || ''}
                  />
                }
              </Page>
            }
          </form>
          <Pagination numPages={appState.numPages}/>
        </div>
      </div>
  );
}

export default App;
