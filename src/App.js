import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import TopNavbar from './components/common/Navbar/TopNavbar';
//import SideNavbar from './components/common/Navbar/SideNavbar';

// Styles
import './css/global.css';

// Navigation
import Login from './components/views/Login';
import Home from './components/views/Inicio';

export default function App() {
	return (
		<Router basename="/Frontend_Comunicados_ET32">
			<TopNavbar />
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/" exact component={Login} />
			</Switch>
		</Router>
	);
}
