import EmailItem from "./EmailItem";
import InboxToolbar from "./InboxToolBar";

function EmailList({ emailList, labels, onOpenMail , toggleStarred , searchQuery }) {
  return (
    <>
      <InboxToolbar />
      <div className="container ms-auto" style={{ height: "600px", overflowY: "auto" }}>
        <table className="table table-hover align-middle">
          <tbody>
            {emailList

              .filter((email) =>(
                email.labels.includes(labels) &&  
              (
                 (email.subject || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                 (email.sender || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                 (email.date || "").toLowerCase().includes(searchQuery.toLowerCase())
              )
              ))
  
              .map((email, index) => (
                <EmailItem
                  key={index}
                  {...email}
                  onOpen={() => onOpenMail(email)}
                  onToggleStarred={() => toggleStarred(index)}
                />
              ))}

          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmailList;