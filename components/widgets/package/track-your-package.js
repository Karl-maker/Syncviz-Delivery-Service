import { FiPackage, FiClock, FiSearch } from "react-icons/fi";
import { useActor } from "@xstate/react";
import { useState, useEffect, useContext } from "react";
import { getDate } from "../../../utils/date/display-date";
import WidgetWrapper from "../wrapper";
import UpdateSimpleProgressBar from "./update-simple-progress-bar";
import { Button, Typography, Skeleton } from "@mui/material";
import { ThemeContext } from "../../../context/wrapper";
import axios from "axios";

export default function TrackYourPackage({ containerStyle, cardStyle }) {
  // Search Package ID then view progression % with view more button

  const themeServices = useContext(ThemeContext);
  const [themeState] = useActor(themeServices.themeService);

  const [trackingId, setTrackingId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [updates, setUpdates] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);

  // 1. Get TrackingId from Search Bar
  // 2. Place in socket action

  const handleSearch = (e) => {
    e.preventDefault();

    // Set Tracking ID on search to safeguard against changing the tracking ID causing re-renders

    setLoading(true);
    setSearch(trackingId);
    //setTrackingId("");
  };

  useEffect(() => {
    if (!search || search === "") {
      return;
    } else {
      axios
        .get(
          `/api/updates/${search}`,
          {},
          { "content-type": "application/x-www-form-urlencoded" }
        )
        .then((result) => {
          setUpdates(result.data);
        })
        .catch((e) => setResultMessage("No Data Found"));

      setLoading(false);

      return;
    }
  }, [search]);

  return (
    <WidgetWrapper
      cardStyle={cardStyle || "col-12 card-design card-design-type-1"}
      containerStyle={containerStyle || "col-sm-12 col-lg-4 col-md-6"}
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
      <div className="row mx-auto mt-3 mb-2">
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
            event.persist();
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
      {updates ? (
        <>
          <UpdateSimpleProgressBar
            data={updates.updates[updates.updates.length - 1]}
          />
        </>
      ) : (
        <>
          <>
            {loading && (
              <>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </>
            )}
          </>
          <>
            {resultMessage && (
              <>
                <div className="row mt-3" style={{ cursor: "pointer" }}>
                  <span
                    style={{ opacity: "0.5", fontSize: "13px" }}
                    className="col-12 text-center"
                  >
                    {resultMessage}
                  </span>
                </div>
              </>
            )}
          </>
        </>
      )}
    </WidgetWrapper>
  );
}
