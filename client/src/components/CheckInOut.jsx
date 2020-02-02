import React from 'react';
import right from "../../dist/svg/checkArrow.svg";
import SVG from "react-inlinesvg";

class CheckInOut extends React.Component {
    constructor(props) {
        super(props);
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
        var startText = this.props.status.startDate ? 
            this.convertDateAirbnbFormat(this.props.status.startDate) : 'Check-in';
        
        var endText = this.props.status.endDate ? 
            this.convertDateAirbnbFormat(this.props.status.endDate) : 'Checkout';

        var startStyle = {};
        var endStyle = {};

        var reveal = this.props.revealState;
        var startDate = this.props.status.startDate;
        var endDate = this.props.status.endDate;

        if(reveal && !startDate){
            startStyle['backgroundColor'] =  '#99EDE6';
            startStyle['color'] = '#227A87';
        } else if (startDate && reveal && !endDate){
            startStyle['backgroundColor'] = 'white';
            startStyle['color'] = '#484848';

            endStyle['backgroundColor'] =  '#99EDE6';
            endStyle['color'] = '#227A87';

        } else if (startDate && reveal && endDate){
            startStyle['backgroundColor'] =  '#99EDE6';
            startStyle['color'] = '#227A87';

            endStyle['backgroundColor'] =  'white';
            endStyle['color'] = '#484848';
        } else if(startDate && !reveal && endDate) {
            startStyle['backgroundColor'] = 'white';
            startStyle['color'] = '#484848';

            endStyle['backgroundColor'] =  'white';
            endStyle['color'] = '#484848';
        }

        return (
            <div>
                <div className="date-heading">Dates</div>
                <div className="check-in-out">
                    <div 
                        className="in-check checkInOut-text"
                        style={startStyle}
                        onClick={this.props.revealCalendar}
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
