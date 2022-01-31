import { useRouter } from "next/router";
import Protect from "../../../components/protector/protect";

export default function Example() {
  const router = useRouter();

  return (
    <Protect userType="admin" href="/help">
      <h1>{router.query.id}</h1>
    </Protect>
  );
}
