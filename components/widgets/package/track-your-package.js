import { FiPackage, FiClock, FiSearch } from "react-icons/fi";
import { useActor } from "@xstate/react";
import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { getDate } from "../../../utils/date/display-date";
import WidgetWrapper from "../wrapper";
import LiveProgressBar from "./live-progress-bar";
import { Button } from "@mui/material";
import { ThemeContext } from "../../../context/wrapper";

export default function TrackYourPackage({ containerStyle, cardStyle }) {
  // Search Package ID then view progression % with view more button

  const themeServices = useContext(ThemeContext);
  const [themeState] = useActor(themeServices.themeService);

  const [trackingId, setTrackingId] = useState("");
  const [search, setSearch] = useState("");
  const [socket, setSocket] = useState(null);

  // 1. Get TrackingId from Search Bar
  // 2. Place in socket action

  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(trackingId);
  };

  useEffect(() => {
    if (!search) {
      return;
    } else {
      const socket = io(
        `${
          process.env.DELIVERY_API_URL || ""
        }/package-tracking?tracking_id=${search}`
      );
      setSocket(socket);
      return () => socket.close();
    }
  }, [setSocket, search]);

  return (
    <WidgetWrapper
      cardStyle={cardStyle || "col-12 card-design card-design-type-1"}
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
      <div className="row mx-auto mt-3">
        <input
          type="text"
          name="tracking_id"
          placeholder="Enter Tracking ID"
          autoComplete="off"
          style={{
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            borderStyle: "none",
            color: "grey",
            fontSize: "14px",
          }}
          className="col-8"
          value={trackingId}
          onChange={(event) => {
            event.preventDefault();
            setTrackingId(event.target.value);
          }}
        />
        <Button
          variant={themeState.matches("ligtmode") ? "outline" : "contained"}
          disableElevation
          onClick={handleSearch}
          className="col-2 text-start"
          style={{
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
          }}
        >
          <FiSearch />
        </Button>
      </div>
      {/*
            Show If Socket Data Avaliable
    */}
      {socket ? <LiveProgressBar socket={socket} /> : <></>}
    </WidgetWrapper>
  );
}
