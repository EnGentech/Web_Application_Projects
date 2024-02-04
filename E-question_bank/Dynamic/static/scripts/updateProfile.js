$(document).ready(function(){
    var url = '/heritage_students/login/profileUpdate/';

    $('#submitCourseForm').click(function(event){
        event.preventDefault(); 
        let selectedCourses = [];
        let firstName = $('#fName').val();
        let lastName = $('#lName').val();
        let otherName = $('#oName').val();
        let regNo = $('#regNo').val();
        let level = $('#level').val();
        let semester = $('#semester').val();
        let profilePicture = $('#dp')[0].files[0];


        $('#tableBodyContent tr').each(function() {
            var courseCode = $(this).find('td:nth-child(2)').text();
            var courseTitle = $(this).find('td:nth-child(3)').text();
            var isOn = $(this).find('.onOff').text().trim() === 'ON';

            if (isOn) {
                selectedCourses.push({ code: courseCode, title: courseTitle });
            }
        });

        if (!firstName || !lastName || !level || !semester || !profilePicture) {
            alert("Please fill in all required fields");
            return;
        }

        if (selectedCourses.length < 3) {
            alert("Please select at least three courses");
            return;
        }

        var csrfToken = $("[name=csrfmiddlewaretoken]").val();

        var formData = new FormData();
        formData.append('selected_courses', JSON.stringify(selectedCourses));
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('other_name', otherName);
        formData.append('reg_no', regNo);
        formData.append('level', level);
        formData.append('semester', semester);
        formData.append('profile_picture', profilePicture);

        $.ajax({
            method: 'POST',
            url: url,
            headers: {
                "X-CSRFToken": csrfToken
            },
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            success: function (response) {
                window.location.reload()
                console.log(response)
            },
            error: function(error){
                alert("error")
                console.log(error);
            }
        });
    });
});
