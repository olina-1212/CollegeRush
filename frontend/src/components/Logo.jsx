import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/dashboard"
      className="flex items-center gap-3 transition-transform hover:scale-[1.02]"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg">
        <GraduationCap className="h-6 w-6" />
      </div>

      <div className="leading-tight">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          CollegeSquare
        </h1>

        <p className="text-xs text-slate-500">
          Campus Marketplace
        </p>
      </div>
    </Link>
  );
}

export default Logo;