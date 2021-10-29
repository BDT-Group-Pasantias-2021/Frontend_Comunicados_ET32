/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideNavbar from './SideNavbar.js';

// Hooks
import { NavbarContext } from '../../../hooks/useContext/NavbarContext';

// Components
import ProfilePhoto from '../../../assets/svgs/unnamed.jpg';
import NotificationMenu from './NotificationMenu.js';
import LogOutIcon from '../../../assets/svgs/log-out-logo.svg';

// Styles
import '../../../css/top_navbar.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

export default function TopNavbar() {
	const { searchValue, setSearchValue, activeSidebar, setActiveSidebar } = useContext(NavbarContext);

	//Hooks Dropdown
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const openDropdown = () => setDropdownOpen((prevState) => !prevState);

	const writeSearchValue = (e) => {
		setSearchValue(e.target.value);
	};

	const toggleNotificationMenu = () => {
		const notificationMenu = document.getElementById('notification-menu');
		if (!notificationMenu.style.maxHeight) {
			notificationMenu.style.maxHeight = '400px';
		} else {
			notificationMenu.style.maxHeight = null;
		}
	};

	useEffect(() => {
		const searchColor = document.getElementById('search-bar');
		const changeColor = document.getElementById('Lupa_svg');
		searchColor.addEventListener('focus', () => {
			changeColor.style.fill = '#6e6e6e';
		});
		searchColor.addEventListener('focusout', () => {
			changeColor.style.fill = '#fff';
		});
	});

	return (
		<nav id="top-navbar">
			<div className="left-nav">
				<div className="icons-container" style={{ width: '69px', marginRight: '15px' }}>
					<div className="nav-icon-container" onClick={() => setActiveSidebar(!activeSidebar)}>
						<svg
							className="right-nav-icon"
							id="Capa_1"
							viewBox="0 0 384.97 384.97"
							style={{ transform: 'rotateY(180deg)' }}
						>
							<g id="Menu_1_">
								<path
									d="M12.03,120.303h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03
											c-6.641,0-12.03,5.39-12.03,12.03C0,114.913,5.39,120.303,12.03,120.303z"
								/>
								<path
									d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03
											S379.58,180.455,372.939,180.455z"
								/>
								<path
									d="M372.939,264.667H132.333c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h240.606
											c6.641,0,12.03-5.39,12.03-12.03C384.97,270.056,379.58,264.667,372.939,264.667z"
								/>
							</g>
						</svg>
					</div>
					<Link to="/home" className="open-sidebar">
						<div className="nav-icon-container">
							<svg
								className="right-nav-icon"
								viewBox="0 1 511 511.999"
								style={{ width: '18px', height: '18px' }}
							>
								<path d="m498.699219 222.695312c-.015625-.011718-.027344-.027343-.039063-.039062l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.808594-33.328126-13.808594-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.144532.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.441406 13.234375 31.273437 13.746093.484375.046876.96875.070313 1.457031.070313h8.320313v153.695313c0 30.417968 24.75 55.164062 55.167969 55.164062h81.710937c8.285157 0 15-6.71875 15-15v-120.5c0-13.878906 11.292969-25.167969 25.171875-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.28125 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.164062v-153.695313h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.8125 18.359375-18.367187 18.367187-48.253906.027344-66.632813zm-21.242188 45.421876c-3.238281 3.238281-7.542969 5.023437-12.117187 5.023437h-22.71875c-8.285156 0-15 6.714844-15 15v168.695313c0 13.875-11.289063 25.164062-25.167969 25.164062h-66.710937v-105.5c0-30.417969-24.746094-55.167969-55.167969-55.167969h-48.195313c-30.421875 0-55.171875 24.75-55.171875 55.167969v105.5h-66.710937c-13.875 0-25.167969-11.289062-25.167969-25.164062v-168.695313c0-8.285156-6.714844-15-15-15h-22.328125c-.234375-.015625-.464844-.027344-.703125-.03125-4.46875-.078125-8.660156-1.851563-11.800781-4.996094-6.679688-6.679687-6.679688-17.550781 0-24.234375.003906 0 .003906-.003906.007812-.007812l.011719-.011719 208.847656-208.839844c3.234375-3.238281 7.535157-5.019531 12.113281-5.019531 4.574219 0 8.875 1.78125 12.113282 5.019531l208.800781 208.796875c.03125.03125.066406.0625.097656.09375 6.644531 6.691406 6.632813 17.539063-.03125 24.207032zm0 0" />
							</svg>
						</div>
					</Link>
				</div>
				<form
					className="navbar-searchbar"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<input className="searchbar-input" type="text" id="search-bar" />
					<div
						className="searchbar-lupa-container"
						onClick={() => {
							document.getElementById('search-bar').focus();
						}}
					>
						<svg id="Lupa_svg" viewBox="0 0 512.005 512.005" className="searchbar-lupa-icon">
							<g>
								<g>
									<path
										d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
			S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
			c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
			 M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
									/>
								</g>
							</g>
						</svg>
					</div>
				</form>
			</div>
			<div className="right-nav">
				<div className="icons-container">
					<div className="nav-icon-container" id="new-comunicado-button">
						<svg className="right-nav-icon" viewBox="-18 -18 572.00902 572">
							<path d="m402.605469 255.601562h-119.355469v-119.355468c0-6.890625-5.582031-12.472656-12.472656-12.472656-6.886719 0-12.472656 5.582031-12.472656 12.472656v119.355468h-125.46875c-6.890626 0-12.472657 5.585938-12.472657 12.472657 0 6.890625 5.582031 12.472656 12.472657 12.472656h125.59375v125.59375c0 6.886719 5.585937 12.472656 12.46875 12.472656 6.890624 0 12.472656-5.585937 12.472656-12.472656v-125.59375h119.363281c6.882813-.035156 12.441406-5.648437 12.40625-12.535156-.03125-6.882813-5.644531-12.441407-12.535156-12.410157zm0 0" />
							<path d="m268.15625-.0742188c-108.457031-.0195312-206.242188 65.3085938-247.746094 165.5117188-41.496094 100.207031-18.542968 215.542969 58.171875 292.210938 104.703125 104.703124 274.453125 104.703124 379.152344 0 104.699219-104.695313 104.699219-274.445313 0-379.148438-50.167969-50.453125-118.429687-78.746094-189.578125-78.5742188zm0 511.3554688c-134.074219 0-243.203125-109.132812-243.203125-243.207031s109.128906-243.203125 243.203125-243.203125 243.207031 109.128906 243.207031 243.203125-109.132812 243.207031-243.207031 243.207031zm0 0" />
						</svg>
					</div>
					<div
						className="nav-icon-container"
						id="notifications-button"
						onClick={() => {
							toggleNotificationMenu();
						}}
					>
						<svg
							id="Layer_2"
							className="right-nav-icon"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g>
								<path d="m11 24c-1.93 0-3.5-1.57-3.5-3.5 0-.276.224-.5.5-.5s.5.224.5.5c0 1.378 1.121 2.5 2.5 2.5s2.5-1.122 2.5-2.5c0-.276.224-.5.5-.5s.5.224.5.5c0 1.93-1.57 3.5-3.5 3.5z" />
							</g>
							<g>
								<path d="m19.5 21h-17c-.827 0-1.5-.673-1.5-1.5 0-.439.191-.854.524-1.14.021-.018.044-.034.067-.048 1.532-1.33 2.409-3.248 2.409-5.272v-3.04c0-3.86 3.141-7 7-7 .08 0 .177.003.257.019.271.053.447.316.394.587-.052.271-.316.447-.588.394-3.372 0-6.063 2.692-6.063 6v3.04c0 2.343-1.026 4.559-2.815 6.081-.016.013-.032.026-.05.037-.086.092-.135.214-.135.342 0 .276.225.5.5.5h17c.275 0 .5-.224.5-.5 0-.128-.049-.251-.137-.343-.017-.011-.032-.023-.048-.036-1.789-1.522-2.815-3.738-2.815-6.081v-1.07c0-.276.224-.5.5-.5s.5.224.5.5v1.07c0 2.026.878 3.944 2.411 5.274.023.014.045.029.064.046.334.286.525.701.525 1.14 0 .827-.673 1.5-1.5 1.5z" />
							</g>
							<g>
								<path d="m18 10c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-9c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z" />
							</g>
						</svg>
					</div>
					<NotificationMenu />
				</div>
				<div className="profile-settings-container">
					<Dropdown isOpen={dropdownOpen} toggle={openDropdown}>
						<DropdownToggle className="user-config profile-image-container">
							<img className="profile-image-btn" src={ProfilePhoto} alt="profile_image" />
						</DropdownToggle>

						<DropdownMenu className="user-config-menu">
							<DropdownItem header>
								<p className="user-config-menu-name">Agustin Rezett</p>
							</DropdownItem>
							<DropdownItem>Perfil</DropdownItem>
							<DropdownItem>Configuración</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>
								<div className="log-out-container">
									<span>Cerrar Sesión</span>
									<img className="log-out-icon" src={LogOutIcon} alt="img"></img>
								</div>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		</nav>
	);
}
