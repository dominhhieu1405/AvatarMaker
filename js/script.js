function Preview(input) { //image preview after select image
    if (input.files && input.files[0]) {
        var filerdr = new FileReader();

        filerdr.onload = function(e) {
            var img = new Image();

            img.onload = function() {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = 500;
                canvas.height = canvas.width * (img.height / img.width);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // SEND THIS DATA TO WHEREVER YOU NEED IT
                var data = canvas.toDataURL('image/png');
                //$('#imageResult').attr('src', img.src);
                $('#imageResult').attr('src', data);
            }
            img.src = e.target.result;
        }
        filerdr.readAsDataURL(input.files[0]);
    }
}
function Success(src){
    console.log("Completed!");
    $("#Result").attr("href", src).show();
    $("#Merge").html('<i class="fa fa-arrow-rotate-right mr-1 text-muted"></i><small class="text-uppercase font-weight-bold text-muted">Tạo lại</small>').prop("disabled", false);
}
$(function (){
    $("#Merge").on("click", function (){
        $("#Merge").html('<i class="fa fa-spinner fa-spin mr-1 text-muted"></i><small class="text-uppercase font-weight-bold text-muted">Đang tạo</small>').prop("disabled", true);
        $("#Result").attr("src", null).hide();
        mergeImages([
            $("#imageResult").attr("src"),
            $("#Frame").attr("src")
        ], {
            width: 500,
            height: 500
        }).then(
            //b64 => document.getElementById('Result').src = b64
            b64 => Success(b64)
        );
    });
})