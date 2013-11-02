console.log('Yooooooooooo, I am front.js, I am pretty!! ')


// $.ajax({
//   url: "/users/monthly_data",
//   data: {
//     year: 2013,
//     month: 12
//   },
//   async: false,
//   dataType: 'json',
//   success: function(data) {
//     console.log(data);
//   },
//   error: function(data) { }
// });

$.getJSON('http://graph.facebook.com/100000202897569?fields=id,name')
.success(function(data){
  console.log(data);
});