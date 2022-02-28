import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import env from 'react-dotenv';
import { CssBaseline } from '@mui/material';

axios.interceptors.request.use((request) => {
	// add auth header with jwt if account is logged in and request is to the api url
	const isApiUrl = request.url.startsWith(env.API_URL);
	const token = localStorage.getItem('token');

	if (token && isApiUrl) {
		request.headers.common.Authorization = token;
	}

	return request;
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
