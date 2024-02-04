$(document).ready(function () {
    var filter = $("#filter");
    var filterParams = $("#filterParams");
    var submitFilter = $("#submitFilter");
    var obtainedDepartment = $("#getDepartment").text();
    var tableUpdate = $(".tableContent");

    var url = `/api/data/resources/${obtainedDepartment}`;
    var coursesObtained = [];

    var levelArray = [  
        "ND 100",
        "ND 200",
        "HND 100",
        "HND 200",
    ]
        

    $.ajax({
        url: url,
        data: {},
        dataType: "json",
        success: function (response) {
            for (let i = 0; i < response.data.length; i++) {
                coursesObtained.push(response.data[i]);
            }
        },
        error: function (error) {
            console.log(error);
        },
    });

    // Recalling function
    let submitDataFunction = function(param){
        url = `/learning/resources/${param}/${obtainedDepartment}`
        $.ajax({
            type: "GET",
            url: url,
            data: "data",
            success: function (response) {
                let htmlData = $(response)
                let tableData = htmlData.find(".resourceTable")
                tableUpdate.html(tableData)
            },
            error: function(){ 
            }
        });
    }


    // Filter function
    filter.change(function(){
        if (filter.val() === "all") {
            filterParams.hide()
            submitFilter.hide()
            window.location.reload()
        } else if (filter.val() === "filter_cCode"){
            filterParams.show()
            filterParams.empty()
            filterParams.append("<option value='Course Code' hidden>-- Select Code --</option>")
            for (let i = 0; i < coursesObtained.length; i++) {
                filterParams.append(`<option value="${coursesObtained[i].course_code}">${coursesObtained[i].course_code}</option>`)
            }
            filterParams.change(function(){
                submitFilter.css("display", "inline-block")
            })
            submitFilter.click(function(){
                submitDataFunction([filter.val(), filterParams.val()])
            })
        } else if (filter.val() === "filter_level"){
            filterParams.show()
            filterParams.empty()
            filterParams.append("<option value='Course Code' hidden>-- Select Level --</option>")
            for (let i = 0; i < levelArray.length; i++) {
                filterParams.append(`<option value="${levelArray[i]}">${levelArray[i]}</option>`)
            }
            filterParams.change(function(){
                submitFilter.css("display", "inline-block")
            })
            submitFilter.click(function(){
                submitDataFunction([filter.val(), filterParams.val()])
            })
        } else if (filter.val() === "filter_semester"){
            filterParams.show()
            filterParams.empty()
            filterParams.append("<option value='Course Code' hidden>-- Select Semester --</option>")
            filterParams.append(`<option value="Semester 1">First Semester</option>`)
            filterParams.append(`<option value="Semester 2">Second Semester</option>`)
            filterParams.change(function(){
                submitFilter.css("display", "inline-block")
            })
            submitFilter.click(function(){
                submitDataFunction([filter.val(), filterParams.val()])
            })
        }
    })

    filterParams.hide()
})