import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { ThemeContext, SideBarContext } from "../../context/wrapper";
import { useActor } from "@xstate/react";
import { CgMenuLeft } from "react-icons/cg";
import { AiOutlineGithub } from "react-icons/ai";
import { Button } from "@mui/material";

function Header() {
  const sidebarServices = useContext(SideBarContext);
  const themeServices = useContext(ThemeContext);
  const [sidebarState] = useActor(sidebarServices.sidebarService);
  const [themeState] = useActor(themeServices.themeService);
  const sidebarStateController = sidebarServices.sidebarService;

  const isLoggedIn = false;

  return (
    <div className="row p-3">
      <div className="col-6 sidebar-toggle-btn align-center">
        <div>
          <CgMenuLeft
            onClick={(e) => {
              e.preventDefault();
              sidebarStateController.send("TOGGLE");
            }}
          />
        </div>
      </div>
      <div className="col-6 text-end align-center pt-2">
        {!isLoggedIn ? (
          <Button
            href="/signup"
            variant={themeState.matches("darkmode") ? "outline" : "contained"}
            disableElevation
          >
            Sign Up
          </Button>
        ) : (
          <></>
        )}
        <Link
          href="https://github.com/Karl-maker/Syncviz-Delivery-Service"
          passHref
        >
          <AiOutlineGithub
            style={{
              fontSize: "30px",
              marginLeft: "20px",
              color: themeState.matches("darkmode") ? "#ffff" : "#2d3436",
            }}
          />
        </Link>
      </div>
    </div>
  );
}

export default Header;
