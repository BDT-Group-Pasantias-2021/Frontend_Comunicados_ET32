import React, { useState } from 'react';
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

	const [activeSidebar, setActiveSidebar] = useState(false)

	return (
		<Router basename="/Frontend_Comunicados_ET32">
			<NavbarContext.Provider
			value={
				{
					activeSidebar, setActiveSidebar
				}
			}
			>		
				<SideNavbar/>
				<TopNavbar />
			</NavbarContext.Provider>
			<Switch>
				<Route path="/" component={Home} />
				<Route path="/home" exact component={Login} />
			</Switch>
		</Router>
	);
}
