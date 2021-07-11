

export default class Filters {
    constructor(showAll, showActive, showCompleted){
        this.showAll = showAll;
        this.showActive = showActive;
        this.showCompleted = showCompleted;
        this.showAllBtn = document.querySelector('.filter__all');
        this.showActiveBtn = document.querySelector('.filter__active');
        this.showCompletedBtn = document.querySelector('.filter__completed');
    }

    whatFilter() {
        if (this.crnFilter === 'all') this._showAll();
        if (this.crnFilter === 'active') this._showActive();
        if (this.crnFilter === 'complete') this._showCompleted();
    }

    _showAll() {
        this.showAll();
        this.crnFilter = "all";
        this.showAllBtn.className = 'filter__all button current_filter';
        this.showActiveBtn.className = 'filter__active button';
        this.showCompletedBtn.className = 'filter__completed button';
    }

    _showActive() {
        this._showAll();
        this.showActive();
        this.crnFilter = "active";
        this.showAllBtn.className = 'filter__all button';
        this.showActiveBtn.className = 'filter__active button current_filter';
        this.showCompletedBtn.className = 'filter__completed button';
    }
    
    _showCompleted() {
        this._showAll();
        this.showCompleted();
        this.crnFilter = "complete";
        this.showAllBtn.className = 'filter__all button';
        this.showActiveBtn.className = 'filter__active button';
        this.showCompletedBtn.className = 'filter__completed button current_filter';
    }
}