//create new function
function ChangeValueForDropBox(idDropMenu, idTextChange) {
    $('#' + idDropMenu + ' a').click(function() {
        $('#' + idTextChange).text($(this).text());
    });
}

function ShowToolTip() {
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
}

//Main program
ChangeValueForDropBox("dropdown-menu-chooseTypeOfWasteWater", "selected-chooseTypeOfWasteWater");
ShowToolTip();