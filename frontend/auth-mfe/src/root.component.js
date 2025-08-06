import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { store } from '@sysco/shared-utility';
import AuthContainer from './Components/Auth/AuthContainer';

export default function Root(props) {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/auth">
        <div>
          <AuthContainer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}