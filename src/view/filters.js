import {FilterName} from "../const.js";
import AbstractView from "./abstract.js";

const createFilterItemTemplate = (filter, currentFilterType, stats) => {
  const {type, name, count} = filter;

  const getFilterName = (nameFilter) => {
    let filterName = ``;

    switch (nameFilter) {
      case `All`:
        filterName = FilterName.ALL_MOVIES;
        break;
      case `Watchlist`:
        filterName = FilterName.WATCHLIST;
        break;
      case `History`:
        filterName = FilterName.HISTORY;
        break;
      case `Favorites`:
        filterName = FilterName.FAVORITES;
        break;
    }

    return filterName;
  };

  const filterName = getFilterName(name);

  const getFilterCount = (nameFilter, countFilter) => {
    return nameFilter === `All` ? `` : `<span class="main-navigation__item-count">${count}</span>`;
  };

  const filterCount = getFilterCount(name, count);

  return `<a href="#all" class="main-navigation__item ${type === currentFilterType && !stats ? `main-navigation__item--active` : ``}" data-filter-type="${type}">${filterName} ${filterCount}</a>`;
};

export const createFiltersTemplate = (filterItems, currentFilterType, stats) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType, stats))
    .join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional ${stats ? `main-navigation__additional--active` : ``}" data-stats="STATS">Stats</a>
    </nav>`
  );
};

export default class SiteMenuView extends AbstractView {
  constructor(filters, currentFilterType, stats) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._stats = stats;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statsClickHandler = this._statsClickHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilter, this._stats);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    if (evt.target.dataset.filterType) {
      evt.preventDefault();
      this._callback.filterTypeChange(evt.target.dataset.filterType);
    }
  }

  _statsClickHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    if (evt.target.dataset.stats) {
      evt.preventDefault();
      this._callback.statsClick(evt.target.dataset.stats);
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getElement().addEventListener(`click`, this._statsClickHandler);
  }
}
