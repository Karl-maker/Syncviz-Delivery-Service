import React from "react";
import { createMachine } from "xstate";

export const sidebarMachine = createMachine({
  id: "sidebar",
  initial: "close",
  states: {
    close: {
      on: { TOGGLE: "open" },
    },
    open: {
      on: { TOGGLE: "close" },
    },
  },
});
