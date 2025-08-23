import React, { useState } from "react";
import IconButton from "./IconButton";
import "../../styles/sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Sidebar({ isSidebarOpen, onSelectLabel, labelCounts , onCompose, selectedLabel }) {
  const [moreOpen, setMoreOpen] = useState(false);
  return (
    <div
      id="desktopSidebar"
      className={`bg-light p-3 ${isSidebarOpen ? "sidebar-visible" : "sidebar-hidden"}`}>

      {/* Compose */}
      <button className="btn btn-primary btn-compose" onClick={onCompose}>
        <i className="bi bi-pen me-2"></i> Compose
      </button>

      {/* Main list */}
      <ul className="list-group">
        <li className={`list-group-item ${selectedLabel==="Inbox"?"active":""}`}>
          <IconButton icon="bi-inbox" label="Inbox" badge={labelCounts["Inbox"] || 0} onClick={() => onSelectLabel("Inbox")} />
        </li>
        <li className={`list-group-item ${selectedLabel==="Starred"?"active":""}`}>
          <IconButton icon="bi-star" label="Starred" badge={labelCounts["Starred"] || 0} onClick={() => onSelectLabel("Starred")} />
        </li>
        <li className={`list-group-item ${selectedLabel==="Snoozed"?"active":""}`}>
          <IconButton icon="bi-alarm" label="Snoozed" badge={labelCounts["Snoozed"] || 0} onClick={() => onSelectLabel("Snoozed")} />
        </li>
        <li className={`list-group-item ${selectedLabel==="Important"?"active":""}`}>
          <IconButton icon="bi-exclamation-circle-fill" label="Important" badge={labelCounts["Important"] || 0} onClick={() => onSelectLabel("Important")}  />
        </li>
        <li className={`list-group-item ${selectedLabel==="Sent"?"active":""}`}>
          <IconButton icon="bi-send" label="Sent" badge={labelCounts["Sent"] || 0} onClick={() => onSelectLabel("Sent")} />
        </li>
        <li className={`list-group-item ${selectedLabel==="Drafts"?"active":""}`}>
          <IconButton icon="bi-file-earmark-text" label="Drafts" badge={labelCounts["Drafts"] || 0} onClick={() => onSelectLabel("Drafts")}  />
        </li>
      </ul>

      {/* Collapsible "More" section */}
      <ul className="list-group">
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          role="button"
          aria-expanded={moreOpen}
          aria-controls="moreMenuLg"
          onClick={() => setMoreOpen(v => !v)}
        >
          <span>
            <i className={`bi me-2 ${moreOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
            More
          </span>
        </li>

        <div className={`collapse ${moreOpen ? "show" : ""}`} id="moreMenuLg">
          <li className={`list-group-item ${selectedLabel==="Chats"?"active":""}`}>
            <IconButton icon="bi-chat-dots me-2" label="Chats" badge={labelCounts["Chats"] || 0} onClick={() => onSelectLabel("Chats")} />
          </li>
          <li className={`list-group-item ${selectedLabel==="Archive"?"active":""}`}>
            <IconButton icon="bi-inbox-fill me-2" label="Archive" badge={labelCounts["Archive"] || 0} onClick={() => onSelectLabel("Archive")} />
          </li>
          <li className={`list-group-item ${selectedLabel==="All Mail"?"active":""}`}>
            <IconButton icon="bi-envelope-open me-2" label="All Mail" badge={labelCounts["All Mail"] || 0} onClick={() => onSelectLabel("All Mail")} />
          </li>
          <li className={`list-group-item ${selectedLabel==="Spam"?"active":""}`}>
            <IconButton icon="bi-exclamation-octagon me-2" label="Spam" badge={labelCounts["Spam"] || 0} onClick={() => onSelectLabel("Spam")} />
          </li>
          <li className={`list-group-item ${selectedLabel==="Trash"?"active":""}`}>
            <IconButton icon="bi-trash me-2" label="Trash" badge={labelCounts["Trash"] || 0} onClick={() => onSelectLabel("Trash")} />
          </li>
          <li className="list-group-item">
            <IconButton icon="bi-gear me-2" label="Manage labels" />
          </li>
          <li className="list-group-item">
            <IconButton icon="bi-plus me-2" label="Create new label" />
          </li>
        </div>
      </ul>

      {/* Labels */}
      <div className="section-title">Labels</div>
      <ul className="list-group">
        <li className={`list-group-item ${selectedLabel==="Draft"?"active":""}`}>
          <IconButton icon="bi-caret-right" label="Draft" badge={labelCounts["Draft"] || 0} onClick={() => onSelectLabel("Draft")} />
        </li>
        <li className={`list-group-item ${selectedLabel==="Personal"?"active":""}`}>
          <IconButton icon="bi-caret-right" label="Personal" badge={labelCounts["Personal"] || 0} onClick={() => onSelectLabel("Personal")} />
        </li>
        <li className={`list-group-item ${selectedLabel==="Studies"?"active":""}`}>
          <IconButton icon="bi-caret-right" label="Studies" badge={labelCounts["Studies"] || 0} onClick={() => onSelectLabel("Studies")} />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
