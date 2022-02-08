import { useContext, useState, useEffect } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { DeviceContext } from "../context/wrapper";
import WidgetWrapper from "../components/widgets/wrapper";
import StartDelivery from "../components/widgets/delivery/start-delivery";

// Widgets

import TrackYourPackage from "../components/widgets/package/track-your-package";

function Home() {
  var deviceData = useContext(DeviceContext);

  return (
    <div className="row">
      <div className="col-lg-8 col-md-7 col-sm-12">
        {/*

         Delivery Management System

         1. Short description
         2. Login options (Admin, Driver, Clients)

         */}
        {/*<StartDelivery />*/}
      </div>
      <div
        className={`col-lg-4 col-md-5 col-sm-12 ${
          deviceData.isMobile ? "order-first mb-5" : ""
        }`}
      >
        {/*

         Side Widgets

         1. Track package quickly
         2. Start shipping today, get started, /registration

         */}

        <TrackYourPackage containerStyle="col-12" />
      </div>
    </div>
  );
}

export default Home;
