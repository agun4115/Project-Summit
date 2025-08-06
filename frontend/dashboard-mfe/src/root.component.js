import React from "react";
import { BrowserRouter } from "@sysco/shared-utility";
import { Provider } from '@sysco/shared-utility';
import { store } from '@sysco/shared-utility';
import App from "./App";

export default function Root(props) {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/admin">
        <App />
      </BrowserRouter>
    </Provider>
  );
}