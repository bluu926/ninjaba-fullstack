import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import NotFoundPage from './components/pages/not-found-page';

import HomePage from './components/pages/home-page';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Dashboard from './components/dashboard';
import Transaction from './components/auth/transaction';
import RequireAuth from './components/auth/require-auth';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="registerclosed" component={Register} />
		<Route path="login" component={Login} />
		<Route path="logout" component={Logout} />
		<Route path="dashboard" component={RequireAuth(Dashboard)} />
		<Route path="transaction" component={RequireAuth(Transaction)} />

		<Route path="*" component={NotFoundPage} />
	</Route>
);