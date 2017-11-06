$(document).ready(function() {
    // all custom jQuery will go here

    const $input = $("<input>", {"type":"file", "accept":"image/*", "id":"file-input"});
    $("#app").append($input);

    const $canvas = $("<canvas>", {'id':'canvas'});
    $("#app").append($canvas);

    const canvas = $canvas[0];
    const ctx = canvas.getContext('2d');

    function handleImage(e){
        var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            img.onload = function(){
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img,0,0);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    $("#file-input").change(handleImage);

});
