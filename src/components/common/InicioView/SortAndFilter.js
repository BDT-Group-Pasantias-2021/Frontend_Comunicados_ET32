import React, { useEffect, useState } from 'react';

// Hooks

//Components

export default function SortAndFilter({ filterComunicadosByDate, filterComunicadosByTag, cleanFilters, filterComunicadosByEmisor, orderComunicadosAsc, orderComunicadosDesc }) {
	const [filterType, setFilterType] = useState('hidden');
	const [orderState, setOrderState] = useState('desc');

	const toggleFilterMenu = (action = 0) => {
		const filterMenu = document.getElementById('filterMenu');
		if (action === 0) {
			if (!filterMenu.style.maxWidth) {
				filterMenu.style.maxWidth = '100%';
			} else {
				filterMenu.style.maxWidth = null;
			}
		} else if (action === 1) {
			filterMenu.style.maxWidth = '100%';
		} else if (action === 2) {
			filterMenu.style.maxWidth = null;
		}
	};

	const toggleOrder = () => {
		if (orderState === 'desc') {
			orderComunicadosDesc();
			setOrderState('asc');
		} else if (orderState === 'asc') {
			orderComunicadosAsc();
			setOrderState('desc');
		}
	};

	useEffect(() => {
		if (filterType) {
			switch (filterType) {
				case 'hidden':
					document.getElementById('filter-option-clean').classList.add('active-filter');
					document.getElementById('filter-option-date').classList.remove('active-filter');
					document.getElementById('filter-option-category').classList.remove('active-filter');
					document.getElementById('filter-option-emisor').classList.remove('active-filter');
					break;
				case 'date':
					document.getElementById('filter-option-clean').classList.remove('active-filter');
					document.getElementById('filter-option-date').classList.add('active-filter');
					document.getElementById('filter-option-category').classList.remove('active-filter');
					document.getElementById('filter-option-emisor').classList.remove('active-filter');
					break;
				case 'number':
					document.getElementById('filter-option-clean').classList.remove('active-filter');
					document.getElementById('filter-option-date').classList.remove('active-filter');
					document.getElementById('filter-option-category').classList.add('active-filter');
					document.getElementById('filter-option-emisor').classList.remove('active-filter');
					break;
				case 'text':
					document.getElementById('filter-option-clean').classList.remove('active-filter');
					document.getElementById('filter-option-date').classList.remove('active-filter');
					document.getElementById('filter-option-category').classList.remove('active-filter');
					document.getElementById('filter-option-emisor').classList.add('active-filter');
					break;
				default:
					break;
			}
		}
	}, [filterType])

	return (

		<div className="filter-bar-container col-11 col-sm-12 col-md-10">
			<div className="standard-icon-container standard-icon-container-margin" onClick={() => toggleOrder()}>
				<svg
					className="standard-icon standard-icon-margin"
					enableBackground="new 0 0 64 64"
					viewBox="0 0 64 64"
				>
					<path d="m31.414 15.586-7-7c-.78-.781-2.048-.781-2.828 0l-7 7c-.781.781-.781 2.047 0 2.828.78.781 2.048.781 2.828 0l3.586-3.586v39.172c0 1.104.896 2 2 2s2-.896 2-2v-39.172l3.586 3.586c.39.391.902.586 1.414.586s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828z" />
					<path d="m49.414 45.586c-.781-.781-2.047-.781-2.828 0l-3.586 3.586v-39.172c0-1.104-.896-2-2-2s-2 .896-2 2v39.172l-3.586-3.586c-.781-.781-2.048-.781-2.828 0-.781.781-.781 2.047 0 2.828l7 7c.391.391.902.586 1.414.586s1.023-.195 1.414-.586l7-7c.781-.781.781-2.047 0-2.828z" />
				</svg>
				<p className="standard-icon-label">Ordenar</p>
			</div>
			<div className="filter-menu-container" id="filterMenu">
				<div className="filter-option-btn" id="filter-option-clean" onClick={() => { setFilterType('hidden'); cleanFilters() }}>
					Mostrar todo
				</div>
				<div className="filter-option-btn" id="filter-option-date" onClick={() => setFilterType('date')}>
					Fecha
				</div>
				<div className="filter-option-btn" id="filter-option-category" onClick={() => setFilterType('number')}>
					Categoría
				</div>
				<div className="filter-option-btn" id="filter-option-emisor" onClick={() => setFilterType('text')}>
					Emisor
				</div>

				{filterType &&
					<div className="filter-option-input">
						<input
							type={filterType}
							id="input-filter"
							onInput={(event) => {
								filterType === 'date' && filterComunicadosByDate(event.target.value);
								filterType === 'number' && filterComunicadosByTag(event.target.value);
								filterType === 'text' && filterComunicadosByEmisor(event.target.value);
							}}
						/>
					</div>
				}
			</div>
			<div className="standard-icon-container standard-icon-container-margin filter-btn-toggler">
				<span className="filter-btn-content" onClick={() => {
					toggleFilterMenu();
				}}>
					<svg className="standard-icon standard-icon-margin filter-bar" viewBox="0 0 512 512">
						<path d="m208 512c-2.582031 0-5.183594-.617188-7.550781-1.898438-5.207031-2.773437-8.449219-8.214843-8.449219-14.101562v-205.226562c0-7.464844-3.136719-14.636719-8.640625-19.667969l-171.261719-156.867188c-7.703125-7.082031-12.097656-17.109375-12.097656-27.519531v-49.386719c0-20.585937 16.746094-37.332031 37.332031-37.332031h437.335938c20.585937 0 37.332031 16.746094 37.332031 37.332031v49.386719c0 10.410156-4.394531 20.4375-12.074219 27.519531l-171.242187 156.886719c-5.546875 5.011719-8.683594 12.183594-8.683594 19.648438v129.792968c0 12.5-6.207031 24.125-16.617188 31.058594l-86.507812 57.664062c-2.667969 1.816407-5.761719 2.710938-8.875 2.710938zm-170.667969-480c-2.941406 0-5.332031 2.390625-5.332031 5.332031v49.386719c0 1.496094.640625 2.925781 1.75 3.949219l171.199219 156.839843c12.097656 11.09375 19.050781 26.859376 19.050781 43.265626v175.316406l61.632812-41.085938c1.472657-.984375 2.367188-2.648437 2.367188-4.4375v-129.792968c0-16.425782 6.933594-32.191407 19.070312-43.265626l171.203126-156.863281c1.085937-1 1.726562-2.429687 1.726562-3.925781v-49.386719c0-2.941406-2.390625-5.332031-5.332031-5.332031zm0 0" />
					</svg>
					<p className="standard-icon-label">Filtrar</p>
				</span>
			</div>
		</div>
	);
}
