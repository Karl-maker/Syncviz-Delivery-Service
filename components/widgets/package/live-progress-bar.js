import React, { useEffect, useState } from "react";
import SocketWrapper from "../../socket/wrapper";
import Link from "next/link";
import { ProgressBar } from "react-bootstrap";
import { CgDetailsMore } from "react-icons/cg";
import { replaceUnderScoreWithSpace } from "../../../utils/display-text/character-manipulation";

export default function LiveProgressBar({ socket }) {
  const [data, setData] = useState();
  const [precentage, setPrecentage] = useState(0);
  const [color, setColor] = useState("info");

  useEffect(() => {
    if (!data) {
      return;
    }

    try {
      switch (data.updates[0].status) {
        case "PENDING":
          setPrecentage(5);
          setColor("info");
          return;
        case "IN_TRANSIT":
          setPrecentage(25);
          setColor("warning");
          return;
        case "READY_FOR_DELIVERY":
          setPrecentage(50);
          setColor("success");
          return;
        case "OUT_FOR_DELIVERY":
          setPrecentage(75);
          setColor("warning");
          return;
        case "DELIVERIED":
          setPrecentage(100);
          setColor("success");
          return;
        case "CANCELLED":
          setPrecentage(100);
          setColor("danger");
          return;
        default:
          setPrecentage(0);
          return;
      }
    } catch (err) {
      setData(null);
      return;
    }
  }, [data]);

  try {
    return (
      <SocketWrapper socket={socket} setData={setData} event="updates">
        {data ? (
          <div className="row mt-3" style={{ cursor: "pointer" }}>
            <span
              style={{ opacity: "0.5", fontSize: "13px", cursor: "pointer" }}
              className="col-12 m-1"
            >
              {replaceUnderScoreWithSpace(data.updates[0].status)}
            </span>
            <div className=" col-12 mb-3">
              <ProgressBar
                style={{ height: "7px" }}
                animated
                now={precentage}
                variant={color}
              />
            </div>
            <div className="col-12 text-end ml-1 ">
              <Link
                href={`/package-tracking/${data.updates[0].tracking_id}`}
                passHref
              >
                <div>
                  <CgDetailsMore style={{ marginBottom: "3px" }} />
                  <span
                    style={{ opacity: "0.5", fontSize: "13px" }}
                    className="m-1"
                  >
                    View More Details
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <></>
        )}
      </SocketWrapper>
    );
  } catch (err) {
    return <></>;
  }
}
