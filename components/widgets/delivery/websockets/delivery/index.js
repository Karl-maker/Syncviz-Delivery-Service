import React, { useEffect, useState } from "react";

export default function LiveDeliveryTracking({ socket, widget }) {
  const [deliveryData, setDeliveryData] = useState({});

  useEffect(() => {
    const deliveryListener = (args) => {
      setDeliveryData(args.delivery);
    };

    socket.on("delivery", deliveryListener);

    return () => {
      socket.off("delivery", deliveryListener);
    };
  }, [socket]);

  return (
    <>
      {deliveryData ? (
        <>
          {/* Develop System to display different sizes or versions of widgets*/}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
