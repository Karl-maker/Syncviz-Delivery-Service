import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../../context/wrapper";
import { useRouter } from "next/router";
import { useActor } from "@xstate/react";

export default function Protect({ userType, children, href }) {
  const accountServices = useContext(AccountContext);
  const [accountState] = useActor(accountServices.authService);
  const router = useRouter();

  // IsLoading is neccessary so that code doesn't show

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accountState.matches(userType)) {
      router.push(href);
    } else {
      setIsLoading(false);
    }
  }, [accountState, userType, router, href]);

  return (
    <>
      {isLoading ? (
        <>
          {/*

          Place Splash Screen Here

           */}
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
