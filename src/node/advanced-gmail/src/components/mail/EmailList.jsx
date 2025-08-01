import EmailItem from "./EmailItem";
import InboxToolbar from "./InboxToolBar";

function EmailList({ emailList = [], labels, onOpenMail , toggleStarred , searchQuery }) {
  return (
    <>
      <InboxToolbar />
      <div className="container ms-auto" style={{ height: "600px", overflowY: "auto" }}>
        <table className="table table-hover align-middle">
          <tbody>
            {emailList
              .filter((email) => {
                // If no search query, show all emails
                if (!searchQuery) return true;
                
                // Search in subject and body
                const lowerQuery = searchQuery.toLowerCase();
                return (
                  (email.subject || "").toLowerCase().includes(lowerQuery) ||
                  (email.body || "").toLowerCase().includes(lowerQuery)
                );
              })
              .map((email, index) => (
                <EmailItem
                  key={email.id || index}
                  {...email}
                  onOpen={() => onOpenMail(email)}
                  onToggleStarred={() => toggleStarred && toggleStarred(index)}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmailList;