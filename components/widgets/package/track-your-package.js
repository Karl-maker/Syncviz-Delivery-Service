import { FiPackage, FiClock, FiSearch } from "react-icons/fi";
import { getDate } from "../../../utils/date/display-date";
import WidgetWrapper from "../wrapper";
import { InputAdornment, TextField } from "@mui/material";

export default function TrackYourPackage({ containerStyle, cardStyle }) {
  // Search Package ID then view progression % with view more button
  return (
    <WidgetWrapper
      cardStyle={cardStyle || "col-12 card-design-type-1"}
      containerStyle={containerStyle || "col-sm-12 col-lg-4 col-md-4"}
    >
      <div className="row">
        <div className="col-12 ">
          <FiClock style={{ marginBottom: "3px" }} />
          <span style={{ opacity: "0.5", fontSize: "13px" }} className="m-1">
            {getDate()}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-start mt-5 mb-2">
          <FiPackage style={{ fontSize: "30px" }} className="stand-alone p-1" />
        </div>
      </div>
      <div className="row">
        <h4 className="col-12 mt-2" style={{ fontWeight: "normal" }}>
          Track Your Package Here
        </h4>
      </div>

      {/*
            Search Area
              */}
    </WidgetWrapper>
  );
}
