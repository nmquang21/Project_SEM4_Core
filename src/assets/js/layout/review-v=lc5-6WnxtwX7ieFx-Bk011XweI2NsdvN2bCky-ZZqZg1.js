function createReview(n,t,i){Kteam.isAuthenticated()?($("#review-modal").modal("show"),$.ajax({url:i,type:"GET",data:{id:n,type:t},success:function(n){$("#review-modal .block-content").html(n);var t=$("#frm-review");t.submit(function(n){n.preventDefault();$.ajax({url:t.attr("action"),type:t.attr("method"),data:t.serializeArray(),success:function(n){if($("#frm-review span[data-valmsg-replace='true']").empty(),n.code==-2)$("#frm-review span[data-valmsg-for='ReviewStar']").html(n.mess);else if(n.code==1){if(n.isCreate==!0)$("#review-list").prepend(renderReviewItem(n.review));else{if($("#review-"+n.review.Id).length){$("#review-"+n.review.Id+" .review-star").html("");for(var t=1;t<=5;t++)t<=n.review.Rate?$("#review-"+n.review.Id+" .review-star").append('<span class="fa fa-star mr-1 text-warning" ><\/span>'):$("#review-"+n.review.Id+" .review-star").append('<span class="far fa-star mr-1 text-warning" ><\/span>');$("#review-"+n.review.Id+" .review-body").html(n.review.Body)}$("#review-container").load($("#review-container").data("url"))}$("#review-modal").modal("hide");toastr.info("Đánh giá thành công!","Thông báo")}else location.reload()}})})}})):Kteam.showAuthenModal()}function renderReviewItem(n){for(var t,r="",i=1;i<=5;i++)r+=i<=n.Rate?'<span class="fa fa-star mr-1 text-warning" ><\/span>':'<span class="far fa-star mr-1 text-warning" ><\/span>';return t="",($("#common-userId").length&&n.UserId==$("#common-userId").html()||$("#common-roles").length&&$("#common-roles").html().includes("SuperAdmin"))&&(t='<a class="" href="#" onclick="createReview(\''+n.ReviewTargetId+"', '"+n.ReviewTargetType+'\', \'/review/create\'); return false;"><i class="far fa-edit fa-fw"><\/i> Sửa<\/a><a class="text-danger" href="#" onclick="DeleteReview('+n.Id+'); return false;"><i class="far fa-trash-alt fa-fw"><\/i> Xóa<\/a>'),'<div class="comment-item" id="review-'+n.Id+'"><div class="media"><div class="media-left"><a href="/users/'+n.UserId+'"><img class="media-object avatar-sm" src="'+$("#common-avatar").attr("src")+'"><\/a><\/div><div class="media-body"><div class="comment-replacement"><div class="comment-heading text-muted"><a class="comment-author-name" href="/users/'+n.UserId+'">'+$("#common-fullname").html()+"<\/a>"+($("#common-roles").length?'<span class="badge-comment badge-author"><span class="comment-author-name">'+$("#common-roles").html()+"<\/span><\/span>":"")+'<span>đã đánh giá<\/span><strong class="format-time" title="'+Kteam.renderDateTime(n.CreateTime)+'">'+Kteam.renderDateTime(n.CreateTime)+'<\/strong><\/div><div class="review-star">'+r+'<\/div><p class="mb-0 review-body">'+(n.Body!=null?n.Body:"")+'<\/p><\/div><div class="comment-footer">'+t+'<a class="float-right report-discuss" href="#" onclick="Kteam.createReport('+n.Id+', \'Review\'); return false;"><i class="far fa-flag fa-fw" aria-hidden="true"><\/i> Báo cáo<\/a><\/div><\/div><\/div><\/div>'}function DeleteReview(n){var t=confirm("Bạn có chắc chắn muốn xóa đánh giá này không?");t&&$.ajax({url:"/review/delete",type:"POST",data:{id:n},success:function(t){t==!0&&($("#review-"+n).remove(),$("#review-container").load($("#review-container").data("url")))}})}function RenderReviewFromUri(n){for(var t,r="",i=1;i<=5;i++)r+=i<=n.Rate?'<span class="fa fa-star mr-1 text-warning" ><\/span>':'<span class="far fa-star mr-1 text-warning" ><\/span>';return t="",($("#common-userId").length&&n.UserId==$("#common-userId").html()||$("#common-roles").length&&$("#common-roles").html().includes("SuperAdmin"))&&(t='<a class="" href="#" onclick="createReview(\''+n.ReviewTargetId+"', '"+n.ReviewTargetType+'\', \'/review/create\'); return false;"><i class="far fa-edit fa-fw"><\/i> Sửa<\/a><a class="text-danger" href="#" onclick="DeleteReview('+n.Id+'); return false;"><i class="far fa-trash-alt fa-fw"><\/i> Xóa<\/a>'),'<div class="comment-item" id="review-'+n.Id+'"><div class="media"><div class="media-left"><a href="/users/'+n.UserId+'"><img class="media-object avatar-sm" src="'+n.Avatar+'"><\/a><\/div><div class="media-body"><div class="comment-replacement"><div class="comment-heading text-muted"><a class="comment-author-name" href="/users/'+n.UserId+'">'+n.FullName+"<\/a>"+(n.Roles!=null&&n.Roles.length?'<span class="badge-comment badge-author"><span class="comment-author-name">'+n.Roles+"<\/span><\/span>":"")+'<span>đã đánh giá<\/span><strong class="format-time" title="'+Kteam.renderDateTime(n.CreateTime)+'">'+Kteam.renderDateTime(n.CreateTime)+'<\/strong><\/div><div class="review-star">'+r+'<\/div><p class="mb-0 review-body">'+(n.Body!=null?n.Body:"")+'<\/p><\/div><div class="comment-footer">'+t+'<a class="float-right report-discuss" href="#" onclick="Kteam.createReport('+n.Id+', \'Review\'); return false;"><i class="far fa-flag fa-fw" aria-hidden="true"><\/i> Báo cáo<\/a><\/div><\/div><\/div><\/div>'}$(function(){var t=window.location.hash.substr(1),n;t.trim()&&t.includes("review_")&&(n=t.substr(7),n.trim()&&($("#review-"+n).length?$.when(Kteam.scrollToElementDelayed("#review-"+n)).done(function(){$("#review-"+n).css("background-color","#f2ffaa");$("#review-"+n).css("padding","15px");$("#review-"+n).css("transition","all 1s");setTimeout(function(){$("#review-"+n).css("background-color","#f4f4f4")},3e3)}):$.ajax({url:"/review/GetReviewFromUri",type:"GET",data:{id:n},success:function(t){t.code==1&&($("#review-"+n).length||$("#review-list").prepend(RenderReviewFromUri(t.review)),$.when(Kteam.scrollToElementDelayed("#review-"+n)).done(function(){$("#review-"+n).css("background-color","#f2ffaa");$("#review-"+n).css("padding","15px");$("#review-"+n).css("transition","all 1s");setTimeout(function(){$("#review-"+n).css("background-color","#f4f4f4")},3e3)}))}})))});$("#review-list").on("click","#review-show-more",function(){var n=$(this);$.ajax({url:n.attr("data-action"),type:"GET",success:function(t){n.remove();t.trim()&&$("#review-list").append(t)}})});$("#review-modal").on("click","#frm-review .rating > i",function(){var t=parseInt($(this).data("value")),n=$(this).parent().children("i.fa-star");for(i=0;i<n.length;i++)$(n[i]).removeClass("fa").addClass("far");for(i=0;i<t;i++)$(n[i]).addClass("far").addClass("fa");$("#frm-review #ReviewStar").val(t)})