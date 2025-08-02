
import React, { useEffect, useState } from "react";
import Sidebar   from "../components/mail/Sidebar";
import Toolbar   from "../components/mail/Toolbar";
import EmailList from "../components/mail/EmailList";
import ComposePage from "./ComposePage";
import MailPage    from "./MailPage";
import { fetchMails } from "../api";
import "../styles/inbox.css";

export default function InboxPage() {
  const [emailList, setEmailList]       = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const mails = await fetchMails();
        setEmailList(mails);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div className="container-fluid inboxPage">
      <Toolbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onSearch={setSearchQuery}
      />
      <div className="row">
        <div className="col-3">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            onSelectLabel={() => {}}
            labelCounts={{}}
            onCompose={() => setIsComposeOpen(true)}
          />
        </div>
        <div className="col-9">
          {isComposeOpen
            ? <ComposePage onClose={() => setIsComposeOpen(false)} />
            : selectedMail
              ? <MailPage {...selectedMail} onBack={() => setSelectedMail(null)} />
              : <EmailList
                  emailList={emailList}
                  onOpenMail={setSelectedMail}
                  searchQuery={searchQuery}
                />}
        </div>
      </div>
    </div>
  );
}
