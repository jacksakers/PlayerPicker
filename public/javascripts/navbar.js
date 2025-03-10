// add active class to current tab and remove from others
// get current tab from url
var path = window.location.pathname;
var page = path.split("/").pop();
var currentTab = page.split(".")[0];
if (currentTab === '') {
    currentTab = 'leaderboard';
}
var navItems = document.querySelectorAll('.topnav a');
for (var i = 0; i < navItems.length; i++) {
    navItems[i].classList.remove('active');
}
document.getElementById(currentTab).classList.add('active');