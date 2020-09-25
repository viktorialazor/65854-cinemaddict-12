import {FilterStatisticType} from "../const.js";
import {getFilmsDuration, getTopGenre, getGenresList} from "../utils/statistic.js";
import SmartView from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderStatsChart = (statisticCtx, cards) => {
  const genresList = getGenresList(cards);
  const genres = genresList.genres;
  const quantity = genresList.quantity;

  const BAR_HEIGHT = 50;

  statisticCtx.height = BAR_HEIGHT * genres.length;

  const myChart = new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: quantity,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });

  return myChart;
};

const createStatisticsTemplate = (cards, type) => {
  const filmsQuantity = cards.length;
  const duration = getFilmsDuration(cards);
  const hours = duration.hours;
  const minutes = duration.minutes;
  const topGanre = getTopGenre(cards);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${type === FilterStatisticType.ALL ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${type === FilterStatisticType.TODAY ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${type === FilterStatisticType.WEEK ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${type === FilterStatisticType.MONTH ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${type === FilterStatisticType.YEAR ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${filmsQuantity} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGanre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class Statistics extends SmartView {
  constructor(cards, type) {
    super();
    this._cards = cards;
    this._type = type;
    this._statsChart = null;

    this._setCharts();

    this._statisticFiltersChangeHandlers = this._statisticFiltersChangeHandlers.bind(this);
  }

  removeElement() {
    super.removeElement();

    if (this._statsChart !== null) {
      this._statsChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._cards, this._type);
  }

  restoreHandlers() {
    this._statisticFiltersChangeHandlers();
    this._setCharts();
  }

  _statisticFiltersChangeHandlers(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    this._callback.statisticFiltersChange(evt.target.value);
  }

  _setCharts() {
    if (this._statsChart !== null) {
      this._statsChart = null;
    }

    const statsChart = this.getElement().querySelector(`.statistic__chart`);

    this._statsChart = renderStatsChart(statsChart, this._cards);
  }

  setStatisticChangeHandler(callback) {
    this._callback.statisticFiltersChange = callback;
    this.getElement().addEventListener(`click`, this._statisticFiltersChangeHandlers);
  }
}
