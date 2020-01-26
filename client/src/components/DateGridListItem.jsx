import React from 'react';

class DateGridListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: this.props.day,
            month: this.props.monthYear.month,
            year: this.props.monthYear.year,

            firstSelectedDate: ''
        };

        this.clickHandler = this.clickHandler.bind(this);
        this.firstGridColumn = this.firstGridColumn.bind(this);
    }

    prependZero(number) { 
        if (number < 10) 
            return "0" + number; 
        else 
            return number.toString(); 
    }

    clickHandler(event) {
        console.log(event.target.dateTime);
        // need to save this later.
    }

    firstGridColumn(day) {
        if(day === 1){
            return new Date(this.state.year, this.state.month-1, this.state.day).getDay() + 1;
        }
        return null;
    } 

    render() {
        let month = this.prependZero(this.state.month);
        let day = this.prependZero(this.state.day);
        let dateTime = `${this.state.year}-${month}-${day}`;

        let gridColumnValue = this.firstGridColumn(this.state.day);
        return (
            <button 
                onClick={this.clickHandler} 
                style={{"gridColumn": gridColumnValue}}>
                    <time dateTime={dateTime}>{this.state.day}</time>
            </button>
        );
    }
}

export default DateGridListItem;