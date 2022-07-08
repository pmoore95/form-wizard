import {useDispatch, useSelector} from "react-redux";
import {nextPage, prevPage, setPageActive } from "../redux/features/UserProgress/userProgressSlice";
import {AppState} from "../redux/store";
import {Button} from "@mui/material";
import { hasSubmitted } from "../redux/features/App/appSlice";

export const Pagination = (props: {numPages: number}) => {

  const currentPage = useSelector((state:AppState)=>state.userProgress.activePage);
  const dispatch = useDispatch();
  const userProgressState = useSelector((state: AppState)=> state.userProgress);

  const isPageValid = (key: number) =>
  {
    for(let i = 0; i<userProgressState.pages.length; i++)
    {
      if(userProgressState.pages[i].num == key)
      {
        return userProgressState.pages[i].valid
      }
    }
  }

  const onClick = () => {
    if(isPageValid(userProgressState.activePage))
    {
      dispatch(nextPage());
    }
  }

  const submit = () => {
    if(isPageValid(userProgressState.activePage))
    {
      dispatch(hasSubmitted(true));
    }
  }

  return <div className={'pagination'}>
    {currentPage == 1 &&
      <Button variant="contained" onClick={onClick} disabled={!isPageValid(userProgressState.activePage)}>Next</Button>
    }
    {currentPage == 2 &&
        <>
          <Button variant="contained" onClick={()=>dispatch(prevPage())}>Back</Button>
          <Button variant="contained" onClick={onClick} disabled={!isPageValid(userProgressState.activePage)}>Next</Button>
        </>
            }
    {currentPage == 3 &&
      <>
        <Button variant="contained" onClick={()=>dispatch(prevPage())}>Back</Button>
        <Button variant="contained" onClick={submit} disabled={!isPageValid(userProgressState.activePage)}>Submit</Button>
      </>
    }
  </div>
}