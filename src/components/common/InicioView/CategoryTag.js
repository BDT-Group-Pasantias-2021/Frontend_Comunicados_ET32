import React from 'react';

// Components
function darkenColor(col, amt) {
	var usePound = false;
	if (col[0] === '#') {
		col = col.slice(1);
		usePound = true;
	}
	var num = parseInt(col, 16);
	var r = (num >> 16) + amt;
	if (r > 255) r = 255;
	else if (r < 0) r = 0;
	var b = ((num >> 8) & 0x00ff) + amt;
	if (b > 255) b = 255;
	else if (b < 0) b = 0;
	var g = (num & 0x0000ff) + amt;
	if (g > 255) g = 255;
	else if (g < 0) g = 0;

	return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export default function CategoryTag({ categoria }) {
	const normalBackgroundStyle = () => {
		const categoryTagsList = document.querySelectorAll(`.comunicado-category-id${categoria.id_categoria}`);
		categoryTagsList.forEach((element) => {
			element.style.backgroundColor = categoria.color;
		});
	};

	const hoverBackgroundStyle = () => {
		const categoryTagsList = document.querySelectorAll(`.comunicado-category-id${categoria.id_categoria}`);
		categoryTagsList.forEach((element) => {
			element.style.backgroundColor = darkenColor(categoria.color, -20);
		});
	};

	return (
		<div
			className={`comunicado-category comunicado-category-id${categoria.id_categoria}`}
			style={{ backgroundColor: categoria.color }}
			onMouseEnter={() => hoverBackgroundStyle()}
			onMouseLeave={() => normalBackgroundStyle()}
			title={categoria.nombre}
		></div>
	);
}
