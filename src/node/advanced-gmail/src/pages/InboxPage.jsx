
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/mail/Sidebar";
import Toolbar from "../components/mail/Toolbar";
import EmailList from "../components/mail/EmailList";
import ComposePage from "./ComposePage";
import MailPage from "./MailPage";
import { fetchMails, updateMail as apiUpdateMail, getUsers } from "../api";
import "../styles/inbox.css";

export default function InboxPage() {
  const [emailList, setEmailList] = useState([]);
  const [users, setUsers] = useState({});
  const [selectedMail, setSelectedMail] = useState(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeInit, setComposeInit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLabel, setSelectedLabel] = useState("Inbox");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function load() {
      try {
        const [mails, userList] = await Promise.all([fetchMails(), getUsers()]);
        const usersById = userList.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        // Normalize: make sure we always have primitive ids for compares
        const normalized = (mails || []).map(m => {
          const toId   = typeof m.to   === "object" && m.to   ? (m.to.id   ?? m.to._id   ?? m.to.userId   ?? m.to)   : m.to;
          const fromId = typeof m.from === "object" && m.from ? (m.from.id ?? m.from._id ?? m.from.userId ?? m.from) : m.from;
          return {
            ...m,
            _toId: toId,
            _fromId: fromId,
            labels: Array.isArray(m.labels) ? m.labels : [] // guard
          };
        });
        setEmailList(normalized);
        setUsers(usersById);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const userMails = useMemo(() => {
    if (!userId) return [];
    return emailList.filter(m => m._toId === userId || m._fromId === userId);
  }, [emailList, userId]);

 
  const labelCounts = useMemo(() => {
    const counts = {};
    for (const m of userMails) {
      const labs = Array.isArray(m.labels) ? m.labels : [];
      // counting each label that appears
      for (const l of labs) counts[l] = (counts[l] || 0) + 1;
      if (labs.length === 0) {
        if (m._toId === userId)   counts["Inbox"] = (counts["Inbox"] || 0) + 1;
        if (m._fromId === userId) counts["Sent"]  = (counts["Sent"]  || 0) + 1;
      }
    }
    return counts;
  }, [userMails, userId]);

  const visibleEmails = useMemo(() => {
    let filtered = [];
    if (selectedLabel === "Inbox") {
      filtered = userMails.filter(m => m._toId === userId && (m.labels || []).includes("Inbox"));
    } else if (selectedLabel === "Sent") {
      filtered = userMails.filter(m => m._fromId === userId && (m.labels || []).includes("Sent"));
    } else if (selectedLabel) {
      filtered = userMails.filter(m => (m.labels || []).includes(selectedLabel));
    }

    const hydrated = filtered.map(m => ({
      ...m,
      from: users[m._fromId] || users[m.from] || { name: "Unknown", avatarUrl: "" },
      to:   users[m._toId]   || users[m.to]   || { name: "Unknown", avatarUrl: "" }
    }));

    const byId = new Map();
    for (const m of hydrated) {
      if (!byId.has(m.id)) byId.set(m.id, m);
    }
    return Array.from(byId.values());
  }, [userMails, selectedLabel, users, userId]);


  const handleUpdateMail = async (mailId, newLabels) => {
     try {
      //Send to server
      const updated = await apiUpdateMail(mailId, { labels: newLabels });
       const nextLabels = Array.isArray(newLabels) ? newLabels : Array.isArray(updated?.labels) ? updated.labels : [];
       // update email list
       setEmailList(prev => prev.map(m => (m.id === mailId ? { ...m, labels: nextLabels } : m)));
       setSelectedMail(prev => (prev && prev.id === mailId ? { ...prev, labels: nextLabels } : prev));
     } catch (e) {
       console.error("Failed to update mail labels", e);
     }
   };

  

  const toggleStarred = (mailId) => {
    const mail = emailList.find(m => m.id === mailId);
    if (!mail) return;
    const labs = Array.isArray(mail.labels) ? mail.labels : [];
    const hasStar = labs.includes("Starred");
    const newLabels = hasStar 
    ? labs.filter(l => l !== "Starred") 
    : [...labs, "Starred"];
    handleUpdateMail(mailId, newLabels);
  };

  const currentUser = users[userId];

  return (
    <div className="container-fluid inboxPage">
      <Toolbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onSearch={setSearchQuery}
        userEmail={currentUser?.email}
      />
      <div className="row">
        <div className="col-2">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            onSelectLabel={setSelectedLabel}
            labelCounts={labelCounts}
            onCompose={() => setIsComposeOpen(true)}
          />
        </div>
        <div className="col-10">
          {isComposeOpen ? (
            <ComposePage
              onClose={() => setIsComposeOpen(false)}
              initialTo={composeInit?.to || ""}
              initialSubject={composeInit?.subject || ""}
              initialBody={composeInit?.body || ""}
            />
          ) : selectedMail ? (
            <MailPage
              {...selectedMail}
              onBack={() => setSelectedMail(null)}
              updateMail={labels => handleUpdateMail(selectedMail.id, labels)}
              onReply={(init) => { setComposeInit(init); setIsComposeOpen(true); }}
            />
          ) : (
            <EmailList
              emailList={visibleEmails}
              onOpenMail={setSelectedMail}
              searchQuery={searchQuery}
              toggleStarred={toggleStarred}
            />
          )}
        </div>
      </div>
    </div>
  );
}
