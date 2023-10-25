import React, { useEffect } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../store/feature/userSlice';
import ParentComponent from '../user/component/button';
import App from '../user/register';

function MainScreen() {
  const authInfo = useSelector((state) => state.user.authInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthInfo(1));
  }, []);

  return (
    <div className="App">
      aasdf asdf d<ParentComponent></ParentComponent>
      <button></button>
    </div>
  );
}

export default MainScreen;
