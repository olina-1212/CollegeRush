import { useEffect, useRef } from "react";

function ChatMessages({
  conversation,
  currentUser,
  loading,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversation]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#fafafa]">
        <p className="text-sm text-slate-400">
          Loading conversation...
        </p>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#fafafa]">
        <p className="text-sm text-slate-400">
          Select a conversation
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      flex-1
      overflow-y-auto
      bg-[#fafafa]
      px-5
      py-6
      "
    >
      <div className="mx-auto max-w-3xl space-y-5">

        {conversation.messages.length === 0 && (
          <div className="pt-16 text-center">

            <div
              className="
              inline-flex
              rounded-full
              bg-white
              px-5
              py-3
              shadow
              "
            >
              <p className="text-sm text-slate-500">
                👋 Start the conversation
              </p>
            </div>

          </div>
        )}

        {conversation.messages.map((msg) => {

          const mine =
            msg.senderId === currentUser?.id;

          return (
            <div
              key={msg.id}
              className={`flex ${
                mine
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`
                max-w-[80%]
                rounded-[26px]
                px-5
                py-3
                shadow-sm

                ${
                  mine
                    ? "bg-slate-900 text-white rounded-br-lg"
                    : "bg-white text-slate-900 rounded-bl-lg"
                }
              `}
              >

                <p className="leading-7 break-words">
                  {msg.content}
                </p>

                <p
                  className={`
                  mt-2
                  text-[11px]

                  ${
                    mine
                      ? "text-slate-300"
                      : "text-slate-400"
                  }
                `}
                >
                  {new Date(
                    msg.createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

              </div>

            </div>
          );

        })}

        <div ref={bottomRef} />

      </div>
    </div>
  );
}

export default ChatMessages;