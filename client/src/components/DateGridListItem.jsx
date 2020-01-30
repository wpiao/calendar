import React from 'react';

class DateGridListItem extends React.Component {
    constructor(props) {
        super(props);

        console.log('color', this.props.hoverColor);

        this.state = {
            // day: this.props.day,
            // month: this.props.monthYear.month,
            // year: this.props.monthYear.year,

            // colorButtonDarkGreen: false,
            // hoverColor: false
        };

        this.clickHandler = this.clickHandler.bind(this);
        this.firstGridColumn = this.firstGridColumn.bind(this);
        //this.changeColor = this.changeColor.bind(this);
        this.hoverOver = this.hoverOver.bind(this);
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

    clickHandler(dateTime) {
        console.log('ListItem', dateTime);
        this.props.updateStartEndDate(dateTime);

        //this.changeColor();
        //console.log(event.target.dateTime);
        // need to save this later.
    }

    // changeColor() {
    //     this.setState({
    //         colorButtonDarkGreen: true
    //     })
    // }

    firstGridColumn(day) {
        if(day === 1){
            return new Date(this.props.monthYear.year, this.props.monthYear.month-1, this.props.day).getDay() + 1;
        }
        return null;
    } 


    //D8D8D8
    render() {
        let month = this.prependZero(this.props.monthYear.month);
        let day = this.prependZero(this.props.day);
        let dateTime = `${this.props.monthYear.year}-${month}-${day}`;
        //this.hoverColor(this.props.hoverColor);

        let style = {};
        style['gridColumn'] = this.firstGridColumn(this.props.day);
        if(this.props.start_end.startingDay){
            style['backgroundColor'] = '#00A699';
            style['color'] = 'white';
        }

        // hovering
        // !this.props.start_end.startingDay && 
        if(this.props.hoverColor){
            style['backgroundColor'] = '#A3F0EA';
            style['border'] = 'solid #80E8E0 0.3px';
            //style['border-color'] = 'black'
            style['color'] = 'white'; 
        }
        
        //!this.props.start_end.startingDay && 
        if(this.props.hoverColor && this.props.existBothStartEnd){
            style['backgroundColor'] = '#00A699';
            style['border'] = '0';
            style['color'] = 'white';
        }

        if(!this.props.avalibility){
            style['color'] = '#D8D8D8';
            style['textDecoration'] = 'line-through';
        }

        return (
            // note come back to dateTime and ask a TA
            <button 
                style={style}
                onMouseEnter={() => {this.hoverOver(dateTime)}}
                onClick={() => {this.clickHandler(dateTime)}}>
                    <time dateTime={dateTime}>{this.props.day}</time>
            </button>
        );
    }
}

export default DateGridListItem;