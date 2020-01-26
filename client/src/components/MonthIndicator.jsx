import React from 'react';

class MonthIndicator extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            // month: 'Febuary',
            // year: 2019
            month: this.props.month,
            year: this.props.year 
        };
    }
    
    render() {
        // console.log('m', this.state.month);
        // console.log('y', this.state.year);
        //let dateTime= `${this.state.year}-0${this.state.month}`;
        //console.log(dateTime);

       return (
        <div>
            <div className="month-indicator">
                <time> 
                    {this.state.month} {this.state.year} 
                </time>
            </div>
        </div>
        );
    }
}

export default MonthIndicator;


