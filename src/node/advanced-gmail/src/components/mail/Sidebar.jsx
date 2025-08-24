import React, { useEffect, useState } from "react";
import IconButton from "./IconButton";
import "../../styles/sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getLabels, createLabel as apiCreateLabel } from "../../api";

function Sidebar({ isSidebarOpen, onSelectLabel, labelCounts , onCompose, selectedLabel }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [addingLabel, setAddingLabel] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");
  const [labelsList, setLabelsList] = useState(["Draft","Personal","Studies"]); // default labels

 
  useEffect(() => {
    (async () => {
      try {
        const res = await getLabels();
        const names = Array.isArray(res) ? res.map(l => l?.name ?? l).filter(Boolean) : [];
        const merged = Array.from(new Set([...(labelsList || []), ...names]));
        setLabelsList(merged);
      } catch (e) {
      }
    })();
    
  }, []);

  const handleCreateLabel = async () => {
    const name = (newLabelName || "").trim();
    if (!name) return;
    try {
      try { await apiCreateLabel?.({ name }); } catch (_e) { /* ignore */ }
      setLabelsList(prev => prev.includes(name) ? prev : [...prev, name]);
      setNewLabelName("");
      setAddingLabel(false);
      onSelectLabel?.(name);
    } catch (e) {
      alert("Failed to create label");
    }
  };

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
            {moreOpen ? "Less" : "More"}
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
            {addingLabel ? (
              <div className="d-flex gap-2">
                <input
                  className="form-control form-control-sm"
                  placeholder="New label name"
                  value={newLabelName}
                  onChange={(e) => setNewLabelName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateLabel();
                    if (e.key === "Escape") { setAddingLabel(false); setNewLabelName(""); }
                  }}
                  autoFocus
                />
                <button className="btn btn-sm btn-primary" onClick={handleCreateLabel}>Add</button>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => { setAddingLabel(false); setNewLabelName(""); }}>Cancel</button>
              </div>
            ) : (
              <span role="button" onClick={() => setAddingLabel(true)}>
                <IconButton icon="bi-plus me-2" label="Create new label" />
              </span>
            )}
          </li>
        </div>
      </ul>

      {/* Labels */}
      <div className="section-title">Labels</div>
      <ul className="list-group">
        {labelsList.map((name) => (
          <li key={name} className={`list-group-item ${selectedLabel===name?"active":""}`}>
            <IconButton
              icon="bi-caret-right"
              label={name}
              badge={labelCounts[name] || 0}
              onClick={() => onSelectLabel(name)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
