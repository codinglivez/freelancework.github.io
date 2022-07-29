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

let addedEle = '';

$(".newdrp").change(function() {
    var selected = $(this).val();
    //console.log("Clicked ->", selected);
    
    if (selected === "eleadd") {
        addedEle = prompt("Please enter preferred value", "50")
        drp_list.unshift(addedEle);
        drp_list = $.unique(drp_list);
        dropDown();
    }      
});

dropDown();
