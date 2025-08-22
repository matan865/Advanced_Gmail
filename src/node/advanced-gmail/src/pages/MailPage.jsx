import React from "react";
import "../styles/mail.css";
import MailToolBar from "../components/mail/MailToolBar";
import MailContent from "../components/mail/MailContent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function MailPage({ from, subject, date, body, labels, onBack, updateMail }) {
  const senderName = typeof from === 'object' && from ? (from.username || from.name) : from;
  const fromAvatar = typeof from === 'object' && from ? from.avatarUrl : undefined;
  const fromEmail = typeof from === 'object' && from ? from.email : undefined;
  return (
    <div className="mainContainer">
      <MailToolBar onBack={onBack} labels={labels} updateMail={updateMail} />
      <div className="mailContent">
        <MailContent sender={senderName} subject={subject} date={date} body={body} fromAvatar={fromAvatar} fromEmail={fromEmail} labels={labels} />
      </div>
    </div>
  );
}



export default MailPage;
