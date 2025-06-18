import React from "react";
import IconButton from "./IconButton";
import "../../styles/sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Sidebar({ isSidebarOpen, onSelectLabel, labelCounts , onCompose }) {
  return (
    <div
      id="desktopSidebar"
      className={`bg-light position-fixed p-3 ${isSidebarOpen ? "sidebar-visible" : "sidebar-hidden"}`}>

      {/* Main list */}
      <ul className="list-group">
        <IconButton icon="bi-pen" label="Compose" id="composeBtn" onClick={onCompose}/>
        <IconButton icon="bi-inbox" label="Inbox" badge={labelCounts["Inbox"] || 0} onClick={() => onSelectLabel("Inbox")} />
        <IconButton icon="bi-star" label="Starred" badge={labelCounts["Starred"] || 0} onClick={() => onSelectLabel("Starred")} />
        <IconButton icon="bi-alarm" label="Snoozed" badge={labelCounts["Snoozed"] || 0} onClick={() => onSelectLabel("Snoozed")} />
        <IconButton icon="bi-exclamation-circle-fill" label="Important" badge={labelCounts["Important"] || 0} />
        <IconButton icon="bi-send" label="Sent" badge={labelCounts["Sent"] || 0} onClick={() => onSelectLabel("Sent")} />
        <IconButton icon="bi-file-earmark-text" label="Drafts" badge={labelCounts["Drafts"] || 0} />
      </ul>

      {/* Collapsible "More" section */}
      <ul className="list-group">
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse"
          href="#moreMenuLg"
          role="button"
          aria-expanded="false"
          aria-controls="moreMenuLg"
        >
          <span><i className="bi bi-chevron-down me-2"></i> More</span>
        </li>

        <div className="collapse" id="moreMenuLg">
          <IconButton icon="bi-chat-dots me-2" label="Chats" badge={labelCounts["Chats"] || 0} onClick={() => onSelectLabel("Chats")} />
          <IconButton icon="bi-inbox-fill me-2" label="Archive" badge={labelCounts["Archive"] || 0} onClick={() => onSelectLabel("Archive")} />
          <IconButton icon="bi-envelope-open me-2" label="All Mail" badge={labelCounts["All Mail"] || 0} onClick={() => onSelectLabel("All Mail")} />
          <IconButton icon="bi-exclamation-octagon me-2" label="Spam" badge={labelCounts["Spam"] || 0} onClick={() => onSelectLabel("Spam")} />
          <IconButton icon="bi-trash me-2" label="Trash" badge={labelCounts["Trash"] || 0} onClick={() => onSelectLabel("Trash")} />
          <IconButton icon="bi-gear me-2" label="Manage labels" />
          <IconButton icon="bi-plus me-2" label="Create new label" />
        </div>
      </ul>

      {/* Labels */}
      <h6 className="mt-4 mb-2 text-muted">Labels</h6>
      <ul className="list-group">
        <IconButton icon="bi-caret-right" label="Draft" badge={labelCounts["Draft"] || 0} onClick={() => onSelectLabel("Draft")} />
        <IconButton icon="bi-caret-right" label="Personal" badge={labelCounts["Personal"] || 0} onClick={() => onSelectLabel("Personal")} />
        <IconButton icon="bi-caret-right" label="Studies" badge={labelCounts["Studies"] || 0} onClick={() => onSelectLabel("Studies")} />
      </ul>
    </div>
  );
}

export default Sidebar;
