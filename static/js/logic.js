//Callback for Next Slide for all Lessons
function next() {
    scrollId++;
    $("#status").html(scrollId);
    console.log("in next function Page - " + scrollId + " in chapter " + (chapter) + " in Lesson " + (lesson));
    $("#main_image").attr('src', './images/' + subject + '/' + (lesson) + '/' + (chapter) + '/' + scrollId + '.jpg');
    checkDisability(scrollId);
};

//Callback for Previous Slide for all Lessons
function prev() {
    if (scrollId > 1) {
        scrollId--;
        $("#status").html(scrollId);
        console.log("Page - " + scrollId + " in chapter " + (chapter) + " in Lesson " + (lesson));
        $("#main_image").attr('src', './images/' + subject + '/' + (lesson) + '/' + (chapter) + '/' + scrollId + '.jpg');
        checkDisability(scrollId);
    }

};

//Making Buttons to be Disabled 
function checkDisability(btnId) {
    (btnId <= 1) ? $("#prev").attr("disabled", "true") : $("#prev").removeAttr("disabled", "false");
    (btnId >= chapterLen) ? $("#next").attr("disabled", "true") : $("#next").removeAttr("disabled",
        "false");
}















    var scrollId = 0;
    var lesson = 1;
    var chapter = 1;
    var subject;
    var chapterLen = 1;
    var pd;

    //Called when a new chapter is clicked
    function updateDetails(d1, d2) {
        $("#options").slideDown(5);
        console.log(`main chapter ${d2}, ${d1}`);
        scrollId = 0;
        lesson = d1 + 1;
        chapter = d2 + 1;
        chapterLen = pd["lessons"][d1]["chapters"][d2]["length"];
        $("#chapterLength").html(chapterLen);
        console.log(`Chapter : ${chapter}, Lesson : ${lesson}, Number of chapters ${chapterLen}`);
        next();
    }

    //Runs when the data of this page is loaded
    $(function () {
        $("#options").slideUp(5);
        //getting Subject from URL
        const params = new URLSearchParams(document.location.search);
        console.log(params.get("sub"));
        subject = params.get("sub");
        pd = data[params.get("sub")];
        $("#title").html(pd["title"]);
        var dummy;
        var tempHead;
        var tempCollapse;
        var cardBody = "";

        //Displaying Sidebar Data
        for (var dummy = 0; dummy < pd["lessons"].length; dummy++) {
            tempHead = "heading" + (dummy + 1).toString();
            tempCollapse = "collapse" + (dummy + 1).toString();

            //Loop to generate chapters code
            for (var dum = 0; dum < pd["lessons"][dummy]["chapters"].length; dum++) {
                console.log(pd["lessons"][dummy]["chapters"][dum]["title"]);
                cardBody = cardBody + '<button onclick="updateDetails(' + dummy + ', ' + dum + ')"><div class="card-body">' + pd["lessons"][dummy]["chapters"][dum]["title"] + '</div></button><br>';
            }

            //Entire side body code
            $("#generated").append('<div class="card-header" role="tab" id=' + tempHead + '> <a data-toggle="collapse" data-parent="#accordionEx" href= "#' + tempCollapse + '" aria-controls=' + tempCollapse + ' style="text-decoration:none"> <h5 class="mb-0">' + pd["lessons"][dummy]["title"] + '<i class="fas fa-angle-down rotate-icon"></i> </h5></a></div><div id=' + tempCollapse + ' class="collapse" role="tabpanel" aria-labelledby=' + tempHead + ' data-parent="#accordionEx">' + cardBody + '');
            cardBody = "";
        }

        //Called when the App Loads at first time
        checkDisability(scrollId);

        //Loading Image for First Time
        $("#main_image").attr('src', './images/' + params.get("sub").toString() + '/intro.jpg');

    })