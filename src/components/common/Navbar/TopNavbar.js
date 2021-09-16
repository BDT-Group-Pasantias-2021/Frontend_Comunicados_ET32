import React from 'react';

// Components
import MenuIcon from '../../../assets/svgs/menu.svg';
import HomeIcon from '../../../assets/svgs/home.svg';
import LupaIcon from '../../../assets/svgs/lupa.svg';
import AddIcon from '../../../assets/svgs/add.svg';
import ProfilePhoto from '../../../assets/svgs/unnamed.jpg';
import NotificationIcon from '../../../assets/svgs/notification.svg';

// Styles
import '../../../css/top_navbar.css';

export default function TopNavbar() {
	return (
		<nav id="top-navbar">
			<div className="left-nav">
				<img src={MenuIcon} alt="menu-icon" />
				<img src={HomeIcon} alt="home-icon" />
				<form className="navbar-searchbar">
					<input type="text" name="search-value" />
					<img src={LupaIcon} alt="lupa-icon" />
				</form>
			</div>
			<div className="right-nav">
				<div className="icons-container">
					<img className="right-nav-icon" src={AddIcon} alt="add-icon" />
					<img className="right-nav-icon" src={NotificationIcon} alt="notification-icon" />
				</div>
				<div className="profile-settings-container">
					<img className="profile-image-btn" src={ProfilePhoto} alt="profile_image" />
				</div>
			</div>
		</nav>
	);
}
