import { useState, useContext } from "react";
import { ThemeContext } from "../../../context/wrapper";
import { useActor } from "@xstate/react";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";

// https://www.npmjs.com/package/react-form-stepper

const steps = ["Package", "Customer", "Delivery"];

export default function StartDelivery() {
  const themeServices = useContext(ThemeContext);
  const [themeState] = useActor(themeServices.themeService);
  const [activeStep, setActiveStep] = useState(1);

  // Package Form

  function PackageDetailsForm() {
    return <></>;
  }

  function CustomerDetailsForm() {
    return <></>;
  }

  function DeliveryDetailsForm() {
    return <></>;
  }

  return (
    <div>
      <Typography variant="h5">Start Delivery Process</Typography>
      {/*

            Create a package, Enter Customer Info Then Create Delivery Details (Date. etc.)

            Use of MUI Package is important. For inline editing use the sx attribute, to specify use dev tools and '& .____'

            */}
      <div className="p-3 mt-3">
        {activeStep === 1 && <PackageDetailsForm />}
        {activeStep === 2 && <CustomerDetailsForm />}
        {activeStep === 3 && <DeliveryDetailsForm />}
      </div>
      <Stepper activeStep={activeStep} className="mt-3 " alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                circle: { color: "#00b894" },
                path: { color: "#00b894" },
              }}
            >
              <Typography
                sx={{
                  color: themeState.matches("darkmode") ? "#ffff" : "#2d3436",
                }}
                variant="caption"
              >
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
