import React from "react";

function EmailItem({ from, to, subject, body, labels, onOpen, onToggleStarred, date }) {
  const fromName = typeof from === 'object' && from ? (from.username || from.name || 'Unknown') : (from || 'Unknown');
  const fromAvatar = typeof from === 'object' && from ? from.avatarUrl : undefined;
  const dateStr = date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString();
  const isStarred = labels && labels.includes("Starred");

  return (
    <tr className="email-item" role="button" onClick={onOpen}>
      <td><input type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
      <td onClick={(e) => { e.stopPropagation(); onToggleStarred && onToggleStarred(); }}>
          <i className={`bi ${isStarred ? "bi-star-fill text-warning" : "bi-star"}`}></i>
      </td>
      <td>
        {fromAvatar && (
          <img src={fromAvatar} alt="avatar" className="rounded-circle me-2" style={{ width: 24, height: 24 }} />
        )}
        <strong>{fromName}</strong>
      </td>
      <td>{subject || "No Subject"}</td>
      <td><small className="text-muted">{dateStr}</small></td>
    </tr>
  );
}


export default EmailItem;
