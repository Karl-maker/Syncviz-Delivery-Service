import { useContext, useState, useEffect } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { DeviceContext } from "../context/wrapper";
import WidgetWrapper from "../components/widgets/wrapper";

// Widgets

import TrackYourPackage from "../components/widgets/package/track-your-package";

function Home() {
  var deviceData = useContext(DeviceContext);

  return (
    <div className="col-12 p-3">
      <div role="presentation" className="col-12">
        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
          <Typography>Welcome</Typography>
        </Breadcrumbs>
      </div>
      <div className="row mt-lg-3 mt-sm-1">
        {
          //First Row Of Widgets
        }

        <TrackYourPackage />
      </div>
    </div>
  );
}

export default Home;
