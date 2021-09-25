function addToGroupChatListSession(n,t,i){for(var f,r=getGroupChatListFromSession(),u=0;u<r.length;u++)if(r[u].rel===n){r.splice(u,1);break}f={id:n.replace("chatbox_",""),rel:n,targetId:t,targetType:i};r.unshift(f);setGroupChatListToSession(r)}function removeFromGroupChatListSession(n){for(var t=getGroupChatListFromSession(),i=0;i<t.length;i++)if(t[i].rel===n){t.splice(i,1);break}setGroupChatListToSession(t)}function getGroupChatListFromSession(){if(typeof Storage!="undefined"){var n=JSON.parse(sessionStorage.getItem("GroupChat"));return n===null&&(n=[]),n}alert("Sorry, your browser does not support Web Storage...")}function setGroupChatListToSession(n){typeof Storage!="undefined"?sessionStorage.setItem("GroupChat",JSON.stringify(n)):alert("Sorry, your browser does not support Web Storage...")}function delay(n,t){var i=0;return function(){var r=this,u=arguments;clearTimeout(i);i=setTimeout(function(){n.apply(r,u)},t||0)}}$(function(){function n(n){var t=!1,i,r;return $("#common-userId").length&&n.UserIdSender===$("#common-userId").html()&&(t=!0),i="/users/"+n.UserIdSender,r=n.MessageText,'<div class="message '+(t===!0?"self":"")+'"><div class="media">'+(t===!0?"":'<div class="media-left pr-10"><a href="'+i+'" title="'+n.UserNameSender+'"><img class="media-object avatar-xs" src="'+n.AvatarSender+'"><\/a><\/div>')+'<div class="media-body">'+(t===!0?'<a class="d-block mb-5" href="'+i+'" title="'+n.UserNameSender+'"><span class="message-date format-time" title="'+Kteam.renderDateTime(n.CreateTime)+'">vài giây trước<\/span><span class="dot">●<\/span><span class="message-username">Bạn<\/span><\/a>':'<a class="d-block mb-5" href="'+i+'" title="'+n.UserNameSender+'"><span class="message-username">'+n.UserNameSender+'<\/span><span class="dot">●<\/span><span class="message-date format-time" title="'+Kteam.renderDateTime(n.CreateTime)+'">vài giây trước<\/span><\/a>')+'<div class="message-content">'+r+"<\/div><\/div><\/div><\/div>"}function t(t){function i(n){var t='<div class="chat-item chat-item-hover " data-toggle="quickview-question" data-title="Câu hỏi" data-href="/question/quickview/'+n.Id+'"><div class="media"><div class="media-body"><span class="media-heading">'+n.Title+'<\/span><div class="chat-item-desc format-time" title="'+Kteam.renderDateTime(n.CreateTime)+'">vài giây trước<\/div><\/div><div class="media-left pl-10"><div data-toggle="tooltip" data-placement="bottom" data-original-title="Chi tiết"><a href="'+n.Url+'" class="text-white btn btn-sm btn-circle" data-toggle="link"><i class="feather-16" data-feather="link-2"><\/i><\/a><\/div><\/div><\/div><\/div>';$("#newest-chatlist-container .chat-list").prepend(t);feather.replace()}t.client.addChatMessage=function(t){var f=$('.chat-box[rel="chatbox_'+t.GroupIdReceiver+'"]'),r,u,i;f.length&&(r=f.find(".chat-body"),r.children(".msg_push").before(n(t)),Kteam.helper("highlightjs"),r.scrollTop(r[0].scrollHeight));u=$('.sidebar-messenger #listgroupchat-container .chat-item[data-groupid="'+t.GroupIdReceiver+'"]');u.length?(u.detach().prependTo(".sidebar-messenger #listgroupchat-container .chat-list"),i=$('[data-toggle="unread-count-chat"][data-id="'+t.GroupIdReceiver+'"]'),i.length&&(t.UserIdSender!=$("#common-userId").html()?(i.html(+i.html()+1),i.closest(".chat-item").addClass("unread")):(i.html(""),i.closest(".chat-item").removeClass("unread")),i.closest(".chat-item").find(".format-time").attr("title",Kteam.renderDateTime(t.CreateTime)).html("vài giây trước"))):$.ajax({method:"POST",url:"/messenger/LoadChatGroupDetails",data:{groupId:t.GroupIdReceiver,targetType:t.GroupTargetType},success:function(n){if(n.IsSuccessed==!0){var i=n.ResultObj,r='<div class="chat-item chat-item-hover '+(i.UnreadCount>0?"unread":"")+'" data-toggle="open-chatbox" data-groupid="'+i.GroupId+'" data-type="'+i.TargetType+'" data-targetid="'+i.TargetId+'"><div class="media"><div class="media-left pr-10"><img class="media-object avatar-sm chat-item-avatar" src="'+i.GroupImage+'"><\/div><div class="media-body"><span class="media-heading">'+i.GroupName+'<\/span><div class="d-flex justify-content-between align-items-center"><div class="chat-item-desc format-time" title="'+Kteam.renderDateTime(t.CreateTime)+'">vài giây trước<\/div><div class="badge badge-danger unread-count" data-toggle="unread-count-chat" data-id="'+i.GroupId+'">'+(i.UnreadCount>0?i.UnreadCount:"")+"<\/div><\/div><\/div><\/div><\/div>";$(".sidebar-messenger #listgroupchat-container .chat-list").prepend(r)}}})};t.client.endChatGroup=function(n){var t=$('.chat-box[rel="chatbox_'+n+'"]');t.length&&(t.find(".chat-header .end-chat").remove(),t.find(".chat-footer").html('<div class="closedchat-footer">Đã đóng<\/div>'))};Kteam.isAuthenticated()?t.client.pushNewestQuestion=function(n){i(n)}:t.client.pushNewestQuestionAnonymous=function(n){i(n)}}var i=$.connection.messageHub;t(i);$.connection.hub.start().done(function(){})});$(document).ready(function(){function u(){for(var i=getGroupChatListFromSession(),n=i.length-1;n>=0;n--)t(i[n].id,i[n].targetId,i[n].targetType)}function t(t,i,u){if(t&&$('.chat-box[rel="chatbox_'+t+'"]').length){var e="chatbox_"+t;addToGroupChatListSession(e,i,u);n();$('.chat-box[rel="'+e+'"] .chat-footer textarea[name="Message"]').focus()}else $.ajax({method:"POST",url:"/messenger/LoadChatGroupDetails",data:{groupId:t,targetType:u,targetId:i},success:function(t){if(t.IsSuccessed==!0){var e=t.ResultObj,o="chatbox_"+e.GroupId;addToGroupChatListSession(o,i,u);$('.chat-box[rel="'+o+'"]').length||(chatPopup='<div class="chat-box" style="display: none;" rel="'+o+'" data-title="'+e.GroupName+'" data-img="'+e.GroupImage+'"><div class="chat-header"><div class="name"><a href="'+e.Url+'"><div class="user-img" style="background-image: url('+e.GroupImage+');"><\/div><\/a><a href="'+e.Url+'"><span>'+e.GroupName+'<\/span><\/a> <\/div><div class="menu-option"><ul>'+(e.Status===2&&e.TargetType===3&&e.IsOwner===!0?'<li class="end-chat"><img src="https://www.howkteam.vn/Content/images/svg/check.svg"><\/li>':"")+'<li class="hide-chat"><img src="https://www.howkteam.vn/Content/images/svg/minus.svg"><\/li><li class="close-chat"><img src="https://www.howkteam.vn/Content/images/svg/x.svg"><\/li><\/ul><\/div><\/div><div class="chat-wrap">'+(e.TargetType===3?'<div class="chat-wrap-detail" data-toggle="quickview-question" data-href="/question/quickview/'+e.TargetId+'">Chi tiết<\/div>':"")+'<div class="chat-body" data-page="1" data-url="/Messenger/LoadListMessageGroupChat/'+e.GroupId+'"><div class="msg_push"><\/div> <\/div><div class="chat-footer">'+(e.Status!==3?'<form action="/Messenger/createchatmessage" class="" method="post" role="form"><div class="row gutters-tiny chat-footer-container"><div class="col-auto"><div class="tool-left" data-toggle="btn-sendmessagecode"><img src="https://www.howkteam.vn/Content/images/svg/code.svg"><\/div><\/div><div class="col"><input name="GroupId" type="hidden" value="'+e.GroupId+'"><textarea row="1" col="10" class="chat-input form-control emojiPicker" name="Message" placeholder="Nhập nội dung..." value=""><\/textarea><\/div><div class="col-auto"><div class="tool-right" data-toggle="btn-sendmessagecode" style="display: none;"><img src="https://www.howkteam.vn/Content/images/svg/align-center.svg"><\/div><div class="tool-right" data-toggle="btn-sendmessage"><img src="https://www.howkteam.vn/Content/images/svg/send.svg"><\/div><\/div><\/div><\/form>':'<div class="closedchat-footer">Đã đóng<\/div>')+"<\/div><\/div><\/div>",$("#chatbox-container").append(chatPopup),r(o),f());n();$('.chat-box[rel="'+o+'"] .chat-footer textarea[name="Message"]').focus()}}})}function n(){var n=1;$(window).width()>1900?n=4:$(window).width()>1199&&(n=3);$("#chatting-container .chat-list").html("");$.each(getGroupChatListFromSession(),function(t,i){if($('.chat-box[rel="'+i.rel+'"]').length)if(t<n)$('.chat-box[rel="'+i.rel+'"]').css("order",n-t),$('.chat-box[rel="'+i.rel+'"]').show();else{$('.chat-box[rel="'+i.rel+'"]').hide();var r='<div class="chat-item chat-item-hover" data-toggle="open-chatbox" data-groupid="'+i.id+'" data-type="'+i.targetType+'" data-targetid="'+i.targetId+'"><div class="media"><div class="media-left pr-10"><img class="media-object avatar-xs chat-item-avatar " src="'+$('.chat-box[rel="'+i.rel+'"]').attr("data-img")+'"><\/div><div class="media-body"><div class="d-flex justify-content-between align-items-baseline"><span class="media-heading">'+$('.chat-box[rel="'+i.rel+'"]').attr("data-title")+'<\/span><div class="badge badge-danger unread-count mr-5" data-toggle="unread-count-chat" data-id="'+i.id+'"><\/div><\/div><\/div><\/div><\/div>';$("#chatting-container .chat-list").append(r)}});$("#chatting-container .chat-list .chat-item").length||$("#chatting-container .chat-list").html('<div class="chat-item">Danh sách trống.<\/div >')}function i(n){var t,i;if(n.find('textarea[name="Message"]').val().trim().length>0){if(t=n.find('textarea[name="Message"]').val(),n.find("#cke_Message").length){if(n.find("#cke_Message iframe").contents().find("body").text().length==0)return}else t=Kteam.textNewLineReplaceToBr(t);i=$('#__AjaxAntiForgeryForm input[name="__RequestVerificationToken"]').val();$.ajax({method:n.attr("method"),url:n.attr("action"),data:{__RequestVerificationToken:i,GroupId:n.find('input[name="GroupId"]').val(),Message:t},success:function(t){t.IsSuccessed==!0?n.find('textarea[name="Message"]').val(""):t.ValidationErrors!=null&&t.ValidationErrors.length?$.each(t.ValidationErrors,function(n,t){toastr.error("Error",t.Pos+": "+t.Error)}):t.Message!=null&&toastr.error("Error",t.Message)}})}}function f(){$(".chat-box .chat-body").scroll(function(){var n=$(this).closest(".chat-box").attr("rel"),t=$(this).scrollTop();t==0&&r(n)})}function r(n){var t=$('.chat-box[rel="'+n+'"] .chat-body'),i=+t.attr("data-page");$.ajax({method:"POST",url:t.attr("data-url"),data:{page:i},success:function(n){if(n.trim()){if(i==1)t.children(".msg_push").before(n),Kteam.helper("highlightjs"),t.scrollTop(t[0].scrollHeight);else{var r=t.scrollTop(),u=t.prepend(n),f=u.outerHeight();t.scrollTop(r+f)}t.attr("data-page",i+1)}}})}u();$(document).on("click",".chat-box .chat-footer .animated-btn",function(){$(this).parents(".add-extent").toggleClass("show")});$(document).on("click",".chat-box .chat-header .close-chat",function(){var t=$(this).closest(".chat-box").attr("rel");$(this).parents(".chat-box").remove();removeFromGroupChatListSession(t);n()});$(document).on("click",".chat-box .chat-header .hide-chat",function(){var n=$(this).closest(".chat-box").attr("rel");$('[rel="'+n+'"] .chat-wrap').slideToggle("fast")});$(document).on("click",'[data-toggle="open-chatbox"]',function(n){var i;if(n.preventDefault(),!Kteam.isAuthenticated()){Kteam.showAuthenModal();return}$(this).closest("#searchchat-modal").length&&$("#searchchat-modal").modal("hide");var r=$(this).attr("data-groupid"),u=$(this).attr("data-type"),f=$(this).attr("data-targetid");t(r,f,u);i=$('[data-toggle="unread-count-chat"][data-id="'+r+'"]');i.length&&(i.html(""),i.closest(".chat-item").removeClass("unread"))});$(document).on("keydown",'.chat-box .chat-footer textarea[name="Message"]',function(n){if(n.which===13&&!n.shiftKey){n.preventDefault();var t=$(this).closest("form");i(t)}});$(document).on("change paste keyup",'.chat-box .chat-footer textarea[name="Message"]',function(){$(this).css("height","28px");$(this).css("height",$(this).prop("scrollHeight")+2+"px")});$(document).on("click",'.chat-box [data-toggle="btn-sendmessage"]',function(n){n.preventDefault();var t=$(this).closest("form");i(t)});$(document).on("click",'.chat-box [data-toggle="btn-sendmessagecode"]',function(n){n.preventDefault();var t=$(this).closest("form");t.find('.tool-left[data-toggle="btn-sendmessagecode"]').parent().toggle();t.find('.tool-right[data-toggle="btn-sendmessagecode"]').toggle();$(this).hasClass("tool-left")?(t.find('textarea[name="Message"]').val(""),t.find('textarea[name="Message"]').ckeditor(function(){},{customConfig:"config_chat.js"/*tpa=https://www.howkteam.vn/Plugins/ckeditor/config_chat.js*/,startupFocus:!0,height:70})):(t.find('textarea[name="Message"]').ckeditor(function(){this.destroy()}),t.find('textarea[name="Message"]').val(""))});$(document).on("click",".chat-box .chat-header .end-chat",function(){var n=$(this).closest(".chat-box"),t=n.find(".chat-footer > form").find('input[name="GroupId"]').val();Swal.fire({title:"Kết thúc",text:"Bạn có muốn đóng cuộc trò chuyện?",showCancelButton:!0}).then(n=>{n.isConfirmed&&Swal.fire({title:"Xác nhận",text:"Xác nhận câu trả lời đúng cho câu hỏi của bạn?",showCancelButton:!0,confirmButtonText:"YES",cancelButtonText:"No"}).then(n=>{$.ajax({method:"POST",url:"/Messenger/CloseChat",data:{groupId:t,isCorrect:n.isConfirmed},success:function(n){n.IsSuccessed==!0||n.Message!=null&&toastr.error("Error",n.Message)}})})})})});$(document).on("click",'[data-toggle="sidebar-messenger-toggle"]',function(n){n.preventDefault();$(".sidebar-messenger").parent().toggleClass("sidebar-messenger-o");$(".btn-sidebarchat-toogle > i").toggleClass("far fas").toggleClass("fa-comments fa-times");$(".sidebar-messenger").parent().hasClass("sidebar-messenger-o")?($("body").css("overflow","hidden"),$("body").append('<div class="sidebar-backdrop fade show"><\/div>')):($("body").css("overflow",""),$(".sidebar-backdrop").remove())});$(document).mouseup(function(n){var t=$(".sidebar-messenger");$(window).width()<=1636&&($('[data-toggle="sidebar-messenger-toggle"]').is(n.target)||$('[data-toggle="sidebar-messenger-toggle"]').has(n.target).length||t.find('[data-toggle="dropdown"]').has(n.target).length||t.find('[role="tablist"]').has(n.target).length||$(".sidebar-messenger:visible").length&&($(".sidebar-messenger").parent().removeClass("sidebar-messenger-o"),$(".btn-sidebarchat-toogle > i").toggleClass("far fas").toggleClass("fa-comments fa-times"),$("body").css("overflow",""),$(".sidebar-backdrop").remove()))});$(document).on("click",'a[data-toggle="link"]',function(n){n.stopPropagation()});$(".sidebar-messenger #listgroupchat-container").scroll(function(){var n=$(this),t=+n.attr("data-page");Math.round(n.scrollTop()+n.innerHeight(),10)+10>=n[0].scrollHeight&&$.ajax({method:"GET",url:n.attr("data-url"),data:{page:t},success:function(i){i.trim()&&(n.children(".chat-list").append(i),n.attr("data-page",t+1))}})});$("#searchchat-modal").on("shown.bs.modal",function(){$('#searchchat-modal input[name="SearchText"]').focus()});$('#searchchat-modal input[name="SearchText"]').keyup(delay(function(){var n=$("#searchchat-modal .chat-list"),t=$('#searchchat-modal input[name="SearchText"]');$.ajax({method:"GET",url:n.attr("data-url"),data:{q:t.val()},success:function(t){t.trim()?n.html(t):n.html("Danh sách trống.")}})},300));$("#createChatRoomForm").submit(function(n){var t=$(this);$.ajax({type:t.attr("method"),url:t.attr("action"),data:t.serialize(),success:function(n){t.find("span[data-valmsg-replace='true']").empty();n.IsSuccessed==!0?window.location.href=n.ResultObj:n.ValidationErrors!=null&&n.ValidationErrors.length?($.each(n.ValidationErrors,function(n,i){t.find("span[data-valmsg-for='"+i.Pos+"']").html(i.Error)}),$btnSubmit.removeAttr("disabled")):n.Message!=null&&toastr.error("Error",n.Message)}});n.preventDefault()});$(document).on("click",'a[data-toggle="closegroupchat"]',function(n){n.preventDefault();var t=$(this).closest(".chat-box"),i=t.find(".chat-footer > form").find('input[name="GroupId"]').val();Swal.fire({title:"Khóa chat",text:"Bạn có muốn đóng cuộc trò chuyện?",showCancelButton:!0}).then(n=>{n.isConfirmed&&Swal.fire({title:"Xác nhận",text:"Xác nhận câu trả lời đúng cho câu hỏi của bạn?",showCancelButton:!0,confirmButtonText:"YES",cancelButtonText:"No"}).then(n=>{$.ajax({method:"POST",url:"/Messenger/CloseChat",data:{groupId:i,isCorrect:n.isConfirmed},success:function(n){n.IsSuccessed==!0||n.Message!=null&&toastr.error("Error",n.Message)}})})})});$(function(){$(document).on("click",'a[data-toggle="button-followtag"]',function(n){if(n.preventDefault(),Kteam.isAuthenticated()){var t=$(this),i=$('#__AjaxAntiForgeryForm input[name="__RequestVerificationToken"]').val();$.ajax({method:"POST",url:"tags/Follow",data:{__RequestVerificationToken:i,tagId:t.attr("data-id")},success:function(n){if(n.IsSuccessed==!0){var i=$('[data-toggle="total-followtag"][data-id="'+t.attr("data-id")+'"]');n.ResultObj==!0?(i.length&&i.html(+i.text()+1),t.toggleClass("btn-alt-primary btn-alt-secondary"),t.html('<i class="fas fa-eye-slash fa-fw"><\/i> Ngừng theo dõi')):(i.length&&i.html(+i.text()-1),t.toggleClass("btn-alt-primary btn-alt-secondary"),t.html('<i class="fas fa-eye fa-fw"><\/i> Theo dõi'))}else n.Message!=null&&toastr.error("Error",n.Message)}})}else Kteam.showAuthenModal()})});Kteam.isAuthenticated()&&($("#createQuesForm #Body").ckeditor(function(){},{customConfig:"config_doc.js"/*tpa=https://www.howkteam.vn/Plugins/ckeditor/config_doc.js*/}),initTagsInput("#createQuesForm #Tags"));$(document).on("click",'a[data-toggle="btn-create-question"]',function(n){n.preventDefault();Kteam.isAuthenticated()?$("#create-question-modal").modal("show"):Kteam.showAuthenModal()});$(document).on("click",'[data-toggle="quickview-question"]',function(n){n.preventDefault();$(this).removeClass("unread");$("#empty-modal-2 .modal-content").html('<div class="modal-body"><i class="fas fa-fw fa-spin fa-sync text-white"><\/i><\/div>');$("#empty-modal-2").modal("show");$.ajax({method:"POST",url:$(this).attr("data-href"),success:function(n){$("#empty-modal-2 .modal-content").html(n)}})})