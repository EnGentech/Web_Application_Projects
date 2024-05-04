$(document).ready(function(){

    $.ajax({
        type: "GET",
        url: "/staff/announcement/",
        dataType: "json",
        success: function (response) {
            if (response.announcement) {
                $("#infoUpdate").css("font-weight", "bold")
                $("#infoUpdate").text(response.announcement)
            }
        },
        
    });

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
    
    function updateMarqueeBehavior() {
        var marquee = $('marquee');
        if ($(window).width() < 768) {
            marquee.attr('behavior', 'scroll');
        } else {
            marquee.attr('behavior', 'alternate');
        }
    }

    updateMarqueeBehavior();

    $(window).resize(updateMarqueeBehavior);
    
})
