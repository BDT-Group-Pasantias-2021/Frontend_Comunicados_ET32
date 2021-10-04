/* eslint-disable no-unused-vars */
import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { Sidenav, Nav, Dropdown, Icon } from 'rsuite';
import { Link } from 'react-router-dom';

// Hooks
import { NavbarContext } from '../../../hooks/useContext/NavbarContext';

// Styles
import '../../../css/side_navbar.css';

// Components

export default function Sidenavbar() {
	const [activeKey, setActiveKey] = useState(1);
	const [navWidth, setNavWidth] = useState(250);

	const { activeSidebar, setActiveSidebar } = useContext(NavbarContext);

	const handleSelect = (eventKey) => {
		setActiveKey(eventKey);
	};

	const resizePadding = (fatherContainer) => {
		if (window.innerWidth < 768) {
			fatherContainer.style.paddingLeft = '0px';
		} else {
			fatherContainer.style.paddingLeft = '300px';
		}
	};

	useEffect(() => {
		if (!activeSidebar) {
			setNavWidth(0);
		} else {
			setNavWidth(300);
		}

		const fatherContainer = document.getElementById('father-container-view');
		if (window.innerWidth > 750) {
			if (activeSidebar) {
				fatherContainer.style.paddingLeft = '300px';
			} else {
				fatherContainer.style.paddingLeft = '0px';
			}
		}

		window.addEventListener('resize', () => resizePadding(fatherContainer));
		return () => {
			window.removeEventListener('resize', () => resizePadding(fatherContainer));
		};
	}, [activeSidebar, setActiveSidebar]);

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
			<Sidenav expanded={activeSidebar} defaultOpenKeys={[]} activeKey={activeKey} onSelect={handleSelect}>
				<Sidenav.Body>
					<Nav>
						<NavLink href="/apercebimientos-y-llamadas-de-atencion">
							<Icon icon="dashboard" />
							Apercebimientos
						</NavLink>
						<Dropdown
							placement="rightStart"
							eventKey="1"
							title="Presentismo"
							icon={<Icon icon="calendar" />}
						>
							<NavLink href="/horarios" eventKey="2-1">
								Horarios
							</NavLink>
							<NavLink href="/faltas-y-llegadas-tardes" eventKey="2-2">
								Faltas y llegadas tarde
							</NavLink>
							<NavLink href="/justificados" eventKey="2-3">
								Faltas justificadas
							</NavLink>
							<NavLink href="/reincorporaciones" eventKey="2-4">
								Solicitudes de reincorporación
							</NavLink>
						</Dropdown>
						<Dropdown placement="rightStart" eventKey="2" title="Materias" icon={<Icon icon="magic" />}>
							<NavLink href="/mis-notas" eventKey="2-1">
								Notas
							</NavLink>
							<NavLink href="/materias-adeudadas" eventKey="2-2">
								Materias adeudadas
							</NavLink>
							<NavLink href="/solicitud-mesa-de-examenes" eventKey="2-3">
								Solicitud de mesa de examenes
							</NavLink>
						</Dropdown>
						<Dropdown
							placement="rightStart"
							eventKey="3"
							title="Documentos institucionales"
							icon={<Icon icon="magic" />}
						>
							<NavLink href="/reglamento-escolar" eventKey="3-1">
								Reglamentación escolar
							</NavLink>
							<NavLink href="/fechas-de-actos" eventKey="3-2">
								Fechas de actos
							</NavLink>
							<NavLink href="/normativas-escolares" eventKey="3-3">
								Normativas escolares
							</NavLink>
							<NavLink href="/código-de-conducta" eventKey="3-4">
								Código de conducta
							</NavLink>
						</Dropdown>
						<Dropdown
							placement="rightStart"
							eventKey="4"
							title="Documentos del alumno"
							icon={<Icon icon="magic" />}
						>
							<NavLink href="/autorizaciones-de-visitas-didacticas" eventKey="4-1">
								Autorizaciones de visitas
							</NavLink>
							<NavLink href="/certificados-de-escolaridad" eventKey="4-2">
								Certificados de escolaridad
							</NavLink>
							<NavLink href="/constancias-de-salario-familiar" eventKey="4-3">
								Constancias de salario familiar
							</NavLink>
							<NavLink href="/fichas-de-salud" eventKey="4-4">
								Fichas de salud
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
