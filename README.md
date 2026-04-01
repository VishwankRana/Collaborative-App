# Collaborative App

A real-time collaborative document editor built with React, Tiptap, Yjs, WebSockets, Express, and MongoDB.

This project lets multiple users work inside the same document, see live collaboration cursors and organize multiple documents under their account.

## Features

- Real-time collaborative editing with Yjs and WebSockets
- JWT-based authentication with signup and login
- Role-based access control
- Roles: `owner`, `editor`, `viewer`
- Multi-document workspace
- Share document access by email
- Owner-managed collaborator permissions
- Live collaboration cursor UI
- MongoDB persistence for document content
- Modern responsive editor UI

## Tech Stack

- Frontend: React, Vite, React Router, Tiptap
- Realtime: Yjs, `y-websocket`, `ws`
- Backend: Express
- Database: MongoDB with Mongoose
- Auth: Custom JWT implementation
- Styling: CSS + Tailwind

## How It Works

### Authentication

Users can sign up and log in with email and password. After login, the app stores a JWT and uses it for API requests and WebSocket authorization.

### Access Control

Each document supports three roles:

- `owner`: full control, including renaming, deleting, and sharing access
- `editor`: can open and edit the document
- `viewer`: can open the document in read-only mode

### Realtime Collaboration

The editor uses Yjs for shared state and a WebSocket server for live synchronization. Users connected to the same document URL collaborate inside the same room.

### Persistence

Document content is persisted to MongoDB as Yjs state snapshots, so content survives backend restarts.

## Environment Variables

Create a `.env` file in the project root.

- `PORT`: backend server port
- `MONGO_URI` or `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: secret used to sign auth tokens
- `CORS_ORIGIN`: allowed frontend origin for API requests, or `*` for local development
- `VITE_API_BASE_URL`: frontend API base URL
- `VITE_COLLAB_SERVER_URL`: frontend WebSocket server URL for Yjs collaboration
- `ALLOW_START_WITHOUT_DB`: optional, set to `true` to boot the server in degraded local-dev mode when MongoDB is unavailable

## Localhost Setup

For local development, use these values:

```env
PORT=1234
MONGO_URI=mongodb://127.0.0.1:27017/collab-editor
JWT_SECRET=dev-secret-change-me
CORS_ORIGIN=http://localhost:5173
VITE_API_BASE_URL=http://localhost:1234
VITE_COLLAB_SERVER_URL=ws://localhost:1234
```

Run the backend and frontend in separate terminals:

```bash
npm run server
```

```bash
npm run dev
```

Then open `http://localhost:5173`.
