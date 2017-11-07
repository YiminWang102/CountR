$(document).ready(function() {

    const $title = $("<h1>Upload an image of food and I will identify it for you!</h1>");
    $title.addClass('title');
    $("#app").append($title);

    const $input = $("<input>", {"type":"file", "accept":"image/*", "id":"file-input"});
    $("#app").append($input);

    const $canvas = $("<canvas>", {'id':'canvas'});
    $("#app").append($canvas);

    const canvas = $canvas[0];
    const ctx = canvas.getContext('2d');

    function handleImage(e){
        removeClass('label');
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
        const file = e.target.files[0];

        reader.readAsDataURL(file);

        const storageRef = firebase.storage().ref('hello');
        const metadata = {
          contentType: 'image/jpeg',
        };
        const uploadTask = storageRef.put(file, metadata);
        uploadTask.on('state_changed', () => {}, () => {}, () => {
          const downloadURL = uploadTask.snapshot.downloadURL;
          console.log(downloadURL);

          axios.post('/api/einstein/', {imageURL: downloadURL})
            .then(res => res.data)
            .then(res => {
              processEinsteinResponse(res);
            });
        });
    }

    $("#file-input").change(handleImage);
});

function processEinsteinResponse(res) {
  if (res.probabilities) {
    console.log(res);
    if (res.probabilities.some(ele => ele.probability * 100 > 10)) {
      res.probabilities.forEach(item => {
        const label = item.label;
        const prob = item.probability;

        updateInfo(label, prob, 10);
      });
    } else {
      sadReacc();
    }
  } else {
    newLabel('It appears that the image classifier is not working right now :(')
  }
}

function updateInfo(label, prob, lowerBound) {
  if (lowerBound && prob * 100 > lowerBound || !lowerBound) {
    newLabel(`This is a(n) ${label} with probability ${Math.round(prob * 1000) / 10}%`);
  }
}

function removeClass(className) {
  $(`.${className}`).remove();
}

function sadReacc() {
  newLabel("I'm not quite sure what this is :(</h3>");
}

function newLabel(text) {
  const newLabel = $(`<h3>${text}</h3>`);
  newLabel.addClass('label');
  $('#app').append(newLabel);
}
