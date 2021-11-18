/* eslint-disable no-sequences */
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
import AccountConfig from './components/views/AccountConfig';
import Home from './components/views/Inicio';
import Login from './components/views/Login';

export default function App() {
	const [activeSidebar, setActiveSidebar] = useState(false);
	const [homePageLocation, setHomePageLocation] = useState(null);
	const [searchValue, setSearchValue] = useState('');
	const [showNavbar, setShowNavbar] = useState(false);

	return (
		<Router basename="/Frontend_Comunicados_ET32">
			<NavbarContext.Provider
				value={{
					activeSidebar,
					setActiveSidebar,
					searchValue,
					setSearchValue,
					homePageLocation,
				}}
			>
				{showNavbar && <TopNavbar />}
				{showNavbar && <SideNavbar />}
			</NavbarContext.Provider>
			<Switch>
				<Route path="/configuracion">
					<AccountConfig
						showNavbar={() => setShowNavbar(true)}
						homePageLocation={() => setHomePageLocation(false)}
					/>
				</Route>
				<Route path="/home">
					<Home
						showNavbar={() => setShowNavbar(true)}
						homePageLocation={() => setHomePageLocation(true)}
						searchValue={searchValue}
					/>
				</Route>
				<Route path="/" exact>
					<Login hideNavbar={() => setShowNavbar(false)} />
				</Route>
			</Switch>
		</Router>
	);
}
