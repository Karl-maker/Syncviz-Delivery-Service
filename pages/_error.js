import Button from "@mui/material/Button";
import { MdOutlineError } from "react-icons/md";

function Error() {
  return (
    <div className="text-center align-middle my-auto mt-5">
      <MdOutlineError className="display-1" />
      <h1 className="display-2 m-3">We May Have A Issue.</h1>
      <Button variant="contained" href={"/"} disableElevation>
        Go To Home Page
      </Button>
    </div>
  );
}

export default Error;
