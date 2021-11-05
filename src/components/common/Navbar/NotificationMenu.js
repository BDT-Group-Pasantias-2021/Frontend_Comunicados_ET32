import React, { useEffect, useState } from 'react';

// Hooks

// Components

// Styles

export default function NotificationMenu({ toggleFunction }) {
	const [typeNotificationMenu, setTypeNotificationMenu] = useState(0);

	useEffect(() => {
		const pendingBtn = document.getElementById('pending-btn');
		const signedBtn = document.getElementById('signed-btn');

		if (typeNotificationMenu === 0) {
			signedBtn.classList.remove('function-active');
			pendingBtn.classList.add('function-active');
		} else if (typeNotificationMenu === 1) {
			pendingBtn.classList.remove('function-active');
			signedBtn.classList.add('function-active');
		}

		window.addEventListener('click', function (e) {
			const notificationMenu = document.getElementById('notification-menu');
			const notificationButton = document.getElementById('notifications-button');
			if(notificationMenu){
				if (!notificationMenu.contains(e.target)) {
					if(notificationButton){
						if (!notificationButton.contains(e.target)) {
							toggleFunction(2);
						}
					}
				
				}
			}	
		});
		return () => {
			window.removeEventListener('click', function (e) {
				const notificationMenu = document.getElementById('notification-menu');
				const notificationButton = document.getElementById('notifications-button');
				if(notificationMenu){
					if (!notificationMenu.contains(e.target)) {
						if(notificationButton){
							if (!notificationButton.contains(e.target)) {
								toggleFunction(2);
							}
						}
					
					}
				}
			});
		};
	}, [toggleFunction, typeNotificationMenu]);

	return (
		<div className="notification-menu-container" id="notification-menu">
			<div className="principal-notification-container">
				<div className="menu-options">
					<p
						className="notification-view-btn"
						id="pending-btn"
						onClick={() => {
							setTypeNotificationMenu(0);
						}}
					>
						Pendientes
					</p>
					<div className="menu-options-divisor">|</div>
					<p
						className="notification-view-btn"
						id="signed-btn"
						onClick={() => {
							setTypeNotificationMenu(1);
						}}
					>
						Firmadas
					</p>
				</div>
			</div>
		</div>
	);
}
