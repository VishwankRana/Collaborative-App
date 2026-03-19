import * as Y from "yjs"
import { WebsocketProvider } from "y-websocket"

export function createProvider(documentId) {
  const websocketUrl =
    import.meta.env.VITE_COLLAB_SERVER_URL ?? "ws://localhost:1234"
  const token = localStorage.getItem("collab-auth-token")

  const ydoc = new Y.Doc()

  const provider = new WebsocketProvider(
    websocketUrl,
    documentId,
    ydoc,
    {
      params: token ? { token } : {},
    }
  )

  return { provider, ydoc }

}
