$(function () {

    var imgSize = {
        width: 0,
        height: 0
    }
    var imgQuality = 3;

    var parentElement = document.getElementById('parentElement');
    var elements = Array.from({
        length: 600
    }, _ => parentElement.insertAdjacentHTML("beforeend", '<span class="watermark-text"></span>'));

    var dlBtn = document.getElementById("download");
    dlBtn.addEventListener("click", function () {
        console.log("btn clicked!");

        html2canvas(document.querySelector(".frame"), {
            backgroundColor: null,
            scale: imgQuality

        }).then((canvas) => {
            console.log(canvas);
            var name = $("#watermark-text").val();

            download(canvas, name + "-Watermarkify");
        });
    });

    function download(canvas, filename) {
        const data = canvas.toDataURL("image/png;base64");
        const donwloadLink = document.querySelector("#save");
        donwloadLink.download = filename;
        donwloadLink.href = data;
        donwloadLink.click();
    }

    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');

    function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                imgSize = {
                    width: img.width,
                    height: img.height
                };
                console.log(imgSize);

            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    $("#watermark-setting input").on("change input", function () {

        var text = $("#watermark-text").val();
        var spacing = $("#watermark-spacing").val();
        var rotation = $("#watermark-rotation").val();
        var color = $("#watermark-color").val();
        var opacity = $("#watermark-opacity").val();
        var size = $("#watermark-size").val();
        var weight = $("#watermark-weight").val();

        $("body").css({
            "--text": "'" + text + "'",
            "--padding": spacing + "px",
            "--rotation": rotation + "deg",
            "--color": color,
            "--opacity": opacity,
            "--font-size": size + "px",
            "--font-weight": weight,
        });
    });

    $("#export-scale").on("change", function () {
        imgQuality = Number($(this).val());
    });


    let securityModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('security-modal')) // Returns a Bootstrap modal instance
    let infoModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('info-modal')) // Returns a Bootstrap modal instance

    $("#security-btn").click(function () {
        securityModal.show();
    });
    $("#info-btn").click(function () {
        infoModal.show();
    });


    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

});