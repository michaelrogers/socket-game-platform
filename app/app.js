import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import routes from './config/routes';
import { Form } from "./components/Form";

ReactDOM.render(
    <routes />,
    document.getElementById("app")
);
