/*
Original Author : Kweku Okyere Kankam
Date : 16th September 2014
License : open
(c) Copyright by Kfive Interective.
Description : ARYA responsive Jquery Slider Plugin
Version : 0.1
*/
(function ($) {
    //Private variables

    //Private methods
    var slideshow = function (el, opt) {
            //this function returns the slides in an array
            //takes the element as a parameter

            //step 1:find arya-slides and put into array
            var slidearray = []
            el.find(".arya-slides section").each(function (index, elem) {
                slidearray.push(elem);

            });
            //step 2 : hide arya-slide (done in css
            el.css({
                width: opt.width,
                height: opt.height,
            })
            //step 3 : show/prepare arya content div
            var contentel = el.find(".arya-content")

            //step 4 lets try the slide and see
            var i = 1 // counter for slider
                //hack
                // run first slide while waiting for interval to kick in
            $("#page0").addClass("active");
            $(contentel).html(slidearray[0]);

            setInterval(
                function () {

                    if (i < slidearray.length) {

                        //clear content 
                        $(contentel).html("")
                        //Animations
                        //one
                        //$(contentel).fadeOut(500).html(slidearray[i]).fadeIn(1000);
                        //two
                        $(contentel).hide().html(slidearray[i]).slideDown(opt.slidespeed);
                        var k = i - 1;
                        $("#page" + k).removeClass("active");
                        $("#page" + i).addClass("active");

                        i++;
                    } else {
                        var k = i - 1;
                        $("#page" + k).removeClass("active");
                        i = 0;
                    }

                }, opt.slideduration)

            //step 5 : Lets add some pagination
            //first lets create the div
            var $div = $("<div>", {
                id: "arya-pagination",
                class: "arya-pagination"
            });
            $div.click(function () { /* ... */ });
            el.append($div);
            //Now create page numbers div and append to paginationdiv
            for (var k = 0; k < slidearray.length; k++) {
                var j = k + 1
                $("#arya-pagination").append('<a href="#" id="page' + k + '" class="page">' + j + '</a>')
            }


        }
        //Options and settings
    var defaultoptions = {
        width: "800px", //width of slider
        height: "600px",//height of slider
        slideduration : 1000,//time for each slide (in milliseconds)
        slidespeed : 500, // slide transition speed(in milliseconds)
        transitioneffect : "fadeIn",//current options : fadein,slideup,slidedown(more work needed here)
    }

    //Main function
    $.fn.arya = function (options) {

        var settings = $.extend(defaultoptions, options)

        slideshow(this, settings);
    };

})(jQuery)