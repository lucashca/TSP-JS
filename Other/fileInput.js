var fileInput = document.getElementById('fileInput');
var fileDisplayArea = document.getElementById('fileDisplayArea');

var content = null

fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var textType = /text.*/;
    
    if (file.type.match(textType)) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            var content = reader.result;
            //Here the content has been read successfuly
            alert(content);
        }
        
        reader.readAsText(file);	
    } else {
        fileDisplayArea.innerText = "File not supported!"
    }
});