import React from 'react';
import Inicio from '../../views/Inicio';
// Hooks

//Components

export default function SortAndFilter({selectFiltro,getComunicados}) {
	
	return (
		<div className="filter-bar-container col-11 col-sm-12 col-md-10">
			<div className="standard-icon-container standard-icon-container-margin">
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
			<div className="standard-icon-container standard-icon-container-margin">
				<svg
					className="standard-icon standard-icon-margin filter-bar"
					viewBox="0 0 512 512"
					
				>
					<path d="m208 512c-2.582031 0-5.183594-.617188-7.550781-1.898438-5.207031-2.773437-8.449219-8.214843-8.449219-14.101562v-205.226562c0-7.464844-3.136719-14.636719-8.640625-19.667969l-171.261719-156.867188c-7.703125-7.082031-12.097656-17.109375-12.097656-27.519531v-49.386719c0-20.585937 16.746094-37.332031 37.332031-37.332031h437.335938c20.585937 0 37.332031 16.746094 37.332031 37.332031v49.386719c0 10.410156-4.394531 20.4375-12.074219 27.519531l-171.242187 156.886719c-5.546875 5.011719-8.683594 12.183594-8.683594 19.648438v129.792968c0 12.5-6.207031 24.125-16.617188 31.058594l-86.507812 57.664062c-2.667969 1.816407-5.761719 2.710938-8.875 2.710938zm-170.667969-480c-2.941406 0-5.332031 2.390625-5.332031 5.332031v49.386719c0 1.496094.640625 2.925781 1.75 3.949219l171.199219 156.839843c12.097656 11.09375 19.050781 26.859376 19.050781 43.265626v175.316406l61.632812-41.085938c1.472657-.984375 2.367188-2.648437 2.367188-4.4375v-129.792968c0-16.425782 6.933594-32.191407 19.070312-43.265626l171.203126-156.863281c1.085937-1 1.726562-2.429687 1.726562-3.925781v-49.386719c0-2.941406-2.390625-5.332031-5.332031-5.332031zm0 0" />
				</svg>
				<select
				onChange={() => {selectFiltro()}}
				name="select-comunicado" id="select-comunicados">
					<option value="Filtrar"> Filtrar por: </option>
					<option value="todo"> Mostrar todo </option>
					<option value="fecha"> fecha </option>
					<option value="idCategoria"> Categoria </option>
					<option value="receptor"> receptor </option>
					<option value="titulo"> titulo </option>
	
				</select>
				<input type="text"></input>
			</div>
		</div>
	);
}
