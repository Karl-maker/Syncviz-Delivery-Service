import Link from "next/link";
import { Button } from "react-bootstrap";
import { MdOutlineError } from "react-icons/md";

function NotFound() {
  return (
    <div style={{ height: "100%" }} className="container mt-5">
      <div className="text-center align-middle my-auto">
        <MdOutlineError
          className="display-1 m-3"
          tabindex="0"
          data-toggle="tooltip"
          title="404 Error"
        />
        <h1 className="display-2">Looks Like You Are Lost.</h1>
        <p>Let's deliver you back to the home page</p>
        <Link href="/" passHref>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
