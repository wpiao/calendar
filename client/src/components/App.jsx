import React, { Component } from 'react';
import axios from 'axios'; 
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

        inSecondaryMonth: false,

        // a dates of days that are avalible and not avalible in a given month
        // ex: [{1: T}, {2: F}, ... {31: T}]
        avalibility: [],

        hidden: false

    };

    this.buttonCLick = this.buttonCLick.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.updateDateMonth = this.updateDateMonth.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount() {

    axios.get('http://localhost:3001/month', {
      params: {
          "id": 1,
          "month": "02",
          "year": this.state.year
      }
    })
    .then((response) => {
      let unavaliable_Dates = response.data;
      let unavalible_Days = [];
      unavaliable_Dates.forEach(date => {

        let _day = Number(date.substring(8,));
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
      });
    })
    .catch((error) => {
      console.log('error here');
    });

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
    //console.log(new Date(year, month, 0).getDate());
    return new Date(year, month, 0).getDate();
  };

  stringMonthZeroPad(month){
      var monthStr;
      if( month < 10 ){
        monthStr = "0"+month;
      } else {
        monthStr= month.toString;
      }
      return monthStr;
  }

  /* updates view of calendar when user clicks next/prev button */
  updateDateMonth(typeMonth) {

    let updatedMonth;
    let _m, _y;
    if(typeMonth === 'nextMonth'){
      if(this.state.monthNumber === 12){
        _m = 1;
        _y = this.state.year + 1;
      } else {
        _m = this.state.monthNumber + 1;
        _y = this.state.year;
      }
      updatedMonth = this.stringMonthZeroPad(_m);

    }
    else{
      if(this.state.monthNumber === 1){
        _m = 12
        _y = this.state.year - 1;
      } else {
        _m = this.state.monthNumber-1;
        _y = this.state.year;
      }
      updatedMonth = this.stringMonthZeroPad(_m);
    }



    axios.get('http://localhost:3001/month', {
      params: {
          "id": 1,
          "month": updatedMonth,
          "year": _y
      }
    })
    .then((response) => {
      let unavaliable_Dates = response.data;
      let unavalible_Days = [];
      unavaliable_Dates.forEach(date => {

        let _day = Number(date.substring(8,));
        unavalible_Days.push(_day);
      });
  
      let avalibility = {};
      this.daysArray(1, this.getDaysInMonth(_m, _y)).forEach(day => {
        if(unavalible_Days.indexOf(day) !== -1){
          avalibility[day] = false;
        } else {
          avalibility[day] = true;
        }
      });

      // update new month
      //-------------------------------------------
      var y, m;

      var secondaryStartDate;
      if(this.state.secondaryStartDate){
        secondaryStartDate = this.state.secondaryStartDate;
      }

      // next month
      if(typeMonth === 'nextMonth') {

        if(this.state.monthNumber === 12){
          y = this.state.year + 1;
          m = 1;    
        } else {
          y = this.state.year;
          m = this.state.monthNumber + 1;
        }

        // secondaryStartDate
        // var secondaryStartDate;
        if(!this.state.secondaryStartDate){
          if(this.state.startDate && !this.state.secondaryStartDate) {
            secondaryStartDate = new Date(y, m-1, 1).toISOString().split('T')[0]
          }
        } else {
          secondaryStartDate = this.state.secondaryStartDate
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




      //-------------------------------------------


      this.setState({
        avalibility: avalibility,

        // update new month
        monthNumber: monthNumber,
        month: month,
        year: year,
        days: this.daysArray(1, this.getDaysInMonth(monthNumber, year)),
        
        secondaryStartDate: secondaryStartDate,
        hoverDate: ''
      });
    })
    .catch((error) => {
      console.log('error here');
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
      secondaryEndDate: '',

      inSecondaryMonth: false
    });
  }

  // date parameter in [yyyy-mm-dd]
  getMonth(date) {
    return date.substring(5,7);
  }

  // date parameter in [yyyy-mm-dd]
  getYear(date) {
    return date.substring(0,4);
  }


  /* sets startDate or endDate depending on button click */
  buttonCLick(dateTime) {
    //var secondaryStartDate;
    var secondaryEndDate = '';
    if(!this.state.startDate) {
      var date = 'startDate';
    } else if(!this.state.endDate) {
      var date = 'endDate';
      //this.getDaysInMonth()


      if(this.getMonth(dateTime) !== this.getMonth(this.state.startDate)){
        let m = Number(this.getMonth(this.state.startDate));
        let y = Number(this.getYear(this.state.startDate));
        let temp = new Date(y, m-1, this.getDaysInMonth(m, y));
        secondaryEndDate = temp.toISOString().split('T')[0];
      }





    } else {
      return;
    }

    this.setState({
      // hoverDate: '',
      [date]: dateTime,
      secondaryEndDate: secondaryEndDate
    })
  }

  /* sets state [hovereDate] for specific days that are hovered */
  mouseEnter(dateTime) {
    var currentStartDate = this.state.startDate;
    if(this.state.secondaryStartDate) {
      currentStartDate = this.state.secondaryStartDate;
    }

    let firstDay = Number(currentStartDate.slice(-2));
    let hoverDay  =  Number(dateTime.slice(-2));

    if(currentStartDate && this.state.endDate){
      return;
    }
                                  // might have to come back here...
    if(currentStartDate && (hoverDay >= firstDay)){
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

  // date parameter in [yyyy-mm-dd], return T/F if date in current month
  inCurrentMonth(date) {
    return this.state.monthNumber === Number(this.getMonth(date));
  }

  /* returns an array of days that need to be colored [hover] */
  colorDates() {
    let firstDay;
    if(this.state.startDate) {
      if(this.inCurrentMonth(this.state.startDate)){
        firstDay = Number(this.state.startDate.slice(-2));
      }

      if(this.state.secondaryStartDate) {
        if(this.inCurrentMonth(this.state.secondaryStartDate)){
          firstDay = Number(this.state.secondaryStartDate.slice(-2))  - 1;
        }
      }
      let endDay;
      if(this.state.endDate){
        if(this.state.monthNumber === Number(this.getMonth(this.state.endDate))){
          endDay = Number(this.state.endDate.slice(-2));
        }
        if(this.state.monthNumber === Number(this.getMonth(this.state.secondaryEndDate))) {
          endDay = Number(this.state.secondaryEndDate.slice(-2));
        }

      } else {
        endDay = Number(this.state.hoverDate.slice(-2));
      }
      return this.listBetweenTwoNumbers(firstDay+1, endDay);
    }
    return [];
  }

  updateCurrentParams() {
    let obj = {
      month: this.state.monthNumber,
      year: this.state.year
    };

    obj['startDate'] = '';
    if(this.inCurrentMonth(this.state.startDate))
      obj['startDate'] = this.state.startDate;

    //console.log('debugg', this.state.startDate);
    let secondaryStartDate = this.state.secondaryStartDate;
    if(secondaryStartDate){
      if(this.state.monthNumber === Number(this.getMonth(secondaryStartDate))) {
        obj['startDate'] = secondaryStartDate;
        //
        obj['inSecondaryMonth'] = true;
      } else if (this.state.monthNumber === Number(this.getMonth(this.state.startDate))) {
        obj['startDate'] = this.state.startDate;
      } else { //comeback
        obj['startDate'] = '';
      }
    }

    // let secondaryEndDate = this.state.secondaryEndDate;
    // if(secondaryEndDate)

    if(this.state.endDate){
      if(this.state.monthNumber === Number(this.getMonth(this.state.startDate))) {
        obj['endDate'] = this.state.secondaryEndDate;
      }

      if(this.state.monthNumber === Number(this.getMonth(this.state.endDate))) {
        obj['endDate'] = this.state.endDate
      }
    }

    return obj;
  }

  render() {
    //console.log('avalibility', this.state.avalibility);


    let displayCalendar = this.state.hidden ? {display: 'none'} : {display: null};

    let status = {
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }

    let monthYear = this.updateCurrentParams();
    let listOfColorDates = this.colorDates();
    //let lastFillDate = Boolean(this.state.endDate) === true;
    let hide = Boolean(this.state.startDate);

    // console.log('state');
    // console.log(this.state);

    return (

      // Need to pass in start and end date to props CheckInOut

    <main>
      
      <PricePerNight />
      <CheckInOut status={status}/> 
      <div className="calendar" style={displayCalendar}>
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
      <div>helloo</div>
    </main>
    );
  }
}

export default App;