"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center bg-gray">
      <div className="p-2 border border-gray-300 rounded-lg bg-white">
        <div>
          Hello, <span className="font-bold">{session?.user?.name}</span>!
        </div>
      </div>
    </div>
  );
}