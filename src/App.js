/* eslint-disable no-sequences */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import TopNavbar from './components/common/Navbar/TopNavbar';
import SideNavbar from './components/common/Navbar/SideNavbar';

// Hooks
import { NavbarContext } from './hooks/useContext/NavbarContext';

// Styles
import './css/global.css';

// Navigation
import Login from './components/views/Login';
import Home from './components/views/Inicio';

export default function App() {
	const [activeSidebar, setActiveSidebar] = useState(false);
	const [showNavbar, setShowNavbar] = useState(true);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		const pathname = window.location.pathname;
		if (pathname === '/Frontend_Comunicados_ET32/') {
			setShowNavbar(false);
		} else {
			setShowNavbar(true);
		}
	});

	return (
		<Router basename="/Frontend_Comunicados_ET32">
			<NavbarContext.Provider
				value={{
					activeSidebar,
					setActiveSidebar,
				}}
			>
				{showNavbar && ((<SideNavbar />), (<TopNavbar />))}
			</NavbarContext.Provider>
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/" exact component={Login} />
			</Switch>
		</Router>
	);
}
