document.body.style.display = "none";

window.onload = function() { 
    var username = prompt("Enter username");
    var password = prompt("Enter password");
    console.log("Username: "+username, " Password: "+password);
    if(password === "123")
    {
        loadbody();
    }
}

function loadbody() {
    console.log("password correct");
    document.body.style.display = "block"; 
}

$("#form").submit(function(event) {
    event.preventDefault();

    var main_acc = $("#dropDown :selected").text();
    var is_spot = $("#spot").is(":checked");
    var is_future = $("#futures").is(":checked");

    var coin = $("#coin").val();
    var investment = $("#investment").val();
    var lo_lim = $("#lower_limit").val();
    var up_lim = $("#upper_limit").val();
    var entry_interval = $("#entry_level_interval").val();
    var tp_interval = $("#take_profit_interval").val();

    var is_future = $("#futures").is(":checked");

    var data_params = {
        "symbol": coin,
        "main_acc_name":main_acc,
        "investment": investment,
        "lo_lim": lo_lim,
        "up_lim": up_lim,
        "entry_lev": entry_interval,
        "take_pf": tp_interval
    };
    console.log(data_params);
    if (is_future){
        data_params["leverage"] = $("#leverage").val();
        $('#log_info').html("");
        $.ajax({
            url: "/add_fu_coin",
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data_params),
            dataType: 'json',
            success: function(response) {
                if (response.success){
                    alert(response.success);
                    if (is_future){
                        loadFUAccData();
                    }else{
                        loadSPAccData();
                    }

                }
                if (response.error) {
                    alert(response.error);
                }
            },
            complete: function(xhr, textStatus) {
                console.log("AJAX Request complete -> ", xhr, " -> ", textStatus);
            },
            error: function(error){
                console.log(error);
                alert(error);
            }
        });
    }else{
        $('#log_info').html("");
        $.ajax({
            url: "/add_sp_coin",
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data_params),
            dataType: 'json',
            success: function(response) {
                if (response.success){
                    alert(response.success);
                    if (is_future){
                        loadFUAccData();
                    }else{
                        loadSPAccData();
                    }
                }
                if (response.error) {
                    alert(response.error);
                }
            },
            complete: function(xhr, textStatus) {
                console.log("AJAX Request complete -> ", xhr, " -> ", textStatus);
            },
            error: function(error){
                console.log(error);
                alert(error);
            }
        });
    }

});

/*function log_func() {
    var username = prompt("Enter username");
    var password = prompt("Enter password");
    console.log("Username: "+username, " Password: "+password);
}*/

function del_acc() {
    var users = ['ravi', 'raj', 'abhi'];
    console.log(users);
    var del_item = prompt("Enter username to be deleted");
    var index = users.indexOf(del_item);
    if (index !== -1) {
        users.splice(index, 1);
    }
    console.log(users);
}

async function fetchAllSPAccounts() {
    var resp = await fetch('/load_all_sp_acc');
    var drp_list = await resp.json();
    drp_list = drp_list['data']
    var select = document.getElementById('dropDown');
    $('#dropDown').empty();
    for (i = 0; i < drp_list.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = drp_list[i][0];
        option.setAttribute("value", drp_list[i][0]);
        select.appendChild(option);
    }
    if (drp_list[0][0] != "No Account"){
        loadSPAccData();
    }
}

async function fetchAllFUAccounts() {
    var resp = await fetch('/load_all_fu_acc');
    var drp_list = await resp.json();
    drp_list = drp_list['data']
    var select = document.getElementById('dropDown');
    $('#dropDown').empty();
    for (i = 0; i < drp_list.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = drp_list[i][0];
        option.setAttribute("value", drp_list[i][0]);
        select.appendChild(option);
    }
    if (drp_list[0][0] != "No Account"){
        loadFUAccData();
    }
}

async function loadSPAccData() {
    var main_acc_name = $("#dropDown :selected").text();

    $('#list').empty();
    $.ajax({
        url: "/load_sp_acc_coins",
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({"main_acc_name": main_acc_name}),
        dataType: 'json',
        success: function(response) {
            if (response.data) {
                var data = response.data;
                var deleteList = document.getElementById('list');
                
                for (var j = 0; j < data.length; j++){
                    var li = document.createElement('li');
                    var btn = document.createElement('button');
                    btn.class = "delete_btn";
                    btn.value = j;
                    btn.innerHTML = "Delete";
                    li.innerHTML = "Coin: " + data[j][0] + " Invest: " + data[j][1] + " Side: " + data[j][2];
                    li.appendChild(btn);
                    deleteList.appendChild(li);
                }
            }
            if (response.error) {
                alert(response.error);
            }
        },
        complete: function(xhr, textStatus) {
            console.log("AJAX Request complete -> ", xhr, " -> ", textStatus);
        },
        error: function(error){
            console.log(error);
            alert(error);
        }
    });
}

