import { findById, create, findByIdAndUpdate } from "../models/Document";

const defaultValue = "";

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await findById(id);

  if (document) return document;

  return await create({ _id: id, data: defaultValue });
}

export default function (io) {

  io.on("connection", (socket) => {

    socket.on("get-document", async (documentId) => {

      const document = await findOrCreateDocument(documentId);

      socket.join(documentId);

      socket.emit("load-document", document.data);

      socket.on("send-changes", (data) => {
        socket.to(documentId).emit("receive-changes", data);
      });

      socket.on("save-document", async (data) => {
        await findByIdAndUpdate(documentId, { data });
      });

    });

  });

};