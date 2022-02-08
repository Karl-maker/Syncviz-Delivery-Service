import React, { useEffect } from "react";

export default function SocketWrapper({
  socket,
  setData,
  setError,
  children,
  event,
}) {
  useEffect(() => {
    const eventListener = (args) => {
      setData(args);
    };

    const errorCapture = (err) => {
      setError("Issue With Getting Your Package Data");
    };

    const errorConnectCapture = (err) => {
      setError("Unavaliable");
    };

    socket.on(event, eventListener);
    socket.on("connect_failed", errorConnectCapture);
    socket.on("error", errorCapture);

    return () => {
      socket.off(event, eventListener);
    };
  });

  return <>{children}</>;
}
