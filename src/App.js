import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Components

import Login from "./components/views/Login"
import Home from "./components/views/Inicio"
import Navbar from "./components/common/Navbar/Navbar"

// Styles

import './css/global.css'

// Navigation

export default function App() {
	return <Router basename="/Frontend_Comunicados_ET32">
				{/* <Navbar /> */}
				<Switch>
					<Route path="/home" component={Home} />
					<Route path="/" exact component={Login} />
				</Switch>
			</Router>;
}