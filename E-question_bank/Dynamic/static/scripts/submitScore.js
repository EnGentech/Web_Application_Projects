$(document).ready(function(){
    let generateList = $("#genList");
    let arrayList;
    let courseCode = $("#cCode")
    let loadTask = $("#taskName")
    let scoreSection = $("#scoreSection")

    loadTask.on("change", function(){
        scoreSection.hide()
    })

    function onStudentNameChange(mutations) {
        let studentName = $("#fullName").text().trim();
        if (studentName === "-- Select Reg Number --") {
            $("#score").prop("readonly", true);
        } else {
            $("#score").prop("readonly", false);
            $("#score").attr("placeholder", "Enter score")
        }
    }

    function listStudents(filePath) {
        url = '/heritage_students/user/submitAssessment/ajax/'
        let csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
        $.ajax({
            type: "POST",
            url: url,
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                filePath: filePath
            },
            dataType: "json",
            success: function (response) {
                if (response) {
                    loadTask.empty();
                    loadTask.append(`<option value="" disabled selected>Select Task</option>`);
                    let data = response.dataResponse;
                    $.each(data, function(index, element) {
                        loadTask.append(`<option value="${element}">${element}</option>`);
                    });
                }
            }, 
            error: function(error) {
                console.log(error)
            }
        });
    }

    function loadTaskList(){
        loadTask.on("change", function(){
            let task = $(this).val()
            if (task) {
                generateList.show()
            } else {
                generateList.hide()
            }
        })
    }
    
    courseCode.on("change", function(){
        let obtainedCode = $(this).val()
        if (obtainedCode === "CTE431") {
            listStudents("pythonTasks.json")
            loadTaskList()
        } else {
            loadTask.empty();
            loadTask.append(`<option value="" disabled selected>Select Target Task</option>`);
            generateList.hide()
        }
    })

    generateList.click(function(event){
        let cTitle = $("#cTitle").val();
        let faculty = $("#faculty").val();
        let department = $("#department").val();
        let level = $("#level").val();
        let semester = $("#semester").val();
        let courseCode = $("#cCode").val();
        event.preventDefault()

        if (cTitle) {
            let csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
            let url = "/staff/scoreBoard/";
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    courseTitle: cTitle,
                    faculty: faculty,
                    department: department,
                    level: level,
                    semester: semester,
                    courseCode: courseCode,
                    task: loadTask.val()
                },
                dataType: "json",
                headers: {
                    'X-CSRFToken': csrftoken
                },
                success: function (response) {
                    let regNoList = $("#regNo");
                    regNoList.empty();
                    regNoList.append(`<option value="" disabled Selected>Select Reg. Number</option>`);
                    let data = response.data;
                    arrayList = data;
                    if (data){
                        $.each(data, function(index, element) {
                            regNoList.append(`<option value="${index}">${index}</option>`);
                        });
                        scoreSection.show();
                        $("#noneRegistered").hide();
                    } 
                    
                },
                error: function (error) {
                    $("#noneRegistered").show();
                    scoreSection.hide();
                }
            });
        } else {
            alert("All fields are required")
        }
    });

    let regNoList = $("#regNo");

    regNoList.on("change", function(){
        let regNo = $(this).val();
        let fullName = $("#fullName");
        let url = $("#urlLink");
        if (regNo === "Select Reg. Number") {
            fullName.text("-- Select Reg Number --");
            url.attr("href", "#");
        } else {
            let newUrl = arrayList[regNo]["url"];
            url.attr("href", `${newUrl}`);
            fullName.text(arrayList[regNo]["fullName"]);
        }
    });

    // Create a MutationObserver instance
    const observer = new MutationObserver(onStudentNameChange);
    const config = { childList: true, subtree: true };
    observer.observe(document.getElementById("fullName"), config);
    onStudentNameChange();

    let submitBtn = $("#submitScoreSection")
    let scoreTracker = $("#score");

    scoreTracker.on("input", function(){
        let score = $(this).val();
        if (score < 0 || score > 100) {
            setTimeout(() => {
                submitBtn.hide()
                alert("Score must be between 0 and 100");
            }, 200);
        } else {
            submitBtn.show();
        }
    })

});
