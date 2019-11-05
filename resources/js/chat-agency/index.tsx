import 'react-hot-loader'
import React from "react";
import ReactDOM from "react-dom"
import { App } from './src/App';
import { register_service_worker } from './src/register-service-worker';
register_service_worker()




ReactDOM.render(
    <App />,
    document.getElementById("chat-react-app")
);
