import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  Heart,
  MessageCircle,
  Plus,
  Search,
  User,
} from "lucide-react";

import Logo from "../Logo";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";

function Navbar() {
  const { pathname } = useLocation();

  const IconLink = ({ to, Icon, badge }) => (
    <Link
      to={to}
      className={`relative flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-200
      ${
        pathname === to
          ? "bg-blue-600 text-white shadow-lg"
          : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
      }`}
    >
      <Icon size={20} />

      {badge ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      ) : null}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between px-8 xl:px-12">

        <Logo />

        <div className="mx-10 hidden flex-1 lg:block">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <Input
              placeholder="Search books, notes, electronics..."
              className="h-12 rounded-2xl border-0 bg-slate-100 pl-12 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">

          <Button
            asChild
            className="hidden rounded-2xl bg-blue-600 px-5 shadow-md hover:bg-blue-700 md:flex"
          >
            <Link to="/create-listing">
              <Plus className="mr-2 h-4 w-4" />
              Sell / Rent Item
            </Link>
          </Button>

          <IconLink
            to="/wishlist"
            Icon={Heart}
          />

          <IconLink
            to="/messages"
            Icon={MessageCircle}
            badge={3}
          />

          <IconLink
            to="/notifications"
            Icon={Bell}
            badge={2}
          />

          <Link
            to="/profile"
            className="ml-2 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg transition hover:scale-105"
          >
            <User size={20} />
          </Link>

        </div>
      </div>
    </header>
  );
}

export default Navbar;