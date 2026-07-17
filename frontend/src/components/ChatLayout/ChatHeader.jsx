import { MapPin } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
function ChatHeader({ conversation, currentUser }) {
    const navigate = useNavigate();
  if (!conversation) {
    return (
      <div className="flex h-20 items-center border-b border-slate-200 bg-white px-6">
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    );
  }

  const otherUser =
    conversation.buyer.id === currentUser?.id
      ? conversation.seller
      : conversation.buyer;

  const isWorkChat = !!conversation.workPost;

const image = isWorkChat
  ? "https://placehold.co/80x80?text=Work"
  : conversation.listing?.images?.[0]?.url ||
    "https://placehold.co/80x80";

const title = isWorkChat
  ? conversation.workPost?.title
  : conversation.listing?.title;

const location = isWorkChat
  ? "Campus"
  : conversation.listing?.location;

  return (
    <header
      className="
      border-b
      border-slate-200
      bg-white/95
      backdrop-blur-xl
      "
    >
     <div className="flex items-center justify-between px-3 py-3 sm:px-6 sm:py-5">

        {/* LEFT */}

        <div className="flex items-center gap-3">

  {/* Mobile Back Button */}
  <button
    onClick={() => navigate("/messages")}
    className="
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-full
      hover:bg-slate-100
      lg:hidden
    "
  >
    <ArrowLeft size={22} />
  </button>

  <img
    src={image}
    alt=""
    className="
      h-12
      w-12
      rounded-xl
      object-cover
      shadow-md
      sm:h-14
      sm:w-14
      sm:rounded-2xl
    "
  />

  <div className="min-w-0">

    <h2 className="truncate text-base font-bold text-slate-900 sm:text-lg">
      {title}
    </h2>

    <div className="mt-1 flex items-center gap-2">

      <img
        src={
          otherUser.avatarUrl ||
          `https://ui-avatars.com/api/?name=${otherUser.name}`
        }
        alt=""
        className="h-6 w-6 rounded-full sm:h-7 sm:w-7"
      />

      <span className="truncate text-xs font-medium text-slate-700 sm:text-sm">
        {otherUser.name}
      </span>

    </div>

  </div>

</div>

        {/* RIGHT */}

        <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 md:flex">

          <MapPin size={15} />

          <span className="text-sm text-slate-600">
            {location || "Campus"}
          </span>

        </div>

      </div>
    </header>
  );
}

export default ChatHeader;