console.log('Yooooooooooo, I am front.js, I am pretty!! ')

// document.onmousedown = function() {
//   $('#swifty-light-box').css('display','none');   
// }

document.onmouseup = function() {
  content = window.getSelection();
  // [!!] click submit button should not do anything.
  if (content.rangeCount > 0) {
    var range = content.getRangeAt(0);
    if (range.toString()) {
      console.log(event.clientX);
      console.log(event.clientY);
      createDivs(range);
      $('#swifty-light-box').css('top', window.pageYOffset + event.clientY + 10);
      $('#swifty-light-box').css('left', window.pageXOffset + event.clientX) + 10;
    }
  }
};

function createDivs(content) {
  var text = document.createTextNode('Swifttttttttttty');
  var input = document.createElement('input');
  var submit = document.createElement('div');
  submit.id = 'submit';
  var submitText = document.createTextNode('收藏！');
  submit.appendChild(submitText);

  var div = document.createElement('div');
  div.appendChild(text);
  div.appendChild(input);
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
    
    $.ajax({
      url: "http://swifty.dev/api/quotes/",
      type: 'post',
      data: {
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

    $('#swifty-light-box').css('display','none'); 
  })
}