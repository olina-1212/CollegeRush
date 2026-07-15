import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

      setConversations(res.data.data || []);
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

      await fetchConversation(id);
      await fetchConversations();
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
    navigate(`/chat/${conversationId}`);
  };

  // ---------------------------------------
  // EFFECTS
  // ---------------------------------------

  useEffect(() => {
  fetchCurrentUser();
  fetchConversations();
}, []);

  useEffect(() => {
    fetchConversation(id);
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
          <div
            className="
            grid
            h-[calc(100vh-170px)]
            lg:grid-cols-[340px_1fr]
            "
          >
            {/* Sidebar */}

            <ChatSidebar
    conversations={conversations}
    currentUser={currentUser}
    activeConversationId={id}
    onSelectConversation={openConversation}
/>
            {/* Chat Area */}

            <div className="flex min-h-0 flex-col">

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