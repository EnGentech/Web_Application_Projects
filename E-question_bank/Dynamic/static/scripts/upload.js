$(document).ready(function(){
    var typeSelected

    $('#uploadSelectType').change(function(){
        typeSelected = $(this).val()
        let submitButton = $("#submit")
        let actionValue = $("#uploadForm")
        actionValue.prop('action', '');
        let hideForm = $(".hideOff")
        let labelName = $("#label_upload")
        
        if(typeSelected == 'questions'){
            submitButton.val('Upload Questions')
            actionValue.prop('action', '/staff/upload_question/')
            hideForm.hide()
            labelName.text("Upload Question in Pdf Format")
        } else if (typeSelected == 'answers'){
            submitButton.val('Upload Answers')
            actionValue.prop('action', '/staff/upload_answer/')
            hideForm.hide()
            labelName.text("Upload Answer in Pdf Format")
        } else if (typeSelected == "resources"){
            submitButton.val('Upload Resources')
            actionValue.prop('action', '/staff/upload_resources/')
            labelName.text("Upload Resources in Pdf Format")
            hideForm.show()
        }
    });

    // Upload Nav bar logics
    var uploadNav = $("#uploadNav")
    var navDisplay = $(".uploadNavElements")

    navDisplay.mouseleave(function(){
        navDisplay.slideUp();
    });
    
    uploadNav.click(function(){
        navDisplay.slideDown();
    });
    
})