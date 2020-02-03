import React from 'react';
import DateGridListItem from './DateGridListItem.jsx'

var DateGridList = (props) => {

    // props.array= [7,8,9,...23]
    //hoverHighlight={true}
    //console.log(props.listOfColorDates);
    var hoverDates = props.listOfColorDates;


    return (
        <div className="date-grid">
            {props.days.map((number) => {

                // console.log('hoverDates in list', hoverDates);
                // console.log('number', number);

                // props.avalibility[number]

                var startingDay, endingDay;
                if(props.monthYear.startDate) {
                    var start_Day = props.monthYear.startDate.slice(-2);
                    //console.log('hi', start_Day);
                    startingDay = Number(start_Day) === number;
                }

                if(props.monthYear.endDate) {
                    var end_Day = props.monthYear.endDate.slice(-2);
                    endingDay = Number(end_Day) === number;
                }

                var start_end = {
                    startingDay: startingDay,
                    endingDay: endingDay
                }

                var existBothStartEnd = props.monthYear.startDate && props.monthYear.endDate;

                var hoverColor = hoverDates.indexOf(number) !== -1;
                
                return (<DateGridListItem
                    key={number.toString()}
                    day={number}

                    // if day is avalible
                    avalibility={props.avalibility[number]}

                    // tells if we should color the day
                    hoverColor={hoverColor}

                    

                    start_end={start_end}
                    existBothStartEnd={existBothStartEnd}

                    monthYear={props.monthYear}

                    // functions
                    updateStartEndDate={props.updateStartEndDate}
                    mouseEnter={props.mouseEnter} />)

                    //lastFillDate={props.lastFillDate}/>)
            })}
        </div>
    );
}

export default DateGridList;
