import React from "react";
import { createMachine } from "xstate";

export const themeMachine = createMachine({
  id: "theme",
  initial: "lightmode",
  states: {
    darkmode: {
      on: { TOGGLE: "lightmode" },
    },
    lightmode: {
      on: { TOGGLE: "darkmode" },
    },
  },
});
