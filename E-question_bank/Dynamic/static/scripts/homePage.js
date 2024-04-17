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

    let generate = $("#genList")
    generate.click(function(){
        let faculty = $("#faculty").val()
        let department = $("#department").val()
        let level = $("#level").val()
        let semester = $("#semester").val()
        let courseCode = $("#cCode").val()
        let csrftoken = $('input[name="csrfmiddlewaretoken"]').val()

        $.ajax({
            url: "/heritage_students/user/ReturnScores/",
            type: "POST",
            data: {
                faculty: faculty,
                department: department,
                level: level,
                semester: semester,
                cCode: courseCode
            },
            dataType: "json",
            headers: {
                'X-CSRFToken': csrftoken
            },
            success: function(data){
                var dataArray = data.response;
                $('#allscores table tbody tr').remove();

                $.each(dataArray, function(index, value) {
                    var newRow = $("<tr></tr>");
                    newRow.html('');
                    newRow.append(`<td>${index + 1}</td>`);
                    newRow.append(`<td>${value.fullName}</td>`);
                    newRow.append(`<td>${value.regNumber}</td>`);
                    newRow.append(`<td>${value.totalScore}</td>`);
            
                    // Append the new row after the <thead> section
                    $('#allscores table tbody').append(newRow);
                })
            }
        })
    })
    
})