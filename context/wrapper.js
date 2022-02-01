import React, { createContext, useState, useEffect } from "react";
import { useInterpret, useMachine, useActor } from "@xstate/react";
import { authMachine } from "./state_machines/authentication";
import { themeMachine } from "./state_machines/theme";
import { sidebarMachine } from "./state_machines/sidebar";
import Header from "../components/content/header";
import SideBar from "../components/content/sidebar";
import useWindowDimensions from "../utils/device/screen-size";

// Go to Link: https://xstate.js.org/docs/recipes/react.html#global-state-react-context

export const AccountContext = createContext({});
export const ThemeContext = createContext({});
export const SideBarContext = createContext({});
export const DeviceContext = createContext({});

export const Wrapper = ({ children }) => {
  // Services
  const authService = useInterpret(authMachine);
  const themeService = useInterpret(themeMachine);
  const sidebarService = useInterpret(sidebarMachine);

  // Actors
  const [themeState] = useActor(themeService);

  const [sideBar, setSideBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSize, setCurrentSize] = useState({});
  const { height, width } = useWindowDimensions();

  // create an event listener
  useEffect(() => {
    if (width < 760) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <DeviceContext.Provider value={{ isMobile, currentSize }}>
      <SideBarContext.Provider value={{ sidebarService }}>
        <ThemeContext.Provider value={{ themeService }}>
          <AccountContext.Provider value={{ authService }}>
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
          </AccountContext.Provider>
        </ThemeContext.Provider>
      </SideBarContext.Provider>
    </DeviceContext.Provider>
  );
};