async function loadFUAccData() {
    var main_acc_name = $("#dropDown :selected").text();
    $('#list').empty();
    $.ajax({
        url: "/load_fu_acc_coins",
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({"main_acc_name": main_acc_name}),
        dataType: 'json',
        success: function(response) {
            if (response.data) {
                var data = response.data;
                var deleteList = document.getElementById('list');
                
                for (var j = 0; j < data.length; j++){
                    var li = document.createElement('li');
                    var btn = document.createElement('button');
                    btn.class = "delete_btn";
                    btn.value = j;
                    btn.innerHTML = "Delete";
                    li.innerHTML = "Coin: " + data[j][0] + " Invest: " + data[j][1] + " Side: " + data[j][2];
                    li.appendChild(btn);
                    deleteList.appendChild(li);
                }
            }
            if (response.error) {
                alert(response.error);
            }
        },
        complete: function(xhr, textStatus) {
            console.log("AJAX Request complete -> ", xhr, " -> ", textStatus);
        },
        error: function(error){
            alert(error);
        }
    });
}

//spot and future click item change code
$('#futures').click(function() {
    $('#leverage').show();
    fetchAllFUAccounts();
});
$('#spot').click(function() {
    $('#leverage').slideUp();
    fetchAllSPAccounts();
});

$('#add_main_acc').click(function(){

    var acc_name = $("#acc_name").val();
    var api_key = $("#api_key").val();
    var api_secret = $("#api_secret").val();
    var is_future = $("#futures").is(":checked");
    var acc_tp = 0;
    if (is_future){
        acc_tp = 1;
    }
    var data_params = {
        "main_acc_name": acc_name,
        "main_api_key": api_key,
        "main_api_secret": api_secret,
        "acc_type": acc_tp
    };

    $.ajax({
        url: "/add_main_acc",
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(data_params),
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                alert(response.success);
                if (is_future){
                    fetchAllFUAccounts();
                }else{
                    fetchAllSPAccounts();
                }
            }
            if (response.error) {
                alert(response.error);
            }
        },
        complete: function(xhr, textStatus) {
            console.log("AJAX Request complete -> ", xhr, " -> ", textStatus);
        },
        error: function(error){
            alert(error);
        }
    });

})

$('#add_sub_acc').click(function(){

    var acc_name = $("#dropDown :selected").text();
    var api_key = $("#api_key").val();
    var api_secret = $("#api_secret").val();
    var is_future = $("#futures").is(":checked");
    var acc_tp = 0;
    if (is_future){
        acc_tp = 1;
    }
    var data_params = {
        "main_acc_name": acc_name,
        "api_key": api_key,
        "api_secret": api_secret,
        "acc_type": acc_tp
    };

    $.ajax({
        url: "/add_sub_acc",
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(data_params),
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                alert(response.success);
                if (is_future){
                    fetchAllFUAccounts();
                }else{
                    fetchAllSPAccounts();
                }
            }
            if (response.error) {
                alert(response.error);
            }
        },
        complete: function(xhr, textStatus) {
            console.log("AJAX Request complete -> ", xhr, " -> ", textStatus);
        },
        error: function(error){
            alert(error);
        }
    });
})

$("#dropDown").change(function() {
    var selected = $(this).val();
    var is_future = $("#futures").is(":checked");

    if (is_future){
        loadFUAccData();
    }else{
        loadSPAccData();
    }
});


$("#list").on("click", "button", function(event){
    event.preventDefault();
    var coin = $(this).val();
    var main_acc_name = $("#dropDown :selected").text();
    var is_future = $("#futures").is(":checked");
    var acc_tp = 0;
    if (is_future){
        acc_tp = 1;
    }
    var data_params = {
        "main_acc_name": main_acc_name,
        "coin_num": coin,
        "acc_type": acc_tp
    };
    $.ajax({
        url: "/delete_coin",
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(data_params),
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                alert(response.success);
                if (is_future){
                    loadFUAccData();
                }else{
                    loadSPAccData();
                }
            }
            if (response.error) {
                alert(response.error);
            }
        },
        complete: function(xhr, textStatus) {
            console.log("AJAX Request complete -> ", xhr, " -> ", textStatus);
        },
        error: function(error){
            console.log(error);
            alert(error);
        }
    });

});
