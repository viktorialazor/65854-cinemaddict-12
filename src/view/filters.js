import AbstractView from "./abstract.js";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  const getFilterName = (nameFilter) => {
    let filterName = ``;

    switch (nameFilter) {
      case `All`:
        filterName = `All movies`;
        break;
      case `Watchlist`:
        filterName = `Watchlist`;
        break;
      case `History`:
        filterName = `History`;
        break;
      case `Favorites`:
        filterName = `Favorites`;
        break;
    }

    return filterName;
  };

  const filterName = getFilterName(name);

  const getFilterCount = (nameFilter, countFilter) => {
    if (nameFilter === `All` || countFilter > 5) {
      return ``;
    } else {
      return `<span class="main-navigation__item-count">${count}</span>`;
    }
  };

  const filterCount = getFilterCount(name, count);

  return `<a href="#all" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}" data-filter-type="${type}">${filterName} ${filterCount}</a>`;
};

export const createFiltersTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenuView extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}