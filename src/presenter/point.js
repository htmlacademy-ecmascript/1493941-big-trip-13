import TripPointView from "../view/trip-point";
import PointEditFormView from "../view/edit-form";
import SorterView from "../view/sorter.js";
import TripListView from "../view/trip-list.js";
import NoPointsView from "../view/no-points";
import {render, RenderPosition, replace} from "../utils/render";

export default class Points {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripListComponent = new TripListView();
    this._sortComponent = new SorterView();
    this._noPointsComponent = new NoPointsView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    this._renderTripList(this._tripPoints);
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderTripList(tripPoints) {
    if (tripPoints.length) {
      this._renderSort();
      render(this._tripContainer, this._tripListComponent, RenderPosition.BEFOREEND);
    } else {
      render(this._tripContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
    }
    this._renderTripPoints(tripPoints);
  }

  _renderTripPoint(tripListElement, tripPoint) {
    const tripPointComponent = new TripPointView(tripPoint);
    const tripPointEditComponent = new PointEditFormView(tripPoint);

    const replaceTripPointToEditForm = () => {
      replace(tripPointEditComponent, tripPointComponent);
    };

    const replaceEditFormToTripPoint = () => {
      replace(tripPointComponent, tripPointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceEditFormToTripPoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    tripPointComponent.setEditClickHandler(() => {
      replaceTripPointToEditForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    tripPointEditComponent.setCloseClickHandler(() => {
      replaceEditFormToTripPoint();
    });

    tripPointEditComponent.setSubmitHandler(() => {
      replaceEditFormToTripPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(tripListElement, tripPointComponent, RenderPosition.BEFOREEND);
  }

  _renderTripPoints(tripPoints) {
    const tripPointsList = document.querySelector(`.trip-events__list`);
    for (let i = 0; i < tripPoints.length; i++) {
      this._renderTripPoint(tripPointsList, tripPoints[i]);
    }
  }
}
