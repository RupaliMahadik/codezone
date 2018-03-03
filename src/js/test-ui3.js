$(document).ready(function(){

    $(".show").click(function() {
        $(this).parents(".product").removeClass("hide_description");
    });
    $(".hide").click(function() {
        $(this).parents(".product").addClass("hide_description");
    });
 
});