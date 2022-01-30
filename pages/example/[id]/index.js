import { useRouter } from "next/router";

export default function Example() {
  const router = useRouter();

  // useEffect(() => {
  //     if (!tracking_id) {
  //       return;
  //     } else {
  //       const socket = io(
  //         `${config.socket.DELIVERY_SERVICE_URL}/package-tracking`,
  //         {
  //           query: {
  //             tracking_id: tracking_id,
  //           },
  //         }
  //       );
  //       setSocket(socket);
  //       return () => socket.close();
  //     }
  //   }, [setSocket, tracking_id]);

  return <h1>{router.query.id}</h1>;
}
