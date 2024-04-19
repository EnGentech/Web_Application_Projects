$(document).ready(function(){
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

    makeAjaxRequest();
    setInterval(makeAjaxRequest, 12 * 60 * 60 * 1000);
    
})