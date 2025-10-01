
document.getElementById('toggleSidebarBtn').addEventListener('click', function () {
    const sidebar = document.getElementById('desktopSidebar');
    sidebar.classList.toggle('sidebar-hidden');
    sidebar.classList.toggle('sidebar-visible');
});

document.getElementById('inboxTable').onclick = function () {
  location.href = "mail.html";
}
