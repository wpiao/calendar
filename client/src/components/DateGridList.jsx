import React from 'react';
import DateGridListItem from './DateGridListItem.jsx'

var DateGridList = (props) => {

    return (
        <div className="date-grid">
            {props.days.map((number) =>
                <DateGridListItem
                    key={number.toString()}
                    day={number} 
                    monthYear={props.monthYear}
                    />
                // console.log(number)
            )}
        </div>
    );
}

export default DateGridList;
