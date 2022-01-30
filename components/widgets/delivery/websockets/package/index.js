import React, { useEffect, useState } from "react";

export default function LivePackageTracking({ socket, widget }) {
  const [packageData, setPackageData] = useState();

  useEffect(() => {
    const packageListener = (args) => {
      setPackageData(args.package);
    };

    socket.on("package", packageListener);

    return () => {
      socket.off("package", packageListener);
    };
  }, [socket]);

  return (
    <>
      {packageData ? (
        <>
          {/* Develop System to display different sizes or versions of widgets*/}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
