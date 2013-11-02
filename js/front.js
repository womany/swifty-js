console.log('Yooooooooooo, I am front.js, I am pretty!! ')
boxVanish = true;
lastX = 0;
lastY = 0;

// $('#swifty-light-box').on('click', function(){
//   boxVanish = false;
// })

// $('body').on('click', function(){
  // console.log(this);
  // if ( ($(this).attr("id") != 'swifty-light-box') && ($(this).attr("id") != 'annotation') && ($(this).attr("id") != 'submit'))
  //   $('#swifty-light-box').remove();
  // console.log('boddddy');
  // $('#swifty-light-box').remove();
  // boxVanish = true;
// })

document.onmouseup = function() {
  content = window.getSelection();
  // [!!] click submit button should not do anything.
  // if (content.rangeCount > 0 && boxVanish == true) {
  if (content.rangeCount > 0) {
    var range = content.getRangeAt(0);
    if (range.toString()) {
      console.log(event.clientX);
      console.log(event.clientY);
      createDivs(range);
      thisY = window.pageYOffset + event.clientY + 10;
      thisX = window.pageXOffset + event.clientX + 10;
      $('#swifty-light-box').css('top', thisY);
      $('#swifty-light-box').css('left', thisX);
      // if( submitBtn == false && lastX != thisX && lastY != thisY){
      //   lastX = thisX;
      //   lastY = thisY;
      
      // }
    }
  }
};

function createDivs(content) {
  var text = document.createTextNode('Swifttttttttttty');
  var input = document.createElement('input');
  input.type = 'text';
  input.id = 'annotation';
  // input.value = 'add some annotation...';
  var submit = document.createElement('div');
  submit.id = 'submit';
  var submitText = document.createTextNode('收藏！');
  submit.appendChild(submitText);

  var share = document.createElement('input');
  share.type = 'checkbox';
  share.id = 'share';
  share.value = 1;
  // <input type="checkbox" name="vehicle" value="Car">I have a car 

  var div = document.createElement('div');
  div.appendChild(text);
  div.appendChild(input);
  div.appendChild(share);
  div.appendChild(submit);
  div.id = 'swifty-light-box';
  
  if (document.body.firstChild){
    document.body.insertBefore(div, document.body.firstChild);
  } else {
    document.body.appendChild(div);
  }
  
  submitDiv(div,content);
}
function submitDiv(div,content){
  $('#submit').on('click', function(){
    console.log('clickkkkkkkkkkkkkkkkkkkk')
    var url = window.location.toString();
    var title = $(document).attr("title");
    var annotation = $('#swifty-light-box input').text();
    getEmail(content);
  })
}

getEmail = function(content){
  content = content.toString();
  accessToken = "";
  var port = chrome.runtime.connect({name: "knockknock"});
  port.postMessage({joke: "Knock knock"});
  port.onMessage.addListener(function(msg) {
    console.log('I am front.js, I am listeing to msg~~~~');
    console.log('give me accessToken!!!: ', msg.accessToken);
    accessToken = msg.accessToken;
    $.getJSON('https://graph.facebook.com/me?'+accessToken)
      .success(function(data){
        var url = window.location.toString();
        var title = $(document).attr("title");
        var annotation = $('#swifty-light-box input').val();
        var share = $('#swifty-light-box #share').val();
        console.log($('#swifty-light-box input'));
        console.log($('#swifty-light-box input').val());
        console.log('content:',content);
        console.log('share:',share);
        console.log('email:',data.email);
        console.log('url:',url);
        console.log('title:',title);
        console.log('annotation:',annotation);
        $.ajax({
          url: "http://swifty.dev/api/quotes/",
          type: 'post',
          data: {
            email: data.email,
            content: content,
            title: title,
            url: url,
            annotation: annotation
          },
          dataType: 'json',
          success: function(data) {
            console.log("success!! ",data);
          },
          error: function(data) {
            console.log("fail.. QQ ",data);
          }
        });
    });
  });
}