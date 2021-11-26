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

export default function CategoryTag({ categoria, tipo, selectedTags, setSelectedTags }) {
	const normalBackgroundStyle = () => {
		const categoryTagsList = document.querySelectorAll(`.comunicado-category-id${categoria.id_etiqueta}`);
		categoryTagsList.forEach((element) => {
			element.style.backgroundColor = categoria.color;
		});
	};

	const hoverBackgroundStyle = () => {
		const categoryTagsList = document.querySelectorAll(`.comunicado-category-id${categoria.id_etiqueta}`);
		categoryTagsList.forEach((element) => {
			element.style.backgroundColor = darkenColor(categoria.color, -20);
		});
	};

	const activeCategory = () => {
		const categoryTagsList = document.querySelectorAll(`.comunicado-category-id${categoria.id_etiqueta}`);
		categoryTagsList.forEach((element) => {
			element.classList.toggle('comunicado-category-insert-disabled');
		});
		//? Verify if the category is already selected
		if (selectedTags.includes(categoria.id_etiqueta)) {
			//* Remove the category from the selected tags
			setSelectedTags(selectedTags.filter((tag) => tag !== categoria.id_etiqueta));
		} else {
			//* Add the category to the selected tags
			setSelectedTags([...selectedTags, categoria.id_etiqueta]);
		}
	};

	return (
		<div
			className={`comunicado-category comunicado-category-insert comunicado-category-id${categoria.id_etiqueta} ${tipo === 'modalInsert' && 'comunicado-category-insert-disabled'
				}`}

			onClick={() => tipo === 'modalInsert' && activeCategory(categoria.id_etiqueta)}
			onMouseEnter={() => hoverBackgroundStyle()}
			onMouseLeave={() => normalBackgroundStyle()}
			style={{ backgroundColor: categoria.color }}
			title={categoria.nombre}
		>
			{tipo === 'card' ? null : tipo === 'modalInsert' ? (
				<div className="tag-category tag-insert">{categoria.etiqueta}</div>
			) : (
				<div className="tag-category">{categoria.etiqueta}</div>
			)}
		</div>
	);
}
