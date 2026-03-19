import { useState } from "react";

export default function Comments({ documentId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  function addComment() {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
      text: text.trim(),
      documentId,
    };

    setComments([...comments, newComment]);
    setText("");
  }

  return (
    <aside className="comments-panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Feedback lane</p>
          <h2>Comments</h2>
        </div>
        <div className="comment-count">{comments.length}</div>
      </div>

      <p className="comments-subtitle">
        Keep quick notes and review points linked to <strong>{documentId}</strong>.
      </p>

      <div className="comment-composer">
        <textarea
          className="comment-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave a thoughtful comment..."
          rows={4}
        />

        <button className="comment-submit" onClick={addComment} type="button">
          Add Comment
        </button>
      </div>

      <div className="comment-list">
        {comments.length === 0 ? (
          <div className="comment-empty">
            No comments yet. Start the review conversation here.
          </div>
        ) : (
          comments.map((comment, index) => (
            <article className="comment-card" key={comment.id}>
              <div className="comment-card-header">
                <span>Note {index + 1}</span>
                <span>{new Date(comment.id).toLocaleTimeString()}</span>
              </div>
              <p>{comment.text}</p>
            </article>
          ))
        )}
      </div>
    </aside>
  );
}
