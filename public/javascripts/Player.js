$(function () {

  //allows to toggle
  $('ol').hide();
  $('.mainIdeaDiv ul div').hide();

  //saving a new idea and prepending to the profile page
  $('#submitButton').on('click',function(){
    var idea = {
      "title" : $('#title').val(),
      "content" : $('#content').val(),
      "tag" : $('#tag').val(),
      "github_repo" : $('#github-url').val()
      };
    $.ajax({
      url: '/save/idea',
      dataType: 'json',
      type: 'post',
      data: idea
    }).done(function(data){
      console.log(data);
      var div = $('<div id=" '+ data.id +' "></div>').addClass("individual-idea-container");
      var li = '<h3><li>'+ data.title +'</li></h3>';
      var li2 = $('<li>' + data.content +'</li>').addClass("stats");
      var li3 = $('<li><li>').attr('id', 'idea-comments');
      var input = '<input id="comment" type="text" name="comment" placeholder="add a comment">';
      var button = '<button id=" '+ data.id * 2 +' " class="commentButton">submit</button>';
      var ideaForm = div.append(li).append(li2).append(li3).append(input).append(button).css("list-style-type", "none");
      $('#' + data.user_id).prepend(ideaForm);
    });
    $('#title').val('');
    $('#content').val('');
    $('#tag').val('');
    $('#github-url').val('');
  });

  //adding slide functionality to comments on the index page
  $('.indexCommentButton').on('click', function(){
    var indexIdeaId = this.id.split('_')[1];
    $('#'+indexIdeaId+' ol').slideToggle("slow");
  });


    //adding slide functionality to comments on the individual user pages
  $('.profileCommentButton').on('click', function(){
    var profileIdeaId = this.id.split('_')[1];
    // $('#idea_comments_'+profileIdeaId)
    $('#'+profileIdeaId+' ul div').slideToggle("slow");
  });


  //when commenting on a user's profile page
  $('.userCommentButton').on('click', function(){
    var ideaId = this.id.split('_')[1];
    console.log(ideaId);
    text = $('#profileCommentBox_'+ideaId).val();
    console.log(text);
    var comment = {"content" : text,
                   "ideaId" : ideaId
                  };
    console.log(comment);
    $.ajax({
    url: '/comments',
    dataType: 'json',
    type: 'post',
    data: comment
    }).done(function(data){
    console.log(data);
    var li = '<li>' + text + '</li>';
    var div = '<div class="span9 offset2" id="idea-comments">'+li+'</div>';
    // var liSmall = '<li><small><cite title="Source Title">'+data.user.email+'<li><small><cite title="Source Title">';
    $('#'+ ideaId +' ul').first().prepend(div);
    });
    $('#profileCommentBox_'+ideaId).val('');
  });


  //when commenting from the main idea page
  $('.mainCommentButton').on('click', function(){
    ideaId = this.id / 2;
    text = $('#mainComment' + ideaId).val();
    console.log(text);
    var comment = {"content" : text,
                   "ideaId" : ideaId
                  };
    console.log(comment);
    $.ajax({
    url: '/comments',
    dataType: 'json',
    type: 'post',
    data: comment
    }).done(function(data){
    console.log(data);
    var li = '<li>' + text + '</li>';
    $('#'+ ideaId +' ol').prepend(li);
    });
    $('#mainComment' + ideaId).val('');
  });


  //for voting on the index page
  $('.voteButton').on('click', function(){
    console.log(this.id);
    var voteIdeaId = this.id.split('_')[1];
    var vote = {"id" : voteIdeaId};
    $.ajax({
      url: '/votes',
      dataType: 'script',
      type: 'post',
      data: vote
    }).done(function(data){
      console.log(data);
    });
    $('#vote_'+voteIdeaId).remove();
  });


  //hiding and showing gitHub URL on profile page for entering a project
  $('input[name=idea]').on('click', function(){
     $('input[name=project]').attr('checked',false);
     $('#project-input').slideUp("slow");
   });

  $('input[name=project]').on('click', function(){
     $('input[name=idea]').attr('checked',false);
     $('#project-input').slideToggle("slow");
   });


  $('#project-input').hide();
  // $('#tagSearchBox');


  //searching by tag on the index page
  $('#indexTagSearchButton').on('click', function(){
    var tag = {"name" : $('#indexTagText').val()};
      $.ajax({
      url: '/index/tags',
      dataType: 'script',
      type: 'get',
      data: tag
      }).done(function(data){
      console.log(data);
    });
    $('#indexTagText').val('');
  });


  //searching by tag on the profile or show page
  $('.tagSearchButton').on('click', function(){
    var userTagId = this.id.split('_')[1];
    console.log(userTagId);
    var tag = {"name" : $('#tagText').val(),
              "userId" : userTagId
              };
      console.log(tag);
      $.ajax({
      url: '/user/tags',
      dataType: 'script',
      type: 'get',
      data: tag
      }).done(function(data){
      console.log(data);
    });
    $('#tagText').val('');
  });



  $('img').on('click', function(){
  });

});