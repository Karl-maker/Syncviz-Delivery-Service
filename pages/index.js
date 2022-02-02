import { useContext, useState, useEffect } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { DeviceContext } from "../context/wrapper";
import WidgetWrapper from "../components/widgets/wrapper";

function Home() {
  var deviceData = useContext(DeviceContext);

  return (
    <div className="col-12 p-3">
      <div role="presentation" className="col-12">
        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
          <Typography>Home</Typography>
        </Breadcrumbs>
      </div>
    </div>
  );
}

export default Home;
