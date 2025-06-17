import React from "react";
import { useState } from "react";
import Sidebar from "../components/mail/Sidebar";
import Toolbar from "../components/mail/Toolbar";
import EmailList from "../components/mail/EmailList";
import MailPage from "./MailPage";
import "../styles/inbox.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function InboxPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMail, setSelectedMail] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("All Mail");

  const [emailList, setEmailList] = useState([
    { sender: "Mark Moss", subject: "...", date: "Jun 12", labels: ["All Mail","Inbox", "Starred" , "Snoozed"] },
    { sender: "Jane Doe", subject: "...", date: "Jun 13", labels: ["All Mail","Inbox", "Starred","Snoozed"] },
    { sender: "Admin", subject: "...", date: "Jun 14", labels: ["All Mail","Inbox"] },
  ]);

  const labelCounts = {};

  emailList.forEach((email) => {
    email.labels.forEach((label) => {
      if (!labelCounts[label]) {
        labelCounts[label] = 1;
      } else {
        labelCounts[label]++;
      }
    });
  });

  

  function toggleStarred(index) {
    console.log("toggleStarred called from mailContent");

    setEmailList(function (previousEmailList) {
      const updatedList = previousEmailList.map(function (email, i) {
        if (i === index) {
          const updatedEmail = { ...email };

          if (email.labels.includes("Starred")) {
            updatedEmail.labels = email.labels.filter(function (label) {
              return label !== "Starred";
            });
          } else {
            updatedEmail.labels = [...email.labels, "Starred"];
          }

          return updatedEmail;
        } else {
          return email;
        }
      });

      return updatedList;
    });
  }



  return (
    <>
      <Toolbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="mainBlock d-flex">
        <Sidebar isSidebarOpen={isSidebarOpen}
          onSelectLabel={setSelectedLabel}
          labelCounts={labelCounts}
        />

        {!selectedMail ? (
          <EmailList onOpenMail={setSelectedMail}
            labels={selectedLabel}
            emailList={emailList}
            setEmailList={setEmailList}
            toggleStarred={toggleStarred}
          />) :
          (<MailPage
            {...selectedMail}
            onBack={() => setSelectedMail(null)}
            updateMail={(newLabels) => {
              const updatedMail = { ...selectedMail, labels: newLabels };

              const updatedList = emailList.map((mail) =>
                mail === selectedMail ? updatedMail : mail
              );

              setEmailList(updatedList);
              setSelectedMail(updatedMail); 
            }}
            toggleStarred={toggleStarred}
          />)}
      </div>
    </>
  );
}

export default InboxPage;
