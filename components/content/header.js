import { useContext, useState, useEffect } from "react";
import {
  ThemeContext,
  SideBarContext,
  AccountContext,
} from "../context/wrapper";
import { useActor } from "@xstate/react";
import { CgMenuLeft } from "react-icons/cg";
import { Button } from "react-bootstrap";
import Link from "next/link";

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
      <div className="col-6 text-end align-center">
        {accountState.matches("visitor") ? (
          <Link href={"/signup"} passHref>
            <Button
              variant={
                themeState.matches("darkmode") ? "outline-light" : "primary"
              }
              size="lg"
            >
              Signup
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Header;
