"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Container from "./Container";
import { BsCart4 } from "react-icons/bs";
import useUserBasket from "@/zustand/userBasket/userBasket";

const Nav = () => {
  const navActive: string = usePathname();
  const navigationLinks = [
    { pathname: "Home", link: "/" },
    { pathname: "Store", link: "/store" },
    { pathname: "Dashboard", link: "/dashboard" },
  ];
  const {basket} = useUserBasket()
  const totalCount = basket.reduce((prevCount, item) => {
    return prevCount + item.qty
  }, 0)
  return (
    <nav className="p-5 bg-gray-200">
      <Container>
        <div className="flex items-center justify-between">
          <ul className="flex items-center gap-5 ">
            {navigationLinks
              ? navigationLinks.map((navigationData) => {
                  return (
                    <li
                      className={`${
                        navActive == navigationData.link &&
                        "text-blue-500"
                      }`}
                      key={navigationData.link}
                    >
                      <Link href={navigationData.link}>
                        {navigationData.pathname}
                      </Link>
                    </li>
                  );
                })
              : ""}
          </ul>
          <Link href='/basket'>
          <button className="bg-blue-400 py-2 px-5 rounded relative">
            <div className="absolute top-[-10px] right-[-5px] rounded-full bg-black text-white px-2">{totalCount}</div>
            <BsCart4 className="font-bold text-2xl"/>
            </button>
          </Link>
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
