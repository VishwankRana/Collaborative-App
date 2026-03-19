import { useState } from "react";

export default function DocumentLibrary({
  documents,
  activeDocId,
  onCreateDocument,
  onOpenDocument,
}) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const ownedDocuments = documents.filter(
    (document) => document.role === "owner",
  );
  const sharedDocuments = documents.filter(
    (document) => document.role !== "owner",
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      await onCreateDocument(title);
      setTitle("");
    } catch (error) {
      setMessage(error.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
  }

  function renderDocumentRow(document) {
    return (
      <div
        className={
          document.docId === activeDocId
            ? "document-link active"
            : "document-link"
        }
        key={document.id}
      >
        <button
          className="document-link-main"
          onClick={() => onOpenDocument(document.docId)}
          type="button"
        >
          <div>
            <strong>{document.title}</strong>
          </div>
          <span className={`role-pill role-${document.role}`}>
            {document.role}
          </span>
        </button>
      </div>
    );
  }

  return (
    <aside className="access-panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Workspace</p>
          <h2>Documents</h2>
        </div>
        <div className="comment-count">{documents.length}</div>
      </div>

      <p className="comments-subtitle">
        Create a new document or jump between the ones you own and the ones
        shared with you.
      </p>

      <form className="access-form" onSubmit={handleSubmit}>
        <input
          className="comment-input"
          type="text"
          placeholder="New document title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button className="comment-submit" disabled={submitting} type="submit">
          {submitting ? "Creating..." : "Add Document"}
        </button>
        {message ? <p className="access-message">{message}</p> : null}
      </form>

      <div className="document-list">
        <section className="document-group">
          <div className="document-group-header">Owned By Me</div>
          {ownedDocuments.length > 0 ? (
            ownedDocuments.map(renderDocumentRow)
          ) : (
            <div className="document-group-empty">No owned documents yet.</div>
          )}
        </section>

        <section className="document-group">
          <div className="document-group-header">Shared With Me</div>
          {sharedDocuments.length > 0 ? (
            sharedDocuments.map(renderDocumentRow)
          ) : (
            <div className="document-group-empty">No shared documents yet.</div>
          )}
        </section>
      </div>
    </aside>
  );
}
