import React from 'react';
import DateGridListItem from './DateGridListItem.jsx'

var DateGridList = (props) => {

    // props.array= [7,8,9,...23]
    //hoverHighlight={true}
    console.log(props.listOfColorDates);
    var hoverDates = props.listOfColorDates;


    return (
        <div className="date-grid">
            {props.days.map((number) => {

                // console.log('hoverDates in list', hoverDates);
                // console.log('number', number);

                var hoverColor = hoverDates.indexOf(number) !== -1;
                // console.log(number);
                // console.log(hoverColor);
                
                return (<DateGridListItem
                    key={number.toString()}
                    day={number}
                    hoverColor={hoverColor}
                    monthYear={props.monthYear}
                    updateStartEndDate={props.updateStartEndDate}
                    mouseEnter={props.mouseEnter}
                    lastFillDate={props.lastFillDate}/>)
            })}
        </div>
    );
}

export default DateGridList;
