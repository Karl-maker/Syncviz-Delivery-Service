import React, { createContext, useState, useEffect } from "react";
import { useInterpret, useMachine, useActor } from "@xstate/react";
import { themeMachine } from "./state_machines/theme";
import { sidebarMachine } from "./state_machines/sidebar";
import Header from "../components/content/header";
import SideBar from "../components/content/sidebar";
import useWindowDimensions from "../utils/device/screen-size";

// Go to Link: https://xstate.js.org/docs/recipes/react.html#global-state-react-context

export const ThemeContext = createContext({});
export const SideBarContext = createContext({});
export const DeviceContext = createContext({});

export const Wrapper = ({ children }) => {
  // Services
  const themeService = useInterpret(themeMachine);
  const sidebarService = useInterpret(sidebarMachine);

  // Actors
  const [themeState] = useActor(themeService);

  const [sideBar, setSideBar] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [currentSize, setCurrentSize] = useState({});
  const { height, width } = useWindowDimensions();

  // Set Theme

  useEffect(() => {
    // Go in Local Storage and Get Theme
    try {
      if (localStorage.getItem("themeState") === "darkmode") {
        themeService.send("DARK");
      } else {
        // Default Theme
        themeService.send("LIGHT");
      }
    } catch (err) {
      // Default Theme If Not Key Exists
      themeService.send("LIGHT");
    }
  }, []);

  // Get Device Size

  useEffect(() => {
    if (width < 1000) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  if (themeState.value === "initialize") {
    return <></>;
  }

  return (
    <DeviceContext.Provider value={{ isMobile, currentSize }}>
      <SideBarContext.Provider value={{ sidebarService }}>
        <ThemeContext.Provider value={{ themeService }}>
          <div
            style={{ display: "flex", height: "100vh" }}
            className={`${themeState.value}`}
          >
            {/* Place Sidebar Here */}
            <SideBar isMobile={isMobile} />
            <div className="container-fluid primary">
              {/* Header */}
              <Header />
              <main>{children}</main>
            </div>
          </div>
        </ThemeContext.Provider>
      </SideBarContext.Provider>
    </DeviceContext.Provider>
  );
};
