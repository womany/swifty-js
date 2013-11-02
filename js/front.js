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

$('#share').on('click',function(){
  boxVanish = false;
});

document.onmouseup = function() {
  content = window.getSelection();
  // [!!] click submit button should not do anything.
  // if (content.rangeCount > 0 && boxVanish == true) {
  if (content.rangeCount > 0 && boxVanish) {
    shareEventHandler();
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
  // annotation
  var input = document.createElement('input');
  input.type = 'text';
  input.id = 'annotation';
  // input.value = 'add some annotation...';

  // save
  var submit = document.createElement('div');
  submit.id = 'submit';
  var submitText = document.createTextNode('Save');
  submit.appendChild(submitText);

  // fb_share
  var share = document.createElement('input');
  share.type = 'checkbox';
  share.id = 'share';
  share.value = 1;
  // <input type="checkbox" name="vehicle" value="Car">I have a car 

  // var more = document.createElement('div');
  // more.id = 'more';
  // more.value = 1;

  // extend_imgs
  var imgfull = document.createElement('img');
  imgfull.src = chrome.extension.getURL('images/resize-full.png');
  imgfull.id = 'resize-full';
  var img_container = document.createElement('div');
  img_container.id = 'img_container_f';
  img_container.appendChild(imgfull);

  var imgsmall = document.createElement('img');
  imgsmall.src = chrome.extension.getURL('images/resize-small.png');
  imgsmall.id = 'resize-small';
  var img_container_2 = document.createElement('div');
  img_container_2.id = 'img_container_s';
  img_container_2.appendChild(imgsmall);
  
  // tag
  var tag = document.createElement('input');
  tag.type = 'text';
  tag.id = 'tag';

  var div_more = document.createElement('div');
  div_more.appendChild(input);
  div_more.appendChild(tag);
  div_more.appendChild(share);
  div_more.id = 'div_more';

  var div = document.createElement('div');
  div.appendChild(div_more);
  div.appendChild(submit);
  // div.appendChild(more);
  div.appendChild(img_container);
  div.appendChild(img_container_2);
  div.id = 'swifty-light-box';
  
  if (document.body.firstChild){
    document.body.insertBefore(div, document.body.firstChild);
  } else {
    document.body.appendChild(div);
  }
  initialBox()
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
        var tag = $('#swifty-light-box #tag').val();
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
            annotation: annotation,
            tag: tag
          },
          dataType: 'json',
          success: function(data) {
            console.log("success!! ",data);
          },
          error: function(data) {
            console.log("fail.. QQ ",data);
          }
        });
        $('#swifty-light-box').remove();
        boxVanish = true;
    });
  });
}

function initialBox(){
  console.log('initialBoooooooox');
  // initial
  $('#img_container_s').addClass('display-none');
  $('#div_more').addClass('display-none');
  $('#swifty-light-box').addClass('box-small');
  $('#submit').addClass('submit-small');
}


function shareEventHandler() {
  console.log('yooshareEventHandler');
  // $('#img_container_s').addClass('display-none');
  // $('#div_more').addClass('display-none');

  $('#img_container_f').on('click',function(){
    $('#swifty-light-box').remove();
    initialBox();
    boxVanish = false;
    console.log('extenddddd');

    $(this).addClass('display-none');
    $('#img_container_s').removeClass('display-none');
    $('#div_more').removeClass('display-none');

    $('#swifty-light-box').removeClass('box-small');
    $('#swifty-light-box').addClass('box-full');

    $('#submit').removeClass('submit-small');
    $('#submit').addClass('submit-full');

    // $('#annotation').addClass('')
  })  
}