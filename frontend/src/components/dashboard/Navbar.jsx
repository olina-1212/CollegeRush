import { Link, useLocation } from "react-router-dom";
import {
  MessageCircle,
  Plus,
  Search,
  User,
} from "lucide-react";

import Logo from "../Logo";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";

function Navbar({ search, setSearch }) {
  const { pathname } = useLocation();

  const IconLink = ({ to, Icon }) => (
    <Link
      to={to}
      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200
      ${
        pathname === to
          ? "bg-blue-600 text-white shadow-lg"
          : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
      }`}
    >
      <Icon size={20} />
    </Link>
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center gap-3 px-4 sm:h-20 sm:px-6 lg:px-8 xl:px-12">
          {/* Logo */}
          <Logo />

          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <Input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search..."
  className="h-10 rounded-xl border-0 bg-slate-100 pl-11 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 sm:h-11"
/>
            </div>
          </div>

          {/* Desktop Sell Button */}
          <Button
            asChild
            className="hidden rounded-2xl bg-blue-600 px-5 shadow-md hover:bg-blue-700 md:flex"
          >
            <Link to="/create-listing">
              <Plus className="mr-2 h-4 w-4" />
              Sell / Rent Item
            </Link>
          </Button>

          {/* Chat */}
          <IconLink
            to="/messages"
            Icon={MessageCircle}
          />

          {/* Profile */}
          <Link
            to="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg transition hover:scale-105 sm:h-11 sm:w-11"
          >
            <User size={20} />
          </Link>
        </div>
      </header>

      {/* Mobile Floating Action Button */}
      <Link
        to="/create-listing"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition hover:scale-105 md:hidden"
      >
        <Plus size={26} />
      </Link>
    </>
  );
}

export default Navbar;