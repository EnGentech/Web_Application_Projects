$(document).ready(function() {
    var selectedCourse = $('.regCourses');
    var cCodeSelect = $('#cCodeSelect');
    var cTitleSelect = $('#cTitleSelect');

    selectedCourse.click(function() {
        var courseTitle = $(this).text()
        var courseIndex = $(this).index('.regCourses');
        var courseCode = $('.regC_code').eq(courseIndex).text();
        
        cCodeSelect.text(courseCode);
        cTitleSelect.text(courseTitle);
    });

    var lunchStatusBoard = $(".clickMe")
    var onBoard = $(".statusBoard")
    var onOffcWorkContainer = $(".cWorkContainer")

    lunchStatusBoard.click(function() {
        onOffcWorkContainer.hide()
        onBoard.show()
    });
});
