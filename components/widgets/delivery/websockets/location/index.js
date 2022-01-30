import React, { useEffect, useState } from "react";

export default function LiveLocationTracking({ socket, widget }) {
  const [locationData, setLocationData] = useState();

  useEffect(() => {
    const locationListener = (args) => {
      setLocationData(args.location);
    };

    socket.on("location", locationListener);

    return () => {
      socket.off("location", locationListener);
    };
  }, [socket]);

  return (
    <>
      {locationData ? (
        <>
          {/* Develop System to display different sizes or versions of widgets*/}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
