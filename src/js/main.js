const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('imageInput');
let uploadedImage = null;

// Load the image onto the canvas
imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      uploadedImage = img;
      drawImage();
    };
  };

  reader.readAsDataURL(file);
});

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

// Draw image and text on canvas
function drawImage() {
  if (uploadedImage) {
    // Clear canvas and set canvas dimensions to fit the image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    // Get text values
    var topText = document.getElementById('topText').value;
    var bottomText = document.getElementById('bottomText').value;
    var fontType = document.getElementById('fontSelect').value;
    var lineSize = document.getElementById('lineSize').value;
    var colorPicker = document.getElementById('colorPicker').value;
    var colorPicker2 = document.getElementById('colorPicker2').value;

    if (lineSize > 5 || lineSize < 0) {
        lineSize = 2
    }
    
    colorPicker = hexToRGB(colorPicker, 1);
    colorPicker2 = hexToRGB(colorPicker2, 1);

    // Set text styles
    ctx.font = '30px ' + String(fontType);
    ctx.fillStyle = colorPicker;
    ctx.strokeStyle = colorPicker2;
    ctx.lineWidth = lineSize;
    ctx.textAlign = 'center';

    // Draw top text
    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);

    // Draw bottom text
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  }
}

// Generate meme by drawing text on the uploaded image
function generateMeme() {
  drawImage();
}

// Download the meme as an image
function downloadMeme() {
  const link = document.createElement('a');
  link.download = 'meme.png';
  link.href = canvas.toDataURL();
  link.click();
}