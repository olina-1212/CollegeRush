import { Search } from "lucide-react";
import { useMemo, useState } from "react";

function ChatSidebar({
  conversations,
  currentUser,
  activeConversationId,
  onSelectConversation,
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return conversations;

    return conversations.filter((conversation) => {
      const otherUser =
        conversation.buyerId === currentUser?.id
          ? conversation.seller
          : conversation.buyer;

      return (
        otherUser?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        conversation.listing?.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [search, conversations]);

  return (
    <aside
      className="
      hidden
      h-full
      border-r
      border-slate-200
      bg-white
      lg:flex
      lg:flex-col
      "
    >
      {/* TOP */}

      <div className="border-b border-slate-200 px-7 py-6">

        <h1 className="text-2xl font-bold tracking-tight">
          Messages
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Conversations
        </p>

        <div className="relative mt-5">

          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="
            h-11
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            pl-11
            pr-4
            text-sm
            outline-none
            transition-all
            focus:border-blue-500
            focus:bg-white
            "
          />

        </div>

      </div>

      {/* LIST */}

      <div
        className="
        flex-1
        overflow-y-auto
        px-3
        py-3
        "
      >
        {filtered.length === 0 && (
          <div className="pt-12 text-center text-sm text-slate-400">
            No conversations found.
          </div>
        )}

        {filtered.map((conversation) => {

          const otherUser =
            conversation.buyerId === conversation.currentUserId
              ? conversation.seller
              : conversation.buyer;

          const lastMessage =
            conversation.messages?.[0]?.content ??
            "Start chatting";

          const image =
            conversation.listing?.images?.[0]?.url ||
            "https://placehold.co/60x60";

          const active =
            conversation.id === activeConversationId;

          return (
            <button
              key={conversation.id}
              onClick={() =>
                onSelectConversation(conversation.id)
              }
              className={`
                mb-2
                flex
                w-full
                items-center
                gap-4
                rounded-3xl
                p-4
                text-left
                transition-all
                duration-300

                ${
                  active
                    ? "bg-slate-900 text-white shadow-xl"
                    : "hover:bg-slate-100"
                }
              `}
            >

              {/* Listing */}

              <img
                src={image}
                alt=""
                className="
                h-14
                w-14
                rounded-2xl
                object-cover
                shadow-sm
                "
              />

              <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between">

                  <h3
                    className={`
                    truncate
                    font-semibold
                    ${
                      active
                        ? "text-white"
                        : "text-slate-900"
                    }
                  `}
                  >
                    {otherUser?.name}
                  </h3>

                </div>

                <p
                  className={`
                  mt-1
                  truncate
                  text-sm

                  ${
                    active
                      ? "text-slate-300"
                      : "text-slate-500"
                  }
                `}
                >
                  {conversation.listing?.title}
                </p>

                <p
                  className={`
                  mt-2
                  truncate
                  text-xs

                  ${
                    active
                      ? "text-slate-400"
                      : "text-slate-400"
                  }
                `}
                >
                  {lastMessage}
                </p>

              </div>

            </button>
          );

        })}

      </div>

    </aside>
  );
}

export default ChatSidebar;