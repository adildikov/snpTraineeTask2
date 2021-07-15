

export default class Filters {
    constructor(showAllTDL, showActiveTDL, showCompletedTDL){
        this.showAll = showAllTDL;
        this.showActive = showActiveTDL;
        this.showCompleted = showCompletedTDL;
    }

    _showAll = () => {
        this.showAll();
        this.showAllBtn.className = 'filter__all button current_filter';
        this.showActiveBtn.className = 'filter__active button';
        this.showCompletedBtn.className = 'filter__completed button';
    }

    _showActive = () => {
        this.showAll();
        this.showActive();
        this.showAllBtn.className = 'filter__all button';
        this.showActiveBtn.className = 'filter__active button current_filter';
        this.showCompletedBtn.className = 'filter__completed button';
    }
    
    _showCompleted = () => {
        this.showAll();
        this.showCompleted();
        this.showAllBtn.className = 'filter__all button';
        this.showActiveBtn.className = 'filter__active button';
        this.showCompletedBtn.className = 'filter__completed button current_filter';
    }

    _setEventListeners() {
        this.showAllBtn.addEventListener('click', this._showAll);
        this.showActiveBtn.addEventListener('click', this._showActive);
        this.showCompletedBtn.addEventListener('click', this._showCompleted);
    }

    getFilters() {
        this.showAllBtn = document.querySelector('.filter__all');
        this.showActiveBtn = document.querySelector('.filter__active');
        this.showCompletedBtn = document.querySelector('.filter__completed');
        this._setEventListeners();
        return(this)
    }
}