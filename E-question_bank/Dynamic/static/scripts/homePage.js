$(document).ready(function(){
    
    // Upload Nav bar logics
    var uploadNav = $("#uploadNav")
    var navDisplay = $(".uploadNavElements")

    navDisplay.mouseleave(function(){
        navDisplay.slideUp();
    });
    
    uploadNav.click(function(){
        navDisplay.slideDown();
    });
    
})