import { useState, useContext } from "react";
import { ThemeContext } from "../../../context/wrapper";
import { useActor } from "@xstate/react";

// https://www.npmjs.com/package/react-form-stepper

const steps = [
  { label: "Package" },
  { label: "Customer" },
  { label: "Delivery" },
];

export default function StartDelivery() {
  const themeServices = useContext(ThemeContext);
  const [themeState] = useActor(themeServices.themeService);

  return (
    <div>
      {/*

            Create a package, Enter Customer Info Then Create Delivery Details (Date. etc.)

            */}
    </div>
  );
}
