import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/mail.css";
import IconButton from "./IconButton";
import { getLabels } from "../../api";

function MailToolBar({ onBack, labels, updateMail }) {
  const [showMenu, setShowMenu]   = useState(false);
  const [allLabels, setAllLabels] = useState([]);

  
  useEffect(() => {
    (async () => {
      try {
        const res = await getLabels();
        const names = Array.isArray(res) ? res.map(l => l?.name ?? l).filter(Boolean) : [];
        const system = ["Inbox","Sent","Starred","Important","Snoozed","Archive","Trash","Drafts","Spam","All Mail","Chats","Personal","Studies"];
        const uniq = Array.from(new Set([...names, ...system]));
        setAllLabels(uniq);
      } catch {
        setAllLabels(["Inbox","Sent","Starred","Important","Snoozed","Archive","Trash","Drafts"]);
      }
    })();
  }, []);

  const moveTo = (label) => {
    const current = Array.isArray(labels) ? labels : [];
    const next = current.filter(l => l !== "Inbox");
    if (!next.includes(label)) next.push(label);
    updateMail(next);
    alert(`Moved to ${label}`);
    onBack();
  }

  const toggleLabel = (labelName) => {
    const current = Array.isArray(labels) ? labels : [];
    const updated = current.includes(labelName)
      ? current.filter((l) => l !== labelName)
      : [...current, labelName];
    updateMail(updated);
  };

  const onChooseLabel = (labelName) => {
    const moveSet = new Set(["Inbox","Archive","Trash"]);
    if (moveSet.has(labelName)) {
      moveTo(labelName);
    } else {
      toggleLabel(labelName);
    }
    setShowMenu(false);
  };

  return (
    <div className="mailToolBar col-9">
      <div className="row">
        <div className="d-flex align-items-center gap-5" style={{ position: "relative" }}>

          <IconButton icon="bi-arrow-left" onClick={onBack} />

          <span className="badge1 d-flex gap-3">
            <IconButton icon="bi-inbox-fill" onClick={() => moveTo("Archive")} title="Archive" />
            <IconButton icon="bi-exclamation-circle" onClick={() => toggleLabel("Important")} title="Important" />
            <IconButton
              icon="bi-trash"
              onClick={() => moveTo("Trash")}
              title="Trash"
            />
          </span>

          <span className="badge2 d-flex gap-3">
            <IconButton icon="bi-envelope-arrow-down-fill" onClick={() => toggleLabel("Inbox")} title="Inbox" />
            <IconButton icon="bi-folder2-open" onClick={() => setShowMenu(v => !v)} title="More" />
            
          </span>

          {showMenu && (
            <div className="card position-absolute shadow"
                 style={{ top: 48, right: 120, minWidth: 220, zIndex: 10 }}>
              <div className="card-body p-2" style={{ maxHeight: 240, overflowY: "auto" }}>
                <div className="fw-semibold small px-2 pb-2">Move / Label</div>
                {allLabels.map((l) => (
                  <button
                    key={l}
                    className="dropdown-item d-flex justify-content-between align-items-center"
                    onClick={() => onChooseLabel(l)}
                  >
                    <span>{l}</span>
                    {Array.isArray(labels) && labels.includes(l) && <i className="bi bi-check2"></i>}
                  </button>
                ))}
              </div>
            </div>
          )}

          <span className="ms-auto"></span>
          <IconButton icon="bi-chevron-left" />
          <IconButton icon="bi-chevron-right" />
        </div>
      </div>
    </div>
  );
}


export default MailToolBar;
