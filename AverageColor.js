function GetImage() {
    document.getElementById('img').onchange = function (evt) {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;
            var divs = document.getElementsByTagName("div");
            while(divs.length > 0) {
                divs[divs.length - 1].parentNode.removeChild(divs[divs.length - 1]);
            }
        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            var arr;
            var image = new Image();
            fr.onload = function () {
                image.onload = function (evt) {
                    //            console.log(arr);

                    var colorThief = new ColorThief();
                    var aaa = colorThief.getPalette(image, 8);


                    /*    var canvas = document.createElement('canvas');
                        canvas.width = this.width;
                        canvas.height = this.height;
                        canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
    
    
                        var context = canvas.getContext('2d');
                        var imgd = context.getImageData(0, 0, this.width, this.height);
                        var pix = imgd.data;
                        debugger;
                        var avgR = 0, avgG = 0, avgB = 0, avgA = 0;
                        for (var i = 0, n = pix.length; i < n; i += 4) {
                            avgR += pix[i];
                            avgG += pix[i + 1];
                            avgB += pix[i + 2];
                            avgA += pix[i + 3];
                        }*/

                    // var hex = rgbToHex(Math.round(avgR / (pix.length / 4)), Math.round(avgG / (pix.length / 4)), Math.round(avgB / (pix.length / 4)));
                    var hexArr = [];
                    for (var i = 0; i < aaa.length; i++) {
                        hexArr.push(rgbToHex(aaa[i][0], aaa[i][1], aaa[i][2]));
                        var divCol = document.createElement('div');
                        divCol.style.backgroundColor = hexArr[i];
                        divCol.style.padding = '50px';

                        var n_match = ntc.name(hexArr[i]);
                        var divName = document.createElement('div');
                        divName.innerText = n_match[1];

                        document.body.insertAdjacentElement("afterend", divCol);
                        document.body.insertAdjacentElement("afterend", divName);
                    }

                    // var n_match = ntc.name(hex);
                    // n_rgb = n_match[0]; // RGB value of closest match
                    // n_name = n_match[1]; // Text string: Color name
                    // n_exactmatch = n_match[2]; // True if exact color match

                    // document.getElementById('clr').style.backgroundColor = n_rgb;
                    // document.getElementById('clrName').innerText = n_name;
                    // };
                };
                image.src = fr.result;

            }
            fr.readAsDataURL(files[0]);
        }

        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }
    }
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}