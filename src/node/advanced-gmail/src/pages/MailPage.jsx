import React from "react";
import "../styles/mail.css";
import MailToolBar from "../components/mail/MailToolBar";
import MailContent from "../components/mail/MailContent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function MailPage({ sender, subject, date, labels, onBack, updateMail }) {
  return (
    <div className="mainContainer">
      <MailToolBar onBack={onBack} labels={labels} updateMail={updateMail} />
      <div className="mailContent">
        <MailContent sender={sender} subject={subject} date={date} />
      </div>
    </div>
  );
}



export default MailPage;
