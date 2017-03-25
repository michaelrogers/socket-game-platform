import React from 'react';
import {render} from 'react-dom';

// Include the Form Component
var Form = require("./components/Form");

// This code here allows us to render our main component (in this case Form)
render(<Form />, document.getElementById("app"));
