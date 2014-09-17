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
           
            $(contentel).html(slidearray[0]);
            var aryaslide = function () {
                if (i < slidearray.length) {

                    //clear content 
                    $(contentel).html("")
                    //Animations
                    //one
                    //$(contentel).fadeOut(500).html(slidearray[i]).fadeIn(1000);
                    //two
                    $(contentel).hide().html(slidearray[i]).slideDown(opt.slidespeed);
                    // var target = opt.transitioneffect;
                    // if (jQuery.isFunction(target)) {
                    // $(contentel).hide().html(slidearray[i])[target](opt.slidespeed);
                    //                        }

                    var k = i - 1;
                    $("#page" + k).removeClass("active");
                    $("#page" + i).addClass("active");

                    i++;
                } else {
                    var k = i - 1;
                    $("#page" + k).removeClass("active");
                    i = 0;
                }

            }

            var timer = setInterval(aryaslide, opt.slideduration)

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
            $("#page0").addClass("active");

            //Step 6 : Lets Handle Click Events
            el.click(function (e) {
                if (e.target.className.indexOf('page') !== -1) {
                    var spli = e.target.id.split('e');
                    var l = spli[1];
                    $(contentel).hide().html(slidearray[l]).slideDown(opt.slidespeed);
                    var k = i - 1;
                    $("#page" + k).removeClass("active");
                    $("#page" + l).addClass("active");

                    clearInterval(timer);
                    i = l;
                    timer = setInterval(aryaslide, opt.slideduration);

                }
            });



        }
        //Options and settings
    var defaultoptions = {
        width: "900px", //width of slider
        height: "600px", //height of slider
        slideduration: 3000, //time for each slide (in milliseconds)
        slidespeed: 1000, // slide transition speed(in milliseconds)
        transitioneffect: "slideDown", //current options : fadein,slideup,slidedown(more work needed here)
    }

    //Main function
    $.fn.arya = function (options) {

        var settings = $.extend(defaultoptions, options)

        slideshow(this, settings);
    };

})(jQuery)