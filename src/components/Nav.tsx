"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Container from "./Container";
import { BsCart4 } from "react-icons/bs";
import useUserBasket from "@/zustand/userBasket/userBasket";
import useUserData from "@/zustand/userData/userData";
import Cookie from 'js-cookie'
const Nav = () => {
  const navActive: string = usePathname();
  const {singOutUser,user} = useUserData()
  const {basket} = useUserBasket()
  const cookie = Cookie.get('token')
  const totalCount = basket.reduce((prevCount, item) => {
    return prevCount + item.qty
  }, 0)

  const singOutHandler = () => {
    singOutUser()
    Cookie?.remove('token')
  }
  return (
    <nav className="p-5 bg-gray-200">
      <Container>
        <div className="flex items-center justify-between">
          <ul className="flex items-center gap-5 ">
                    <li className={`${navActive == '/' &&"text-blue-500"}`}>
                      <Link href='/' >Home</Link>
                    </li>
                    <li className={`${navActive == '/store' &&"text-blue-500"}`}>
                      <Link href='/store' >Store</Link>
                    </li>
                    {user.role === 'admin' ? (<li className={`${navActive == '/dashboard' &&"text-blue-500"}`}>
                      <Link href='/dashboard' >Dashboard</Link>
                    </li>) : ''}
                    {!cookie ? (<li className={`${navActive == '/login' &&"text-blue-500"}`}>
                      <Link href='/login' >Login</Link>
                    </li>) : (
                      <li onClick={singOutHandler} className={`${navActive == '/login' &&"text-blue-500"}`}>
                        <Link href='/store'>LogOut</Link>
                      </li>
                    )}
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
