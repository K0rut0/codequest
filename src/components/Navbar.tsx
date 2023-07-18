import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 bg-seasalt dark:bg-black text-white w-2/3 mx-auto mb-4">
      <div className="text-2xl font-bold">
        <Link href="/">CodeQuest</Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/problems">Problems</Link>
        </li>
        <li>
          <Link href="/services">Leaderboard</Link>
        </li>
        <li>
          <Link href="/codele">Codele</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
