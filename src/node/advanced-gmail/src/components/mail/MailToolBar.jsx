import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/mail.css";
import IconButton from "./IconButton";

function MailToolBar({ onBack, labels, updateMail }) {
  const toggleLabel = (labelName) => {
    if (!labels) return;

    const updatedLabels = labels.includes(labelName)
      ? labels.filter((l) => l !== labelName)
      : [...labels, labelName];

    updateMail(updatedLabels);
  };

  function removeInbox({ SpecialLabels}) {
    if (!labels) return;
    const newLabels = [...labels];
    if (!newLabels.includes(SpecialLabels)) {
      newLabels.push(SpecialLabels);
    }
    const inboxIndex = newLabels.indexOf("Inbox");
    if (inboxIndex !== -1) {
      newLabels.splice(inboxIndex, 1);
    }
    updateMail(newLabels);
  }

  return (
    <div className="mailToolBar col-9">
      <div className="row">
        <div className="d-flex align-items-center gap-5">

          <IconButton icon="bi-arrow-left" onClick={onBack} />

          <span className="badge1 d-flex gap-3">
            <IconButton icon="bi-inbox-fill" onClick={() => { removeInbox({ SpecialLabels: "Archive" });
                alert("Moved to Archive");
                onBack();}} />
            <IconButton icon="bi-exclamation-circle" onClick={() => toggleLabel("Important")} />
            <IconButton
              icon="bi-trash"
              onClick={() => {
                removeInbox({ SpecialLabels: "Trash" });
                alert("Moved to Trash");
                onBack();
              }}
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
