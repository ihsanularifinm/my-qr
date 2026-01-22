
export async function onRequest(context) {
  // Check if it's a WebSocket request
  if (context.request.headers.get("Upgrade") !== "websocket") {
    return new Response("Expected Upgrade: websocket", { status: 426 });
  }

  // Create a WebSocket pair
  const [client, server] = Object.values(new WebSocketPair());

  // Accept the server side
  server.accept();
  
  // Close immediately (we just need the handshake success)
  server.addEventListener('message', event => {
      server.send("pong"); // Just say something back
      server.close(); 
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
