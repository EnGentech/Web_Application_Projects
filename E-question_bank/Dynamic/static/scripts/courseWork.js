$(document).ready(function() {
    var selectedCourse = $('.regCourses');
    var cCodeSelect = $('#cCodeSelect');
    var cTitleSelect = $('#cTitleSelect');

    function updateStatus() {
        $(".allDataSchedule").each(function() {
            var startTime = $(this).find(".startDate").text();
            let endTime = $(this).find(".endDate").text()
            var statusCell = $(this).find(".submitStatus");
            var statusLight = $(this).find(".statusLight");
    
            var currentTime = new Date();
            startTime = startTime.split("/")
            endTime = endTime.split("/")
            var startDate = new Date(startTime[2], startTime[1] - 1, startTime[0], 16);
            var endDate = new Date(endTime[2], endTime[1] - 1, endTime[0], 16);
            
            if (startDate > currentTime) {
                statusCell.text("Pending");
                statusLight.css("background-color", "yellow");
            } else if (startDate <= currentTime && endDate > currentTime) {
                statusCell.text("Active");
                statusLight.css("background-color", "green");
            } else {
                statusCell.text("Expired");
                statusCell.css("color", "red");
                statusLight.css("background-color", "red");
            }
        });
    }

    function totalGrade() {
        let totalScore = 0;
        count = 0
        let allScores = $('.allDataSchedule').find(".scores")
        allScores.each(function(index, element) {
            count += 1
            let scoreObtained = $(element).text()
            splitScore = scoreObtained.split("%")
            totalScore += parseInt(splitScore[0])
        })
        let average = totalScore/count
        return average.toFixed(2)
    }

    function updateCountdown(startDate, endDate) {
        let verifyDate = $('.startDate').text()
        
        if (verifyDate) {

            var endDateParts = endDate.split("/");
            var endDateTime = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0], 16);

            var startDateParts = startDate.split("/");
            var startDateTime = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0], 16);

            var now = new Date();
        
            if ((endDateTime <= now) || (startDateTime >= now)) {
                $("#countdown").text("Timer:  Time closed");
            } else {
                var timeDifference = endDateTime - now;
                var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
                hours = hours.toString().padStart(2, '0');
                minutes = minutes.toString().padStart(2, '0');
                seconds = seconds.toString().padStart(2, '0');
            
                $("#countdown").text("Timer:  " + days + "::" + hours + ":" + minutes + ":" + seconds);         
            
            }

            setTimeout(function() {
                updateCountdown(startDate, endDate);
                updateStatus()
            }, 1000);
        } else {
            $("#countdown").text("Timer:  00::00:00:00");
        }
    }

    selectedCourse.click(function() {
        var courseTitle = $(this).text()
        var courseIndex = $(this).index('.regCourses');
        var courseCode = $('.regC_code').eq(courseIndex).text();
        
        cCodeSelect.text(courseCode);
        cTitleSelect.text(courseTitle);

        var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();

        $.ajax({
            url: '/heritage_students/user/courseWork/',
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                courseTitle: courseTitle,
                courseCode: courseCode
            }, 
            success: function(response) {
                let count = 0
                let gradeScore = $("#gradeColor")
                
                var updatedContent = $(response).find('.progressTable').html();
                $('.progressTable').html(updatedContent);
                
                $(response).find('.allDataSchedule').each(function(index, element) {
                    count += 1
                });

                let startDateText = ""
                let startDateCall = $(response).find('.startDate');
                startDateCall.each(function(index, element) {
                    startDateText = $(this).text();
                })

                let endDateText = ""
                let endDateCall = $(response).find('.endDate');
                endDateCall.each(function(index, element) {
                    endDateText = $(element).text();
                })
                
                $('#allTask').text(`All Task: ${count}`);

                updateCountdown(startDateText, endDateText);
                let unitScore = totalGrade()
                gradeScore.text(`${unitScore}%`)

            },
            error: function(xhr, status, error) {
                console.error('AJAX request failed:', error);
            }
        });
        
    });

    var onBoard = $(".statusBoard")
    var onOffcWorkContainer = $(".cWorkContainer")
    let taskTitle = $("#taskTitle")
    let moduleNumber = $("#moduleNumber")

    
    $(document).on('click', '.clickMe', function() {
        var clickedRow = $(this).closest('.allDataSchedule');
        let checkStatus = clickedRow.find(".submitStatus").text()
        var sNo = clickedRow.find('td:nth-child(1)').text();
        var moduleName = clickedRow.find('td:nth-child(2)').text();
        var moduleID = `Module ${sNo}`;
        let courseTitle = $("#cTitleSelect").text()
        $('#noClick').text(courseTitle);
        
        taskTitle.text(moduleName);
        moduleNumber.text(moduleID);

        if (checkStatus === "Expired") {
            alert("Task has expired");
        } else if (checkStatus === "Pending") {
            alert("Task is still pending");
        } else {
            let courseCode = $("#cCodeSelect").text()
            let moduleTitle = $("#taskTitle").text()

            $.ajax({
                url: "/heritage_students/user/validateAssessment/ajax/",
                data: {
                    courseCode: courseCode,
                    moduleTitle: moduleTitle,
                },
                
                success: function (response) {
                    if (response.status === 1) {
                        $(".lightBox").css("background-color", "green");
                        $("#taskRemark").text("Completed")
                        $("#hideIfSubmitted").hide()
                        $("#submitAssessment").hide();
                        $("#hideRemark").css("color", "brown")
                        $("#hideRemark").show()
                    }
                }
            });
            onOffcWorkContainer.hide();
            onBoard.show();
        }
    });
});
