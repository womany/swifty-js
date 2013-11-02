var successURL = 'https://www.facebook.com/connect/login_success.html';
function onFacebookLogin() {
  if (!localStorage.accessToken) {
    chrome.tabs.getAllInWindow(null, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].url.indexOf(successURL) == 0) {
          var params = tabs[i].url.split('#')[1];
          access = params.split('&')[0]
          console.log(access);
          localStorage.accessToken = access;
          chrome.tabs.onUpdated.removeListener(onFacebookLogin);
          return;
        }
      }
    });
  }
}
chrome.tabs.onUpdated.addListener(onFacebookLogin);

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    console.log('I am bk, I listen to msg~~~');
    port.postMessage({accessToken: localStorage.accessToken});
  });
});