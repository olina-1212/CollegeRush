import { Send, Paperclip } from "lucide-react";

function MessageInput({
  value,
  setValue,
  onSend,
  sending,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!sending) {
        onSend();
      }
    }
  };

  return (
    <div
      className="
      border-t
      border-slate-200
      bg-white
      px-4
      py-4
      "
    >
      <div
        className="
        mx-auto
        flex
        max-w-3xl
        items-end
        gap-3
        "
      >
        {/* Future attachment button */}

        <button
          type="button"
          className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          text-slate-500
          transition
          hover:bg-slate-100
          "
        >
          <Paperclip size={18} />
        </button>

        {/* Message box */}

        <textarea
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="
          max-h-40
          min-h-[48px]
          flex-1
          resize-none
          rounded-3xl
          border
          border-slate-200
          bg-slate-50
          px-5
          py-3
          text-[15px]
          outline-none
          transition-all
          placeholder:text-slate-400
          focus:border-blue-500
          focus:bg-white
          "
        />

        {/* Send */}

        <button
          disabled={!value.trim() || sending}
          onClick={onSend}
          className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-slate-900
          text-white
          transition-all
          hover:scale-105
          hover:bg-black
          disabled:cursor-not-allowed
          disabled:opacity-40
          "
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;