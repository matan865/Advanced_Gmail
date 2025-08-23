import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/mail.css";
import IconButton from "./IconButton";

function MailToolBar({ onBack, labels, updateMail }) {

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
    const updatedLabels = current.includes(labelName)
      ? current.filter((l) => l !== labelName)
      : [...current, labelName];

    updateMail(updatedLabels);
  };

  return (
    <div className="mailToolBar col-9">
      <div className="row">
        <div className="d-flex align-items-center gap-5">

          <IconButton icon="bi-arrow-left" onClick={onBack} />

          <span className="badge1 d-flex gap-3">
            <IconButton icon="bi-inbox-fill" onClick={() => moveTo("Archive")} />
            <IconButton icon="bi-exclamation-circle" onClick={() => toggleLabel("Important")} />
            <IconButton
              icon="bi-trash"
              onClick={() => moveTo("Trash")}
            />
          </span>



          <span className="badge2 d-flex gap-3">
            <IconButton icon="bi-envelope-arrow-down-fill" onClick={() => toggleLabel("Inbox")} />
            <IconButton icon="bi-folder2-open" />
            <IconButton icon="bi-three-dots" />
          </span>

          <span className="ms-auto"></span>
          <IconButton icon="bi-chevron-left" />
          <IconButton icon="bi-chevron-right" />
        </div>
      </div>
    </div>
  );
}


export default MailToolBar;
