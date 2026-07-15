import { MapPin } from "lucide-react";

function ChatHeader({ conversation, currentUser }) {
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

  const image =
    conversation.listing?.images?.[0]?.url ||
    "https://placehold.co/80x80";

  return (
    <header
      className="
      border-b
      border-slate-200
      bg-white/95
      backdrop-blur-xl
      "
    >
      <div className="flex items-center justify-between px-6 py-5">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <img
            src={image}
            alt=""
            className="
            h-14
            w-14
            rounded-2xl
            object-cover
            shadow-md
            "
          />

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              {conversation.listing.title}
            </h2>

            <div className="mt-1 flex items-center gap-2">

              <img
                src={
                  otherUser.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${otherUser.name}`
                }
                alt=""
                className="h-7 w-7 rounded-full"
              />

              <span className="text-sm font-medium text-slate-700">
                {otherUser.name}
              </span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 md:flex">

          <MapPin size={15} />

          <span className="text-sm text-slate-600">
            {conversation.listing.location || "Campus"}
          </span>

        </div>

      </div>
    </header>
  );
}

export default ChatHeader;