chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    console.log('I am bk, I listen to msg~~~');
    port.postMessage({accessToken: localStorage.accessToken});
  });
});