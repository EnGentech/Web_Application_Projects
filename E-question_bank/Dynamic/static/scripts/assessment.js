$(document).ready(function(){
    let save = $("#submitAssessment").click(function(){
        let userName = $("#userName").text()
        let courseCode = $("#cCodeSelect").text()
        let moduleNo = $("#moduleNumber").text()
        let moduleTitle = $("#taskTitle").text()
        let urlSubmit = $("#urlSubmit").val()
        var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
        $.ajax({
            type: "POST",
            url: "/heritage_students/user/assessment/ajax/",
            data: {
                name: userName,
                courseCode: courseCode,
                moduleNo: moduleNo,
                moduleTitle: moduleTitle,
                urlSubmit: urlSubmit
            },
            headers: {
                'X-CSRFToken': csrftoken
            },
            success: function (response) {
                
            }
        });
    })
})