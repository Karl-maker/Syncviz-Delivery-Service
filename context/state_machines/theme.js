import React from "react";
import { createMachine } from "xstate";

/*

03/02/2022 5:23PM

Learnt that you cannot get LocalStorage on server side. 
This caused me to set initial theme outside the Machine...

*/

export const themeMachine = createMachine(
  {
    id: "theme",
    initial: "initialize",
    states: {
      initialize: {
        on: { LIGHT: "lightmode", DARK: "darkmode" },
      },
      darkmode: {
        entry: ["rememberDarkMode"],
        on: { TOGGLE: "lightmode" },
      },
      lightmode: {
        entry: ["rememberLightMode"],
        on: { TOGGLE: "darkmode" },
      },
    },
  },
  {
    actions: {
      rememberLightMode: (context, event) => {
        localStorage.setItem("themeState", "lightmode");
      },
      rememberDarkMode: (context, event) => {
        localStorage.setItem("themeState", "darkmode");
      },
    },
  }
);
