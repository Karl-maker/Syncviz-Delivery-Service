import React, { useEffect } from "react";

export default function SocketWrapper({ socket, setData, children, event }) {
  useEffect(() => {
    const eventListener = (args) => {
      setData(args);
    };

    socket.on(event, eventListener);

    return () => {
      socket.off(event, eventListener);
    };
  });

  return <>{children}</>;
}
