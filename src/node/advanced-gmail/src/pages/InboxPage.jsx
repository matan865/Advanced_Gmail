
import React, { useEffect, useMemo, useState } from "react";
import Sidebar   from "../components/mail/Sidebar";
import Toolbar   from "../components/mail/Toolbar";
import EmailList from "../components/mail/EmailList";
import ComposePage from "./ComposePage";
import MailPage    from "./MailPage";
import { fetchMails, updateMail as apiUpdateMail } from "../api";
import "../styles/inbox.css";

export default function InboxPage() {
  const [emailList, setEmailList]       = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLabel, setSelectedLabel] = useState("Inbox");

  useEffect(() => {
    async function load() {
      try {
    //Currently we fetch all mails and compute filtering/counts on the client.
    // TODO(MongoDB) 
    const mails = await fetchMails();
        setEmailList(mails);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const labelCounts = useMemo(() => {
  // TODO(MongoDB)
    const counts = {};
    for (const m of emailList) {
      const labs = Array.isArray(m.labels) ? m.labels : [];
      for (const l of labs) counts[l] = (counts[l] || 0) + 1;
    }
    return counts;
  }, [emailList]);

  const visibleEmails = useMemo(() => {
  // TODO(MongoDB)
    return emailList
      .filter(m => !selectedLabel || (Array.isArray(m.labels) && m.labels.includes(selectedLabel)));
  }, [emailList, selectedLabel]);

  const handleUpdateMail = async (mailId, newLabels) => {
    try {
      await apiUpdateMail(mailId, { labels: newLabels });
      setEmailList(prev => prev.map(m => m.id === mailId ? { ...m, labels: newLabels } : m));
    } catch (e) {
      console.error("Failed to update mail labels", e);
    }
  };

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
            onSelectLabel={setSelectedLabel}
            labelCounts={labelCounts}
            onCompose={() => setIsComposeOpen(true)}
          />
        </div>
        <div className="col-9">
          {isComposeOpen
            ? <ComposePage onClose={() => setIsComposeOpen(false)} />
            : selectedMail
              ? <MailPage
                  {...selectedMail}
                  onBack={() => setSelectedMail(null)}
                  updateMail={(labels) => handleUpdateMail(selectedMail.id, labels)}
                />
              : <EmailList
                  emailList={visibleEmails}
                  onOpenMail={setSelectedMail}
                  searchQuery={searchQuery}
                />}
        </div>
      </div>
    </div>
  );
}
