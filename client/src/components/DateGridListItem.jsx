import React from 'react';

class DateGridListItem extends React.Component {
    constructor(props) {
        super(props);

        console.log('color', this.props.hoverColor);

        this.state = {
            day: this.props.day,
            month: this.props.monthYear.month,
            year: this.props.monthYear.year,

            colorButtonDarkGreen: false,
            hoverColor: false
            //firstSelectedDate: ''
        };

        this.clickHandler = this.clickHandler.bind(this);
        this.firstGridColumn = this.firstGridColumn.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.hoverOver = this.hoverOver.bind(this);
        //this.hoverColor = this.hoverColor.bind(this);
    }

    

    prependZero(number) { 
        if (number < 10) 
            return "0" + number; 
        else 
            return number.toString(); 
    }

    hoverOver(dateTime) {
        // send just the hover item back ??
        this.props.mouseEnter(dateTime);
    }

    // hoverColor(hover) {
    //     if(hover) {
    //         this.setState({
    //             hoverColor: true
    //         })
    //     }
    // }

    clickHandler(dateTime) {
        //console.log('event', event.target);
        console.log('ListItem', dateTime);
        this.props.updateStartEndDate(dateTime);

        this.changeColor();
        //console.log(event.target.dateTime);
        // need to save this later.
    }

    changeColor() {
        this.setState({
            colorButtonDarkGreen: true
        })
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
        //this.hoverColor(this.props.hoverColor);


        
        
        let style = {};
        style['gridColumn'] = this.firstGridColumn(this.state.day);
        if(this.state.colorButtonDarkGreen){
            style['backgroundColor'] = '#019C8E';
            style['color'] = 'white';
        }

        //console.log(this.state.)
        if(!this.state.colorButtonDarkGreen && this.props.hoverColor){
            style['backgroundColor'] = '#A3F0EA';
            style['color'] = 'white'; 
        }

        return (
            // note come back to dateTime and ask a TA
            <button 
                style={style}
                onMouseEnter={() => {this.hoverOver(dateTime)}}
                onClick={() => {this.clickHandler(dateTime)}}>
                    <time dateTime={dateTime}>{this.state.day}</time>
            </button>
        );
    }
}

export default DateGridListItem;