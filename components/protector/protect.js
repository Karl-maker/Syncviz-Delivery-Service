import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../context/wrapper";
import { useRouter } from "next/router";
import { useActor } from "@xstate/react";

export default function Protect({ userType, children, href }) {
  const accountServices = useContext(AccountContext);
  const [accountState] = useActor(accountServices.authService);
  const router = useRouter();

  useEffect(() => {
    if (!accountState.matches(userType)) {
      router.push(href);
    }
  });

  return <>{children}</>;
}
