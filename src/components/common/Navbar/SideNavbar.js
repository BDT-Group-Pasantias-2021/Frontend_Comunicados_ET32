/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Toggle, Sidenav, Nav, Dropdown, Icon } from 'rsuite';
import { Link } from 'react-router-dom';

// Components

// Hooks
import { NavbarContext } from '../../../hooks/useContext/NavbarContext';

// Styles
import '../../../css/side_navbar.css';

export default function Sidenavbar() {
	const [expanded, setExpanded] = useState(true);
	const [activeKey, setActiveKey] = useState(1);
	const [navWidth, setNavWidth] = useState(250);

	const { activeSidebar } = useContext(NavbarContext);

	const handleToggle = () => {
		setExpanded(!expanded);
	};

	const handleSelect = (eventKey) => {
		setActiveKey(eventKey);
	};

	useEffect(() => {
		if (!activeSidebar) {
			setNavWidth(0);
		} else {
			setNavWidth(250);
		}
	}, [activeSidebar]);

	const MyLink = React.forwardRef((props, ref) => {
		const { href, as, ...rest } = props;
		return (
			<Link to={href} as={as}>
				<div {...rest} />
			</Link>
		);
	});
	const NavLink = (props) => <Nav.Item componentClass={MyLink} {...props} />;

	return (
		<nav id="sidenavbar-container" style={{ width: navWidth, height: '100%' }}>
			<Sidenav
				expanded={activeSidebar}
				defaultOpenKeys={['3', '4']}
				activeKey={activeKey}
				onSelect={handleSelect}
			>
				<Sidenav.Body>
					<Nav>
						{/* <Toggle onChange={handleToggle} checked={expanded} /> */}
						<NavLink href="/">
							<Icon icon="dashboard" />
							Login
						</NavLink>
						<NavLink href="/home">
							<Icon icon="dashboard" />
							Home
						</NavLink>
						<NavLink href="/user-group" eventKey="2" icon={<Icon icon="group" />}>
							User Group
						</NavLink>
						<Dropdown placement="rightStart" eventKey="3" title="Advanced" icon={<Icon icon="magic" />}>
							<NavLink href="/geo" eventKey="3-1">
								Customize
							</NavLink>
						</Dropdown>
						{/* <Dropdown
							placement="rightStart"
							eventKey="4"
							title="Settings"
							icon={<Icon icon="gear-circle" />}
						>
							<NavLink eventKey="4-1">Applications</NavLink>
							<NavLink eventKey="4-2">Channels</NavLink>
							<NavLink eventKey="4-3">Versions</NavLink>
							<Dropdown.Menu eventKey="4-5" title="Custom Action">
								<NavLink eventKey="4-5-1">Action Name</NavLink>
								<NavLink eventKey="4-5-2">Action Params</NavLink>
							</Dropdown.Menu>
						</Dropdown> */}
					</Nav>
				</Sidenav.Body>
			</Sidenav>
		</nav>
	);
}
