import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import {
  SideBarContext,
  ThemeContext,
  AccountContext,
} from "../../context/wrapper";
import { useActor } from "@xstate/react";
import { AiFillHome, AiFillPhone } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import {
  MdOutlineMiscellaneousServices,
  MdNightlightRound,
  MdWbSunny,
} from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";
import Switch from "react-switch";

const visitorNav = [
  { name: "Home", link: "/", icon: <AiFillHome /> },
  {
    name: "Services",
    link: "/services",
    icon: <MdOutlineMiscellaneousServices />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <AiFillPhone />,
  },
  {
    name: "Help",
    link: "/help",
    icon: <FiHelpCircle />,
  },
];
const userNav = [{}];

export default function Navigation({ isPrivate, isOpen, isMobile }) {
  const sidebarServices = useContext(SideBarContext);
  const [sidebarState] = useActor(sidebarServices.sidebarService);
  const sidebarStateController = sidebarServices.sidebarService;

  const themeServices = useContext(ThemeContext);
  const [themeState] = useActor(themeServices.themeService);
  const themeStateController = themeServices.themeService;

  const accountServices = useContext(AccountContext);
  const [accountState] = useActor(accountServices.authService);
  const accountStateController = accountServices.authService;

  const [sideBarContent, setSideBarContent] = useState([]);

  useEffect(() => {
    if (accountState.matches("visitor")) {
      setSideBarContent(visitorNav);
    }
  }, [accountState]);

  return (
    <>
      {isMobile ? (
        <>
          <div className="row align-items-center m-4">
            <div className="col-2 text-center ">
              <BsArrowLeftShort
                onClick={(e) => {
                  e.preventDefault;
                  sidebarStateController.send("TOGGLE");
                }}
                style={{ fontSize: "40px" }}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="row m-2">
        <div className="col-12 m-0 p-0 text-center ">
          <Link href="/" passHref>
            <Image
              src="/logo192.png"
              alt="Syncviz Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
      </div>

      <nav className="d-flex flex-column text-start p-4">
        {/*   
        


          When Sidebar is Open
        
        
        
        */}
        <div className="row " style={{ position: "relative" }}>
          <ul>
            {sideBarContent.map((element) => (
              <Link key={element.name} href={element.link} passHref>
                <li className="ml-3 mb-4 row align-center d-flex flex-nowrap text-truncate ">
                  {!isOpen && !isMobile ? (
                    <div className="col-12 align-center text-center p-0 m-0">
                      {element.icon}
                    </div>
                  ) : (
                    <div className="col-12 row d-flex flex-nowrap text-truncate">
                      <p className="col-2 align-center text-center p-0 m-0">
                        {element.icon}
                      </p>
                      <div className="col-10">{element.name}</div>
                    </div>
                  )}
                </li>
              </Link>
            ))}

            <div
              className="highlight"
              onClick={(e) => {
                e.preventDefault;
                themeStateController.send("TOGGLE");
              }}
            >
              <li className="ml-3 mb-4 row align-center d-flex flex-nowrap text-truncate ">
                <div className="col-12 align-center text-center p-0">
                  {themeState.matches("darkmode") ? (
                    <MdNightlightRound
                      style={{
                        margin: "0px",
                        padding: "0px",
                      }}
                    />
                  ) : (
                    <MdWbSunny
                      style={{
                        margin: "0px",
                        padding: "0px",
                      }}
                    />
                  )}
                </div>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}
