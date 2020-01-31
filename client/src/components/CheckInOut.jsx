import React from 'react';
import right from "../../dist/svg/checkArrow.svg";
import SVG from "react-inlinesvg";

var CheckInOut = (props) => {
    return (
        <div>
            <div className="date-heading">Dates</div>
            <div className="check-in-out">
                <div className="in-check checkInOut-text">Check-in</div>
                <SVG
                    id="check-in-out-svg"
                    src={right}
                />
                <div className="out-check checkInOut-text">Checkout</div>
            </div>
        </div>
    );
}

export default CheckInOut;
