import React from 'react';
import right from "../../dist/svg/checkArrow.svg";
import SVG from "react-inlinesvg";

class CheckInOut extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            startSelected: false,
            endSelected: false
        }

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(startEnd) {
        console.log(event.target);
        console.log({
            [startEnd]: !this.state[startEnd]
        })
        this.setState({
            [startEnd]: !this.state[startEnd]
        })
    }

    convertDateAirbnbFormat(_date) {
        console.log(_date);
        let year = _date.substring(0, 4);
        let month = _date.substring(5, 7);
        let day = _date.substring(8,);

        return `${month}/${day}/${year}`
    }

    // #99EDE6
    render() {
        var startText = this.props.monthYear.startDate ? 
            this.convertDateAirbnbFormat(this.props.monthYear.startDate) : 'Check-in';
        
        var endText = this.props.monthYear.endDate ? 
            this.convertDateAirbnbFormat(this.props.monthYear.endDate) : 'Checkout';

        var startStyle, endStyle;

        if(this.state.startSelected) {
            startStyle = {
                backgroundColor: "#99EDE6",
                color: '#227A87'
            };
        }

        if(this.props.monthYear.startDate) {
            startStyle = {
                backgroundColor: "white",
                color: '#757575'
            };

            endStyle = {
                backgroundColor: "#99EDE6",
                color: '#227A87'
            }
        }

        if(this.props.monthYear.startDate && this.props.monthYear.endDate) {
            startStyle = {
                backgroundColor: "white",
                color: '#757575'
            };

            endStyle = {
                backgroundColor: "white",
                color: '#757575'
            }
        }

        


        return (
            <div>
                <div className="date-heading">Dates</div>
                <div className="check-in-out">
                    <div 
                        className="in-check checkInOut-text"
                        style={startStyle}
                        onClick={() => this.clickHandler('startSelected')}
                        >{startText}</div>
                    <SVG
                        id="check-in-out-svg"
                        src={right}
                    />
                    <div 
                        className="out-check checkInOut-text"
                        style={endStyle}
                        // onClick={this.clickHandler}
                        >{endText}</div>
                </div>
            </div>
        );
    }
}

export default CheckInOut;
