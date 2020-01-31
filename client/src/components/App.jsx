import React, { Component } from 'react';
import MonthIndicator from './MonthIndicator.jsx';
import DayOfWeek from './DayOfWeek.jsx';
import DateGridList from './DateGridList.jsx';
import ClearDate  from './ClearDate.jsx';
import CheckInOut from './CheckInOut.jsx';
import PricePerNight from './PricePerNight.jsx';

class App extends Component {
  constructor(props) {
    super(props);
   
    var date = new Date();
    var monthNumber = date.getMonth() + 1
    var month = this.monthConversion(date.getMonth());
    var year = date.getFullYear();

    this.state = {
        monthNumber: monthNumber, // 1-12
        month: month, // full string name
        year: year,
        days: this.daysArray(1, this.getDaysInMonth(monthNumber, year)), // array of days in current month

        // hover/start/end date represented in [year-month-day] "2020-01-22"
        hoverDate: '',
        startDate: '',
        endDate: '',

        // secondary start/end date
        secondaryStartDate: '',
        secondaryEndDate: '',

        // a dates of days that are avalible and not avalible in a given month
        // ex: [{1: T}, {2: F}, ... {31: T}]
        avalibility: []

    };

    this.buttonCLick = this.buttonCLick.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.updateDateMonth = this.updateDateMonth.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount() {
    let unavaliable_Dates = ['01/04/2020', '01/05/2020', '01/12/2020'];

    let unavalible_Days = [];
    unavaliable_Dates.forEach(date => {
      //month = Number(ate.substring(0, 2));
      //year = Number(date.substring(6,));
      let _day = Number(date.substring(3, 5));
      unavalible_Days.push(_day);
    });

    let avalibility = {};
    this.state.days.forEach(day => {
      if(unavalible_Days.indexOf(day) !== -1){
        avalibility[day] = false;
      } else {
        avalibility[day] = true;
      }
    });

    this.setState({
      avalibility: avalibility
    })
  }

  /*  0- index */
  /* returns the month given an index number */
  monthConversion(index) {
    let m = 
        ['January', 'February', 'March', 'April', 'May',
         'June', 'July', 'August', 'September',
         'October', 'November', 'December'
        ];
    
    return m[index];
  }


  daysArray(low, end) {
    var list = [];
    for (var i = low; i <= end; i++) 
        list.push(i);

    return list;
  }

  
  /* returns number of days given a month and year number */
  getDaysInMonth(month, year) {
    // month from 1-12;
    console.log(new Date(year, month, 0).getDate());
    return new Date(year, month, 0).getDate();
  };


  /* updates view of calendar when user clicks next/prev button */
  updateDateMonth(typeMonth) {
    var y, m;
    // next month
    if(typeMonth === 'nextMonth') {

      if(this.state.monthNumber === 12){
        y = this.state.year + 1;
        m = 1;    
      } else {
        y = this.state.year;
        m = this.state.monthNumber + 1;
      }

    
    } else { // prev month

      if(this.state.monthNumber === 1){
        y = this.state.year - 1;
        m = 12;    
      } else {
        y = this.state.year;
        m = this.state.monthNumber - 1;
      }
    }

    var date = new Date(y, m-1, 1); // note: zero index
    var monthNumber = date.getMonth() + 1;
    var month = this.monthConversion(date.getMonth());
    var year = date.getFullYear();

    this.setState({
      monthNumber: monthNumber,
      month: month,
      year: year,
      days: this.daysArray(1, this.getDaysInMonth(monthNumber, year))        
    });

  }

  /* clears start and end date */
  clearState() {

    this.setState({
      // monthNumber: this.state.monthNumber,
      // month: this.state.month,
      // year: this.state.year,
      // days: this.state.days,

      hoverDate: '',
      startDate: '',
      endDate: '',
      secondaryStartDate: '',
      secondaryEndDate: ''
    });
  }

  /* sets startDate or endDate depending on button click */
  buttonCLick(dateTime) {
    var secondaryStartDate
    if(!this.state.startDate) {
      var date = 'startDate';
      secondaryStartDate = dateTime;
    } else if(!this.state.endDate) {
      var date = 'endDate';
      secondaryStartDate = this.state.secondaryStartDate
    } else {
      return;
    }

    this.setState({
      [date]: dateTime,
      secondaryStartDate: secondaryStartDate 
    })
  }

  /* sets state [hovereDate] for specific days that are hovered */
  mouseEnter(dateTime) {
    let firstDay = Number(this.state.startDate.slice(-2));
    let hoverDay  =  Number(dateTime.slice(-2));

    if(this.state.startDate && this.state.endDate){
      return;
    }

    if(this.state.startDate && (hoverDay > firstDay)){
      this.setState({
        hoverDate: dateTime 
      })
    }
  }

  /* helper function for colorDates() */
  /* returns an array between and including two numbers */
  listBetweenTwoNumbers(low, end) {
    var list = [];
    for (var i = low; i <= end; i++) 
        list.push(i);

    return list;
  }

  /* returns an array of days that need to be colored [hover] */
  colorDates() {
    if(this.state.startDate) {
      let firstDay = Number(this.state.startDate.slice(-2));

      let endDay;
      if(this.state.endDate){
        endDay = Number(this.state.endDate.slice(-2));
      } else {
        endDay = Number(this.state.hoverDate.slice(-2));
      }
      return this.listBetweenTwoNumbers(firstDay+1, endDay);
    }
    return [];
  }

  render() {
    console.log('avalibility', this.state.avalibility);

    let monthYear = {
      month: this.state.monthNumber, 
      year: this.state.year, 
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    let listOfColorDates = this.colorDates();
    //let lastFillDate = Boolean(this.state.endDate) === true;
    let hide = Boolean(this.state.startDate);

    // console.log('state');
    // console.log(this.state);

    return (

      // Need to pass in start and end date to props CheckInOut

    <main>
      
      <PricePerNight />
      <CheckInOut monthYear={monthYear}/> 
      <div className="calendar">
        <MonthIndicator 
          month={this.state.month} 
          year={this.state.year} 
          updateDateMonth={this.updateDateMonth}/>
        <DayOfWeek />
        <DateGridList 
          monthYear={monthYear}
          days={this.state.days}
          updateStartEndDate={this.buttonCLick}
          mouseEnter={this.mouseEnter}
          listOfColorDates={listOfColorDates}
          //lastFillDate={lastFillDate} // sends T or F if there exist a last date
          avalibility={this.state.avalibility}
          />
        <ClearDate 
          hide={hide}
          clearState={this.clearState}/>
      </div>
    </main>
    );
  }
}

export default App;