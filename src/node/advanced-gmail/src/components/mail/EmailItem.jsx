import React from "react";

function EmailItem({ from, to, subject, body, onOpen, onToggleStarred }) {
  return (
    <tr className="email-item" role="button" onClick={onOpen}>
      <td><input type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
      <td onClick={(e) => { e.stopPropagation(); onToggleStarred && onToggleStarred(); }}>
        <i className="bi bi-star"></i>
      </td>
      <td><strong>{from || "Unknown"}</strong></td>
      <td>{subject || "No Subject"}</td>
      <td><small className="text-muted">{new Date().toLocaleDateString()}</small></td>
    </tr>
  );
}


export default EmailItem;
