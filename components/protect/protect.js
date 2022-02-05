import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Protect({ userType, children, href }) {
  const router = useRouter();
  const isTest = true;

  // IsLoading is neccessary so that code doesn't show

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isTest) {
      router.push(href);
    } else {
      setIsLoading(false);
    }
  }, [userType, router, href]);

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
