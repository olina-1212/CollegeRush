export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User Connected:", socket.id);

    // Join a conversation
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);

      console.log(
        `Socket ${socket.id} joined ${conversationId}`
      );
    });

    // Leave a conversation
    socket.on("leaveConversation", (conversationId) => {
      socket.leave(conversationId);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User Disconnected:", socket.id);
    });
  });
};