//create new function
function ChangeValueForDropBox(idDropMenu, idTextChange) {
    $('#' + idDropMenu + ' a').click(function() {
        $('#' + idTextChange).text($(this).text());
    });
} // use it for create new seclect dropbox

function ShowToolTip() {
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
} // the function use for all tooltip in website

//Main program
ChangeValueForDropBox("dropdown-menu-chooseTypeOfWasteWater", "a0_loaiNuocThaiXuLy_txt");
ShowToolTip();