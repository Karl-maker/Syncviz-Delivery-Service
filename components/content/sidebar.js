import React, { useState, useContext, useRef, useEffect } from "react";
import { SideBarContext, ThemeContext } from "../../context/wrapper";
import { useActor } from "@xstate/react";
import Navigation from "./navigation";

export default function SideBar({ isMobile }) {
  // Toggle between open and closed... if the screen is smaller than x we will close it totally

  const wrapperRef = useRef(null);
  const sidebarServices = useContext(SideBarContext);
  const themeServices = useContext(ThemeContext);
  const [sidebarState] = useActor(sidebarServices.sidebarService);
  const [themeState] = useActor(themeServices.themeService);

  const themeStateController = themeServices.themeService;
  const sidebarStateController = sidebarServices.sidebarService;
  var width, position, left;

  function CloseSideBar(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (sidebarState.matches("open") && isMobile) {
          if (ref.current && !ref.current.contains(event.target)) {
            sidebarStateController.send("TOGGLE");
          }
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

  CloseSideBar(wrapperRef);

  if (isMobile) {
    position = "fixed";
    width = "70%";
    if (sidebarState.matches("close")) {
      left = "-500px";
    } else {
      left = "0px";
    }
  } else {
    position = "relative";
    left = "0px";
    if (sidebarState.matches("close")) {
      width = "6%";
    } else {
      width = "20%";
    }
  }

  return (
    <div
      className="sidebar container-fluid p-0 secondary"
      style={{ width: width, position: position, left: left }}
      ref={wrapperRef}
    >
      <Navigation
        isPrivate={false}
        isOpen={sidebarState.matches("open")}
        isMobile={isMobile}
      />
    </div>
  );

  // StateMachine sets the class that will use the right width
}
