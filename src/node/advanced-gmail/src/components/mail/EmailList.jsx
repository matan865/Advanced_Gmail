import EmailItem from "./EmailItem";
import InboxToolbar from "./InboxToolBar";

function EmailList({ emailList = [], labels, onOpenMail, toggleStarred, searchQuery }) {
  return (
    <>
      <InboxToolbar />
      <div className="container ms-auto" style={{ height: "600px", overflowY: "auto" }}>
        <table className="table table-hover align-middle">
          <tbody>
            {emailList
              .filter(email => {
                if (!searchQuery) return true;
                const lowerQuery = searchQuery.toLowerCase();
                const fromName = (typeof email.from === 'object' ? email.from.name : email.from) || "";
                const toName = (typeof email.to === 'object' ? email.to.name : email.to) || "";
                return (
                  (email.subject || "").toLowerCase().includes(lowerQuery) ||
                  (email.body || "").toLowerCase().includes(lowerQuery) ||
                  fromName.toLowerCase().includes(lowerQuery) ||
                  toName.toLowerCase().includes(lowerQuery)
                );
              })
              .map(email => (
                <EmailItem
                  key={email.id}
                  {...email}
                  onOpen={() => onOpenMail(email)}
                  onToggleStarred={() => toggleStarred && toggleStarred(email.id)}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmailList;