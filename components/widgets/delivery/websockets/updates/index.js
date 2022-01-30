import React, { useEffect, useState, useContext } from "react";

export default function LiveUpdateTracking({ socket, widget }) {
  const [stageData, setStageData] = useState();

  useEffect(() => {
    const stageListener = (args) => {
      setStageData(args.stages);
    };

    socket.on("stage", stageListener);

    return () => {
      socket.off("stage", stageListener);
    };
  }, [socket]);

  return (
    <>
      {stageData ? (
        <>
          {/* Develop System to display different sizes or versions of widgets*/}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
