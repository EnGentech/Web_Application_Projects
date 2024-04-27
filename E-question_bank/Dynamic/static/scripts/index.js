$(document).ready(function(){

    // var timer;

    // function reloadPage() {
    //     timer = setTimeout(function() {
    //         location.reload();
    //     }, 1000);
    // }

    // $(window).resize(function() {
    //     clearTimeout(timer);
    //     reloadPage();
    // });

    $(".other_nav").hover(function(){
        $(this).css("color", "green")
        $("#default").css("color", "black")
    })

    $(".other_nav").mouseleave(function(){
        $(this).css("color", "black")
        $("#default").css("color", "green")
    })

    $(".rightArrow").click(function(){
        $(this).closest(".content").find("p").toggle();
    });

    setTimeout(function(){
        $(".fadeOff").fadeOut("slow");
    }, 4000)

    var now = new Date();
    var midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    var delay = midnight - now;

    setTimeout(function(){
        makeAjaxRequest();
        setInterval(makeAjaxRequest, 24 * 60 * 60 * 1000);
    }, delay);

    if ($(window).width() <= 1108) {
        $("#menu-icon").click(function(e) {
            e.stopPropagation();
            $(this).toggleClass("menu-open");
            $(".nav-links").toggle();
        });
    
        $(document).click(function(e) {
            if (!$(e.target).closest('.nav-links').length && !$(e.target).closest('#menu-icon').length) {
                $(".menu-icon").removeClass("menu-open");
                $(".nav-links").hide();
            }
        });
    }    
    
})

function makeAjaxRequest() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/heritage_students/user/taskNotification/",
        data: {}, 
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}