$(document).ready(function(){
    var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
    const closeDialog = $(".closeButton");
    closeDialog.click(function(){
        $("#resetHide2").hide();
        $("#resetHide").hide();
        $("#resetHide3").hide();
        $("hr").show()
        $("#spinnerSection").hide();
        $("#email").val("");
        $("#resetCode").val("");
        $("#mailValidation").hide();
        $("#codeValidation").hide();
        $("body").css("overflow", "auto");
    });

    const activateReset = $("#activateResetBtn");
    activateReset.click(function(event){
        event.preventDefault();
        $("hr").hide()
        $('html, body').animate({scrollTop: 0}, 'slow');
        $("#resetHide2").show();
        $("body").css("overflow", "hidden");
    });

    const submitMail = $("#submitMail");
    submitMail.click(function(event){
        event.preventDefault();
        const email = $("#email").val();
        const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        $("#mailValidation").css("color", "red")
        if(!emailRegx.test(email) && email !== ""){            
            $("#mailValidation").text("* Invalid email address");
            $("#mailValidation").show();
        } else if (email === ""){
            $("#mailValidation").text("* Entry cannot be empty");
            $("#mailValidation").show();
        }else{
            $("#spinnerSection").show();
            $("#mailValidation").hide();
            setTimeout(() => {
                $.ajax({
                    type: "GET",
                    url: "/heritage_students/user/resetPassword/",
                    data: {
                        email: $("#email").val()
                    },
                    dataType: "json",
                    success: function (response) {
                        if (response.message === "Not Found"){
                            $("#mailValidation").text("* Email not found");
                            $("#mailValidation").show();
                            $("#spinnerSection").hide();
                            $("#resetHide2").show();
                            return;
                        }
                        $("#resetHide2").hide();
                        $("#resetHide").show();
                    },
                    error: function (response) {
                        $("#spinnerSection").hide();
                        $("#mailValidation").text("* Email not found");
                        $("#resetHide2").show();
                    }
                });               
            }, 3000);
        }
    });

    const validateCode = $("#validateCode");
    validateCode.click(function(event){
        event.preventDefault();
        const code = $("#resetCode").val();
        const codeRegx = /^[0-9]{6}$/;
        $("#codeValidation").css("color", "red")
        if(!codeRegx.test(code) && code !== ""){            
            $("#codeValidation").text("* Invalid code");
            $("#codeValidation").show();
        } else if (code === ""){
            $("#codeValidation").text("* Entry cannot be empty");
            $("#codeValidation").show();
        }else{
            $("#codeValidation").hide();
            $.ajax({
                type: "POST",
                url: "/heritage_students/user/resetPassword/",
                data: {
                    resetCode: $("#resetCode").val()
                },
                headers: {
                    "X-CSRFToken": csrftoken
                },
                dataType: "json",
                success: function (response) {
                    if (response.status == "0"){
                        $("#codeValidation").text("* Invalid code");
                        $("#codeValidation").show();
                        return;
                    }
                    $("#resetHide").hide();
                    $("#resetHide3").show();
                },
                error: function (response) {
                    console.log(response);
                }
            });               
        }
    });

    const reset = $("#resetMe");
    reset.click(function(event){
        event.preventDefault();
        
        var password = $('#resetPassword').val();
        var confirmPassword = $('#resetPassword2').val();
        $('#passwordValidation').css('color', 'red');
        
        $('#passwordValidation').empty();
        
        if (password === '' || confirmPassword === '') {
            $('#passwordValidation').text('Password cannot be empty');
            return;
        }
        
        if (password.length < 8) {
            $('#passwordValidation').text('Password must be at least 8 characters long');
            return;
        }
        
        if (!(/[a-zA-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password))) {
            $('#passwordValidation').text('Password must contain at least one letter, one number, and one special character');
            return;
        }
        
        if (password !== confirmPassword) {
            $('#passwordValidation').text('Passwords do not match');
            return;
        }
        
        $('#resetForm').submit();
    })
});
