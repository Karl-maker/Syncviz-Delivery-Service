import Link from "next/link";
import { Button } from "react-bootstrap";
import { MdOutlineError } from "react-icons/md";

function NotFound() {
  return (
    <div className="text-center align-middle my-auto mt-5">
      <MdOutlineError className="display-1" />
      <h1 className="display-2 m-3">Looks Like You Are Lost.</h1>
      <Link href={"/"}>Let us deliver you back to the home page</Link>
    </div>
  );
}

export default NotFound;
