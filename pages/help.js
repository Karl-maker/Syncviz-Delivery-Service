import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

function Help() {
  return (
    <>
      <div className="col-12 p-3">
        <div role="presentation" className="col-12">
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Typography>
              <Link href="/" passHref>
                Home
              </Link>
            </Typography>
            <Typography>Help</Typography>
          </Breadcrumbs>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 m-0  container-fluid">
              {/*

                RightHandSide

                */}
            </div>
            <div className="col-12 m-0 "></div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12  m-0 container">
            {/*

                LeftHandSide

                */}
            <div className="row">
              <div className="col-12 m-0 "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Help;
