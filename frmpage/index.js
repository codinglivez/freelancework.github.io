var drp_list = ['Default', 'Free Run', 'Close All'];

function dropDown() {
    var select = $('.newdrp');
    $(select).empty();
    for (i=0; i <= drp_list.length - 1; i++) {
        var option = document.createElement('option');
        option.innerHTML = drp_list[i];
        option.setAttribute("value", drp_list[i]);
        select.append(option);
    }
    var optbtn = document.createElement('option');
    //optbtn.innerHTML = '<input type="button" onclick="showEle()" name="" placeholder="Add Elements">';
    optbtn.innerHTML = 'Add Element';
    optbtn.setAttribute("value", "eleadd");
    select.append(optbtn);
    //console.log("button added");
}

dropDown();

let addedEle = '';

function dropDownSpec(currentid) {
    var select = $(currentid);
    $(select).empty();
    for (i=0; i <= drp_list.length - 1; i++) {
        var option = document.createElement('option');
        option.innerHTML = drp_list[i];
        option.setAttribute("value", drp_list[i]);
        select.append(option);
    }
    var optbtn = document.createElement('option');
    //optbtn.innerHTML = '<input type="button" onclick="showEle()" name="" placeholder="Add Elements">';
    optbtn.innerHTML = 'Add Element';
    optbtn.setAttribute("value", "eleadd");
    select.append(optbtn);
    console.log(drp_list);
}

$(".newdrp").change(function() {
    var selected = $(this).val();
    var currentid = $(this).attr('id');
    //console.log("Clicked ->", selected);
    console.log(currentid);
    
    if (selected === "eleadd") {
        addedEle = prompt("Please enter preferred value", "50")
        drp_list.unshift(addedEle);
        drp_list = $.unique(drp_list);
        dropDownSpec(currentid);
    }
});


$("#form").submit(function(event) {
    event.preventDefault();
    var buy_call = $("#dropDown1 :selected").text();
    var buy_putcr = $("#dropDown2 :selected").text();
    var buy_put = $("#dropDown3 :selected").text();
    var buy_callcr = $("#dropDown4 :selected").text();

    var sell_call = $("#dropDown5 :selected").text();
    var sell_putcr = $("#dropDown6 :selected").text();
    var sell_put = $("#dropDown7 :selected").text();
    var sell_callcr = $("#dropDown8 :selected").text();

    var contno_call = $("#contno1").val();
    var contno_putcr = $("#contno2").val();
    var contno_put = $("#contno3").val();
    var contno_callcr = $("#contno4").val();

    var expiry_call = $("#expday1 :selected").text();
    var expiry_putcr = $("#expday2 :selected").text();
    var expiry_put = $("#expday3 :selected").text();
    var expiry_callcr = $("#expday4 :selected").text();

    var strike_call = $("#strikeip1").val();
    var strike_putcr = $("#strikeip2").val();
    var strike_put = $("#strikeip3").val();
    var strike_callcr = $("#strikeip4").val();

    var stop_call = $("#stopip1").val();
    var stop_putcr = $("#stopip2").val();
    var stop_put = $("#stopip3").val();
    var stop_callcr = $("#stopip4").val();

    var scpro_call = $("#dropDown9 :selected").text();
    var scpro_putcr = $("#dropDown10 :selected").text();
    var scpro_put = $("#dropDown11 :selected").text();
    var scpro_callcr = $("#dropDown12 :selected").text();

    var sccontr_call = $("#dropDown13 :selected").text();
    var sccontr_putcr = $("#dropDown14 :selected").text();
    var sccontr_put = $("#dropDown15 :selected").text();
    var sccontr_callcr = $("#dropDown16 :selected").text();

    var call_chk = $('#chk1').is(":checked");
    var putcr_chk = $('#chk2').is(":checked");
    var put_chk = $('#chk3').is(":checked");
    var callcr_chk = $('#chk4').is(":checked");

    var data_params = {
        "usr_name": uname,
        "password": psw,
    };

    console.log(data_params);
    $('#log_info').html("");
    $.ajax({
        url: "/go",
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(data_params),
        dataType: 'json',
        success: function(response) {
            console.log(response);
            if (response.redirect) {
                window.location.href = response.redirect;
            }
            if (response.error) {
                $("#log_info").append("<b>ERROR: </b> <text>" + response.error + "</text>");
                $("#login_uname").val('');
                $("#login_psw").val('');
            }
        },
        complete: function(xhr, textStatus) {
            console.log("AJAX Request complete -> ", xhr, " -> ", textStatus);
            alert("AJAX Request complete -> ", xhr, " -> ", textStatus); //pop-up of successful completion
        },
        error: function(error){
            console.log(error);
            alert(error); //pop-up of error message
        }
    });
});