import { useContext, useState, useEffect } from "react";
import {
  ThemeContext,
  SideBarContext,
  AccountContext,
} from "../../context/wrapper";
import { useActor } from "@xstate/react";
import { CgMenuLeft } from "react-icons/cg";
import { Button } from "@mui/material";

function Header() {
  const sidebarServices = useContext(SideBarContext);
  const themeServices = useContext(ThemeContext);
  const accountServices = useContext(AccountContext);
  const [sidebarState] = useActor(sidebarServices.sidebarService);
  const [themeState] = useActor(themeServices.themeService);
  const [accountState] = useActor(accountServices.authService);
  const sidebarStateController = sidebarServices.sidebarService;

  return (
    <div className="row p-3">
      <div className="col-6 sidebar-toggle-btn align-center">
        <div
          onClick={(e) => {
            e.preventDefault();
            sidebarStateController.send("TOGGLE");
          }}
        >
          <CgMenuLeft />
        </div>
      </div>
      <div className="col-6 text-end align-center pt-2">
        {accountState.matches("visitor") ? (
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
      </div>
    </div>
  );
}

export default Header;
