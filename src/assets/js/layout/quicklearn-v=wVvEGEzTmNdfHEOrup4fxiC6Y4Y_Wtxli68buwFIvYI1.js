function openLeftSideBarQuickView(){$(".quick-view-right-container").hide();$(".quick-view-left-container").show();var n=$(".quick-view-lecture-list");n.html().trim()||$.ajax({method:"GET",url:n.attr("data-action"),data:{courseId:n.attr("data-id"),activeId:n.attr("data-activeId")},success:function(t){n.html(t)}})}function openRightSideBarQuickView(){$(".quick-view-left-container").hide();$(".quick-view-right-container").show()}function clickFirstLecture(){if($(".quick-view-lecture-list  a.list-group-item").length){$(".quick-view-lecture-list  a.list-group-item:first").click();return}setTimeout(clickFirstLecture,250)}$(".btnQuickViewCourse").on("click",function(){var n=$(this);n.attr("data-src")==""?$("#quickViewVideo").hide():($("#quickViewVideo").show(),$("#quickViewVideo").attr("src",n.attr("data-src")));$.ajax({method:"GET",url:n.attr("data-action"),success:function(t){$(".quick-view-content").html(t);Kteam.helper("highlightjs");$(".quick-view-lecture-list").attr("data-id",n.attr("data-id"))}});openRightSideBarQuickView();$(".quick-view-modal").show()});$(document).mouseup(function(n){var t=$(".quick-view-modal > div");t.is(n.target)||t.has(n.target).length!==0||$(".quick-view-modal:visible").length&&($(".quick-view-modal").hide(),$("#quickViewVideo").attr("src",""),$(".quick-view-lecture-list").html(""),openRightSideBarQuickView())});$(".btnQuickLearnCourse").on("click",function(){var n=$(this);$.ajax({method:"GET",url:n.attr("data-action"),success:function(t){$(".quick-view-content").html(t);Kteam.helper("highlightjs");$(".quick-view-lecture-list").attr("data-id",n.attr("data-id"));openLeftSideBarQuickView();clickFirstLecture();$(".quick-view-modal").show()}})});$(".quick-view-lecture-list").on("click",".linkQuickViewLecture",function(){$(".quick-view-lecture-list  a.list-group-item").removeClass("active");var n=$(this);n.addClass("active");n.attr("data-src")==""?$("#quickViewVideo").hide():($("#quickViewVideo").show(),$("#quickViewVideo").attr("src",n.attr("data-src")));$.ajax({method:"GET",url:n.attr("data-action"),success:function(n){$(".quick-view-content").html(n);Kteam.helper("highlightjs")}})});$("#page-container").on("click",".btnQuickViewLecture",function(){var n=$(this);n.attr("data-src")==""?$("#quickViewVideo").hide():($("#quickViewVideo").show(),$("#quickViewVideo").attr("src",n.attr("data-src")));$.ajax({method:"GET",url:n.attr("data-action"),success:function(t){$(".quick-view-content").html(t);Kteam.helper("highlightjs");$(".quick-view-lecture-list").attr("data-id",n.attr("data-courseid"));$(".quick-view-lecture-list").attr("data-activeid",n.attr("data-id"))}});openRightSideBarQuickView();$(".quick-view-modal").show()})