import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { appStore } from "./redux/app";
import './index.css';
import BoardGame from './components/BoardGame';

ReactDOM.render(
  <Provider store={appStore}>
    <React.StrictMode>
      <BoardGame />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);