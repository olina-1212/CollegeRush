import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../socket/socket";
import api from "../api/apiClient";
import AppShell from "../components/dashboard/AppShell";

import ChatSidebar from "../components/ChatLayout/ChatSidebar";
import ChatHeader from "../components/ChatLayout/ChatHeader";
import ChatMessages from "../components/ChatLayout/ChatMessages";
import MessageInput from "../components/ChatLayout/MessageInput";

function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState(null);

  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // ---------------------------------------
  // LOAD ALL CONVERSATIONS
  // ---------------------------------------

  const fetchConversations = async () => {
    try {
      const res = await api.get("/chat");

    } catch (err) {
      console.error(err);
    }
  };
const fetchCurrentUser = async () => {
  try {
    const res = await api.get("/users/profile");

    setCurrentUser(res.data.data);
  } catch (err) {
    console.error(err);
  }
};
  // ---------------------------------------
  // LOAD CURRENT CHAT
  // ---------------------------------------

  const fetchConversation = async (conversationId) => {
    if (!conversationId) return;

    try {
      setLoading(true);

      const res = await api.get(`/chat/${conversationId}`);

      setConversation(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // SEND MESSAGE
  // ---------------------------------------

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setSending(true);

      await api.post(`/chat/${id}/message`, {
        text: message,
      });

      setMessage("");

    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  // ---------------------------------------
  // OPEN CONVERSATION
  // ---------------------------------------

  const openConversation = (conversationId) => {
    navigate(`/messages/${conversationId}`)
  };

  // ---------------------------------------
  // EFFECTS
  // ---------------------------------------
useEffect(() => {
  const load = async () => {
    await fetchCurrentUser();

    const res = await api.get("/chat");

    const chats = res.data.data || [];

    setConversations(chats);

    if (!id) {
  return;
}
  };

  load(); // ✅ KEEP THIS

  socket.connect();

  return () => {
    socket.disconnect();
  };
}, []);

useEffect(() => {
  if (!id) return;

  fetchConversation(id);

  socket.emit("joinConversation", id);

  const handleNewMessage = (newMessage) => {
    setConversation((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        messages: [...prev.messages, newMessage],
      };
    });
  };

  socket.on("newMessage", handleNewMessage);

  return () => {
    socket.off("newMessage", handleNewMessage);
    socket.emit("leaveConversation", id);
  };
}, [id]);
    return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-6">

        <div
          className="
          overflow-hidden
          rounded-[30px]
          border
          border-slate-200
          bg-white
          shadow-[0_20px_60px_rgba(15,23,42,.08)]
          "
        >
          <div className="flex h-[calc(100dvh-80px)] overflow-hidden">
            {/* Sidebar */}

           <div
  className={`
    ${
      id ? "hidden" : "block"
    }
    w-full
    border-r
    lg:block
    lg:w-[340px]
  `}
>
  <ChatSidebar
    conversations={conversations}
    currentUser={currentUser}
    activeConversationId={id}
    onSelectConversation={openConversation}
  />
</div>
            {/* Chat Area */}

            <div
  className={`
    ${
      id ? "flex" : "hidden"
    }
    min-h-0
    flex-1
    flex-col
    lg:flex
  `}
>

              <ChatHeader
  conversation={conversation}
  currentUser={currentUser}
/>
              <ChatMessages
    loading={loading}
    conversation={conversation}
    currentUser={currentUser}
/>

              <MessageInput
                value={message}
                setValue={setMessage}
                onSend={sendMessage}
                sending={sending}
              />

            </div>

          </div>
        </div>

      </div>
    </AppShell>
  );
}

export default Chat;