import { useEffect, useRef } from "react";
import ChatLoader from "../loaders/ChatLoader";
function ChatMessages({
  conversation,
  currentUser,
  loading,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [conversation?.messages]);

  if (loading) {
  return <ChatLoader />;
}

  if (!conversation) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-sm font-medium text-slate-500">
            Select a conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        flex-1
        overflow-y-auto
        bg-[#f8fafc]
        px-3
        sm:px-5
        py-4
        sm:py-6
      "
    >
      <div className="w-full space-y-3">

        {conversation.messages.length === 0 && (
          <div className="pt-16 text-center">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-5
                py-3
                shadow-sm
                ring-1
                ring-slate-200
              "
            >
              <span>👋</span>
              <p className="text-sm font-medium text-slate-600">
                Start the conversation
              </p>
            </div>
          </div>
        )}

        {conversation.messages.map((msg) => {
          const mine = msg.senderId === currentUser?.id;

          return (
            <div
              key={msg.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[78%]
                  sm:max-w-[72%]
                  rounded-[22px]
                  px-4
                  py-3
                  shadow-[0_4px_14px_rgba(0,0,0,.08)]
                  transition-all
                  duration-200
                  break-words

                  ${
                    mine
                      ? "bg-slate-900 text-white rounded-br-md"
                      : "bg-white border border-slate-200 text-slate-900 rounded-bl-md"
                  }
                `}
              >
                <p className="text-[15px] leading-6 break-words whitespace-pre-wrap">
                  {msg.content}
                </p>

                <div
                  className={`
                    mt-2
                    flex
                    items-center
                    justify-end
                    text-[10px]
                    font-medium
                    ${
                      mine
                        ? "text-slate-300"
                        : "text-slate-400"
                    }
                  `}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} className="h-2" />
      </div>
    </div>
  );
}

export default ChatMessages;