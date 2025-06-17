import React from "react";

function EmailItem({ sender, subject, date, labels, onOpen, onToggleStarred }) {
  return (
    <tr className="email-item" role="button" onClick={onOpen}>
      <td><input type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
      <td onClick={(e) => { e.stopPropagation(); onToggleStarred(); }}>
        <i className={`bi ${labels.includes("Starred") ? "bi-star-fill text-warning" : "bi-star"}`}></i>
      </td>
      <td><strong>{sender}</strong></td>
      <td>{subject}</td>
      <td><small className="text-muted">{date}</small></td>
    </tr>
  );
}


export default EmailItem;
