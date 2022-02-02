import React, { useEffect, useState } from "react";
import SocketWrapper from "../../socket/wrapper";
import Link from "next/link";
import { CgDetailsMore } from "react-icons/cg";

export default function LiveProgressBar({ socket }) {
  const [data, setData] = useState();
  const [precentage, setPrecentage] = useState("0");
  let latest_update;

  if (data) {
    latest_update = data.updates[0].status;
  }

  return (
    <SocketWrapper socket={socket} setData={setData} event="updates">
      {data ? <>{latest_update}</> : <></>}
    </SocketWrapper>
  );
}
