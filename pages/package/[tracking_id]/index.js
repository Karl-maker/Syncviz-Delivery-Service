import getConfig from "../../../config";
const config = getConfig();
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/*

With socket.io client start connection and listen to tracking

1. View info on package
2. View info on delivery
3. View info on driver

*/

export default function TrackPackage() {
  const router = useRouter();
  const [socket, setSocket] = useState(null);
  const { tracking_id } = router.query;

  useEffect(() => {
    if (!tracking_id) {
      return;
    } else {
      const socket = io(
        `${config.socket.DELIVERY_SERVICE_URL}/package-tracking`,
        {
          query: {
            tracking_id: tracking_id,
          },
        }
      );
      setSocket(socket);
      return () => socket.close();
    }
  }, [setSocket, tracking_id]);

  return (
    <div className="row">
      {socket ? (
        <>
          <div className="container">
            {/*
            <LivePackageTracking socket={socket} />
            <LiveDeliveryTracking socket={socket} />
            <LiveUpdateTracking socket={socket} />
          */}
          </div>
        </>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}
