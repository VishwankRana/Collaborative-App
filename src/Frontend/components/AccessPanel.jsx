import { useMemo, useState } from "react";

export default function AccessPanel({
  collaborators,
  currentRole,
  owner,
  canManageAccess,
  onAddCollaborator,
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const entries = useMemo(() => {
    return [
      {
        id: owner.id,
        name: owner.name,
        email: owner.email,
        role: "owner",
      },
      ...collaborators,
    ];
  }, [collaborators, owner]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await onAddCollaborator({ email, role });
      setEmail("");
      setRole("viewer");
      setMessage("Access updated.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <aside className="access-panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Access control</p>
          <h2>Permissions</h2>
        </div>
        <div className="comment-count">{entries.length}</div>
      </div>

      <p className="comments-subtitle">
        Your role is <strong>{currentRole}</strong>. Owners can invite editors
        and viewers by email.
      </p>

      <div className="access-list">
        {entries.map((entry) => (
          <article className="access-card" key={entry.id}>
            <div>
              <strong>{entry.name}</strong>
              <p>{entry.email}</p>
            </div>
            <span className={`role-pill role-${entry.role}`}>{entry.role}</span>
          </article>
        ))}
      </div>

      {canManageAccess ? (
        <form className="access-form" onSubmit={handleSubmit}>
          <input
            className="comment-input"
            type="email"
            placeholder="Invite by email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <select
            className="role-select"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>

          <button className="comment-submit" disabled={saving} type="submit">
            {saving ? "Saving..." : "Share Access"}
          </button>

          {message ? <p className="access-message">{message}</p> : null}
        </form>
      ) : null}
    </aside>
  );
}
