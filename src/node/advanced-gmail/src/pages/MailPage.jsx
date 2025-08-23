import React from "react";
import "../styles/mail.css";
import MailToolBar from "../components/mail/MailToolBar";
import MailContent from "../components/mail/MailContent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function MailPage({ from, subject, date, body, labels, onBack, updateMail, onReply }) {
  const senderName = typeof from === 'object' && from ? (from.username || from.name) : from;
  const fromAvatar = typeof from === 'object' && from ? from.avatarUrl : undefined;
  const fromEmail = typeof from === 'object' && from ? from.email : undefined;

  const handleToggleStarred = () => {
    const newLabels = (labels || []).includes("Starred")
      ? (labels || []).filter(l => l !== "Starred")
      : [...(labels || []), "Starred"];
    updateMail(newLabels);
  };

  const handleReply = () => {
    // destination is sender email
    const to = fromEmail || (typeof from === 'object' ? (from.username || from.name || "") : (from || ""));
    
    const subj = (subject || "").toLowerCase().startsWith("re:") ? subject : `Re: ${subject || ""}`;
    const dateStr = date ? new Date(date).toLocaleString() : "";
    const displayFrom = typeof from === 'object' ? (from.name || from.username || from.email || "") : (from || "");
    const quoted = (body || "").split("\n").map(l => `> ${l}`).join("\n");
    const prefillBody = `\n\nOn ${dateStr}, ${displayFrom} wrote:\n${quoted}`;
    // send to InboxPage to open Compose with initial values
    onReply && onReply({ to, subject: subj, body: prefillBody });
  };

  return (
    <div className="mainContainer">
      <MailToolBar onBack={onBack} labels={labels} updateMail={updateMail} />
      <div className="mailContent">
        <MailContent 
          sender={senderName} 
          subject={subject} 
          date={date} 
          body={body} 
          fromAvatar={fromAvatar} 
          fromEmail={fromEmail} 
          labels={labels} 
          onToggleStarred={handleToggleStarred}
          onReply={handleReply}
        />
      </div>
    </div>
  );
}



export default MailPage;
