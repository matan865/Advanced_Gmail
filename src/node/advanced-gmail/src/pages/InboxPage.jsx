import React from "react";
import { useState } from "react";
import Sidebar from "../components/mail/Sidebar";
import Toolbar from "../components/mail/Toolbar";
import EmailList from "../components/mail/EmailList";
import MailPage from "./MailPage";
import ComposePage from "./ComposePage";
import "../styles/inbox.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function InboxPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMail, setSelectedMail] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("All Mail");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");



 const [emailList, setEmailList] = useState([
  { sender: "Mark Moss", subject: "...", date: "Jun 12", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Jane Doe", subject: "...", date: "Jun 13", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Admin", subject: "...", date: "Jun 14", labels: ["All Mail", "Inbox"] },

  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 3", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Project deadline", date: "Jun 5", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "David", subject: "Payment received", date: "Jun 6", labels: ["All Mail", "Inbox"] },
  { sender: "Mark Moss", subject: "New assignment", date: "Jun 7", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Weekly report", date: "Jun 8", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "Admin", subject: "Security alert", date: "Jun 9", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Roy", subject: "Invoice sent", date: "Jun 10", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Welcome to our service", date: "Jun 11", labels: ["All Mail", "Inbox"] },
  { sender: "David", subject: "Reminder: Call tomorrow", date: "Jun 12", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Invoice Update", date: "Jun 14", labels: ["All Mail", "Inbox"] },
  { sender: "Jane Doe", subject: "Password Reset", date: "Jun 15", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Admin", subject: "Billing Issue", date: "Jun 16", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 17", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Vacation Plan", date: "Jun 18", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "System Maintenance", date: "Jun 19", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Project Review", date: "Jun 20", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Promotion Offer", date: "Jun 21", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Admin", subject: "Service Downtime", date: "Jun 22", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Roy", subject: "Customer Feedback", date: "Jun 23", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Weekly Summary", date: "Jun 24", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "Account Suspension", date: "Jun 25", labels: ["All Mail", "Inbox", "Trash"] },

    { sender: "Mark Moss", subject: "...", date: "Jun 12", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Jane Doe", subject: "...", date: "Jun 13", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Admin", subject: "...", date: "Jun 14", labels: ["All Mail", "Inbox"] },

  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 3", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Project deadline", date: "Jun 5", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "David", subject: "Payment received", date: "Jun 6", labels: ["All Mail", "Inbox"] },
  { sender: "Mark Moss", subject: "New assignment", date: "Jun 7", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Weekly report", date: "Jun 8", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "Admin", subject: "Security alert", date: "Jun 9", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Roy", subject: "Invoice sent", date: "Jun 10", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Welcome to our service", date: "Jun 11", labels: ["All Mail", "Inbox"] },
  { sender: "David", subject: "Reminder: Call tomorrow", date: "Jun 12", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Invoice Update", date: "Jun 14", labels: ["All Mail", "Inbox"] },
  { sender: "Jane Doe", subject: "Password Reset", date: "Jun 15", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Admin", subject: "Billing Issue", date: "Jun 16", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 17", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Vacation Plan", date: "Jun 18", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "System Maintenance", date: "Jun 19", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Project Review", date: "Jun 20", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Promotion Offer", date: "Jun 21", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Admin", subject: "Service Downtime", date: "Jun 22", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Roy", subject: "Customer Feedback", date: "Jun 23", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Weekly Summary", date: "Jun 24", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "Account Suspension", date: "Jun 25", labels: ["All Mail", "Inbox", "Trash"] },

    { sender: "Mark Moss", subject: "...", date: "Jun 12", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Jane Doe", subject: "...", date: "Jun 13", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Admin", subject: "...", date: "Jun 14", labels: ["All Mail", "Inbox"] },

  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 3", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Project deadline", date: "Jun 5", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "David", subject: "Payment received", date: "Jun 6", labels: ["All Mail", "Inbox"] },
  { sender: "Mark Moss", subject: "New assignment", date: "Jun 7", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Weekly report", date: "Jun 8", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "Admin", subject: "Security alert", date: "Jun 9", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Roy", subject: "Invoice sent", date: "Jun 10", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Welcome to our service", date: "Jun 11", labels: ["All Mail", "Inbox"] },
  { sender: "David", subject: "Reminder: Call tomorrow", date: "Jun 12", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Invoice Update", date: "Jun 14", labels: ["All Mail", "Inbox"] },
  { sender: "Jane Doe", subject: "Password Reset", date: "Jun 15", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Admin", subject: "Billing Issue", date: "Jun 16", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 17", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Vacation Plan", date: "Jun 18", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "System Maintenance", date: "Jun 19", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Project Review", date: "Jun 20", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Promotion Offer", date: "Jun 21", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Admin", subject: "Service Downtime", date: "Jun 22", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Roy", subject: "Customer Feedback", date: "Jun 23", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Weekly Summary", date: "Jun 24", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "Account Suspension", date: "Jun 25", labels: ["All Mail", "Inbox", "Trash"] },

    { sender: "Mark Moss", subject: "...", date: "Jun 12", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Jane Doe", subject: "...", date: "Jun 13", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Admin", subject: "...", date: "Jun 14", labels: ["All Mail", "Inbox"] },

  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 3", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Project deadline", date: "Jun 5", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "David", subject: "Payment received", date: "Jun 6", labels: ["All Mail", "Inbox"] },
  { sender: "Mark Moss", subject: "New assignment", date: "Jun 7", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Weekly report", date: "Jun 8", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "Admin", subject: "Security alert", date: "Jun 9", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Roy", subject: "Invoice sent", date: "Jun 10", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Welcome to our service", date: "Jun 11", labels: ["All Mail", "Inbox"] },
  { sender: "David", subject: "Reminder: Call tomorrow", date: "Jun 12", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Invoice Update", date: "Jun 14", labels: ["All Mail", "Inbox"] },
  { sender: "Jane Doe", subject: "Password Reset", date: "Jun 15", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Admin", subject: "Billing Issue", date: "Jun 16", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 17", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Vacation Plan", date: "Jun 18", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "System Maintenance", date: "Jun 19", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Project Review", date: "Jun 20", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Promotion Offer", date: "Jun 21", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Admin", subject: "Service Downtime", date: "Jun 22", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Roy", subject: "Customer Feedback", date: "Jun 23", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Weekly Summary", date: "Jun 24", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "Account Suspension", date: "Jun 25", labels: ["All Mail", "Inbox", "Trash"] },

    { sender: "Mark Moss", subject: "...", date: "Jun 12", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Jane Doe", subject: "...", date: "Jun 13", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Admin", subject: "...", date: "Jun 14", labels: ["All Mail", "Inbox"] },

  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 3", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Project deadline", date: "Jun 5", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "David", subject: "Payment received", date: "Jun 6", labels: ["All Mail", "Inbox"] },
  { sender: "Mark Moss", subject: "New assignment", date: "Jun 7", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Weekly report", date: "Jun 8", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "Admin", subject: "Security alert", date: "Jun 9", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Roy", subject: "Invoice sent", date: "Jun 10", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Welcome to our service", date: "Jun 11", labels: ["All Mail", "Inbox"] },
  { sender: "David", subject: "Reminder: Call tomorrow", date: "Jun 12", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Invoice Update", date: "Jun 14", labels: ["All Mail", "Inbox"] },
  { sender: "Jane Doe", subject: "Password Reset", date: "Jun 15", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Admin", subject: "Billing Issue", date: "Jun 16", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 17", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Vacation Plan", date: "Jun 18", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "System Maintenance", date: "Jun 19", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Project Review", date: "Jun 20", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Promotion Offer", date: "Jun 21", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Admin", subject: "Service Downtime", date: "Jun 22", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Roy", subject: "Customer Feedback", date: "Jun 23", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Weekly Summary", date: "Jun 24", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "Account Suspension", date: "Jun 25", labels: ["All Mail", "Inbox", "Trash"] },

    { sender: "Mark Moss", subject: "...", date: "Jun 12", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Jane Doe", subject: "...", date: "Jun 13", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Admin", subject: "...", date: "Jun 14", labels: ["All Mail", "Inbox"] },

  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 3", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Project deadline", date: "Jun 5", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "David", subject: "Payment received", date: "Jun 6", labels: ["All Mail", "Inbox"] },
  { sender: "Mark Moss", subject: "New assignment", date: "Jun 7", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Weekly report", date: "Jun 8", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "Admin", subject: "Security alert", date: "Jun 9", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Roy", subject: "Invoice sent", date: "Jun 10", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Welcome to our service", date: "Jun 11", labels: ["All Mail", "Inbox"] },
  { sender: "David", subject: "Reminder: Call tomorrow", date: "Jun 12", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Invoice Update", date: "Jun 14", labels: ["All Mail", "Inbox"] },
  { sender: "Jane Doe", subject: "Password Reset", date: "Jun 15", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Admin", subject: "Billing Issue", date: "Jun 16", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 17", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Vacation Plan", date: "Jun 18", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "System Maintenance", date: "Jun 19", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Project Review", date: "Jun 20", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Promotion Offer", date: "Jun 21", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Admin", subject: "Service Downtime", date: "Jun 22", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Roy", subject: "Customer Feedback", date: "Jun 23", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Weekly Summary", date: "Jun 24", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "Account Suspension", date: "Jun 25", labels: ["All Mail", "Inbox", "Trash"] },

    { sender: "Mark Moss", subject: "...", date: "Jun 12", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Jane Doe", subject: "...", date: "Jun 13", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Admin", subject: "...", date: "Jun 14", labels: ["All Mail", "Inbox"] },

  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 3", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Project deadline", date: "Jun 5", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "David", subject: "Payment received", date: "Jun 6", labels: ["All Mail", "Inbox"] },
  { sender: "Mark Moss", subject: "New assignment", date: "Jun 7", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Weekly report", date: "Jun 8", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "Admin", subject: "Security alert", date: "Jun 9", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Roy", subject: "Invoice sent", date: "Jun 10", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Welcome to our service", date: "Jun 11", labels: ["All Mail", "Inbox"] },
  { sender: "David", subject: "Reminder: Call tomorrow", date: "Jun 12", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Invoice Update", date: "Jun 14", labels: ["All Mail", "Inbox"] },
  { sender: "Jane Doe", subject: "Password Reset", date: "Jun 15", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Admin", subject: "Billing Issue", date: "Jun 16", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 17", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Vacation Plan", date: "Jun 18", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "System Maintenance", date: "Jun 19", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Project Review", date: "Jun 20", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Promotion Offer", date: "Jun 21", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Admin", subject: "Service Downtime", date: "Jun 22", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Roy", subject: "Customer Feedback", date: "Jun 23", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Weekly Summary", date: "Jun 24", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "Account Suspension", date: "Jun 25", labels: ["All Mail", "Inbox", "Trash"] },

    { sender: "Mark Moss", subject: "...", date: "Jun 12", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Jane Doe", subject: "...", date: "Jun 13", labels: ["All Mail", "Inbox", "Starred", "Snoozed"] },
  { sender: "Admin", subject: "...", date: "Jun 14", labels: ["All Mail", "Inbox"] },

  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 3", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Project deadline", date: "Jun 5", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "David", subject: "Payment received", date: "Jun 6", labels: ["All Mail", "Inbox"] },
  { sender: "Mark Moss", subject: "New assignment", date: "Jun 7", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Weekly report", date: "Jun 8", labels: ["All Mail", "Inbox", "Snoozed"] },
  { sender: "Admin", subject: "Security alert", date: "Jun 9", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Roy", subject: "Invoice sent", date: "Jun 10", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Sarah", subject: "Welcome to our service", date: "Jun 11", labels: ["All Mail", "Inbox"] },
  { sender: "David", subject: "Reminder: Call tomorrow", date: "Jun 12", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Invoice Update", date: "Jun 14", labels: ["All Mail", "Inbox"] },
  { sender: "Jane Doe", subject: "Password Reset", date: "Jun 15", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Admin", subject: "Billing Issue", date: "Jun 16", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Roy", subject: "Meeting follow-up", date: "Jun 17", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Vacation Plan", date: "Jun 18", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "System Maintenance", date: "Jun 19", labels: ["All Mail", "Inbox", "Snoozed"] },

  { sender: "Mark Moss", subject: "Project Review", date: "Jun 20", labels: ["All Mail", "Inbox", "Important"] },
  { sender: "Jane Doe", subject: "Promotion Offer", date: "Jun 21", labels: ["All Mail", "Inbox", "Trash"] },
  { sender: "Admin", subject: "Service Downtime", date: "Jun 22", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "Roy", subject: "Customer Feedback", date: "Jun 23", labels: ["All Mail", "Inbox"] },
  { sender: "Sarah", subject: "Weekly Summary", date: "Jun 24", labels: ["All Mail", "Inbox", "Starred"] },
  { sender: "David", subject: "Account Suspension", date: "Jun 25", labels: ["All Mail", "Inbox", "Trash"] },

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
      <Toolbar
       isSidebarOpen={isSidebarOpen} 
       setIsSidebarOpen={setIsSidebarOpen}
       onSearch={setSearchQuery}
      />

      <div className="mainBlock d-flex">
        <Sidebar isSidebarOpen={isSidebarOpen}
          onSelectLabel={setSelectedLabel}
          labelCounts={labelCounts}
          onCompose={() => setIsComposeOpen(true)}

        />
        {/* To send email */}
        {isComposeOpen ? (
          <ComposePage onClose={() => setIsComposeOpen(false)} />
        ) :
        // If no mail is selected, show the email list
        !selectedMail ? (
          <EmailList onOpenMail={setSelectedMail}
            labels={selectedLabel}
            emailList={emailList}
            setEmailList={setEmailList}
            toggleStarred={toggleStarred}
            searchQuery={searchQuery}
          />) :
        // If a mail is selected, show the mail content
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