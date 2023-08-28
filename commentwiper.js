// ==UserScript==
// @name         Badge Crafter - Orphanlet
// @version      1.0
// @description  Wipe your steam comments.
// @author       Orphanlet
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @copyright    2023
// @grant        none
// ==/UserScript==
 
var interval = 1000;
 
if (jQuery("[href*='CCommentThread.DeleteComment']").length > 0) {
    jQuery("[href*='CCommentThread.DeleteComment']").after('<a class="actionlink"> | </a><a class="actionlink delAllComments">Delete Everything</a><a class="actionlink"> | </a><a class="actionlink delAuthorComments">Delete Everything From This Author</a>');
    jQuery(".delAllComments").click(function() {
        if (confirm("Are you sure you want to delete all comments?")) {
            var delComments = setInterval(function() {
                if (jQuery("[href*='CCommentThread.DeleteComment']").length > 0) {
                    eval(jQuery("[href*='CCommentThread.DeleteComment']").attr("href"));
                } else {
                    clearInterval(delComments);
                }
            }, interval);
        }
    });
    jQuery(".delAuthorComments").click(function() {
        if (confirm("Are you sure you want to delete all comments from this author?")) {
            var author = jQuery(this).parent().find(".commentthread_author_link").attr("data-miniprofile");
            var delComments = setInterval(function() {
                if (jQuery(".commentthread_comment_author [data-miniprofile=" + author + "]").length > 0) {
                    jQuery(".commentthread_comment_author [data-miniprofile=" + author + "]").each(function() {
                        eval(jQuery(this).parent().find("[href*='CCommentThread.DeleteComment']").attr("href"));
                    });
                } else if (jQuery(".commentthread_pagelinks .active").first().next().length > 0) {
                    jQuery(".commentthread_pagelinks .active").first().next().click();
                } else {
                    clearInterval(delComments);
                }
            }, interval);
        }
    });
}
