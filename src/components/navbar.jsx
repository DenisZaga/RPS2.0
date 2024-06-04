'use client'
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "dashboard",
      name: "Dashboard"
    },
    {
      id: 2,
      link: "statistics",
      name: "Statistics"
    },
    {
      id: 4,
      link: "/",
      name: "Signout"
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black nav z-50 overflow-hidden">
      <div>
        <a href="/" className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="h-12 w-12 object-contain" />
        </a>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link, name }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            {id === 4 ? (
              <button onClick={() => signOut({ callbackUrl: '/' })}>{name}</button>
            ) : (
              <Link href={`/${link}`}>{name}</Link>
            )}
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500 overscroll-y-none fixed">
          {links.map(({ id, link, name }) => (
            <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            {id === 4 ? (
              <button onClick={() => signOut({ callbackUrl: '/' })}>{name}</button>
            ) : (
              <Link href={`/${link}`}>{name}</Link>
            )}
          </li>
          ))}
        </ul>
      )}
    </div>
  );
};
