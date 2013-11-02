$(document).ready(function () {
  $("#fbLogin").on('click', function () {
    chrome.extension.sendRequest({ msg: "fbLogin" });
  });
});