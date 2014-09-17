/*
Original Author : Kweku Okyere Kankam
OriginalDate : 16th September 2014
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
            //step 2 :  options heigh and width
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
                el.find(".active").removeClass("active");
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

                    //var k = i - 1;
                    //$("#page" + k).removeClass("active");

                    $("#page" + i).addClass("active");
                    console.log(i);
                    i++;
                    if (i == slidearray.length) {
                        
                        i = 0;
                    }
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
            //first page must be active on slider start
            $("#page0").addClass("active");

            //Pagination options
            if (opt.pagination == false) {
                $("#arya-pagination").hide();
            }
            //Auto start Option
            if (opt.autostart == false) {
                clearInterval(timer)
                //Todo : show play pause buttons
            }

            //Step 6 : Lets Handle Click Events
            el.click(function (e) {
                if (e.target.className.indexOf('page') !== -1) {
                    //we handle page clicks here 
                    //the code first gets the clicked id,then splits it to get the number(page)
                    //then we set the content to that page including the active styles.
                    //then we stop the timer(clear interval), reset the timer(i) to the next page
                    //and start the timer again
                    var spli = e.target.id.split('e');
                    var l = spli[1];
                    $(contentel).hide().html(slidearray[l]).slideDown(opt.slidespeed);
                    el.find(".active").removeClass("active");
                    $("#page" + l).addClass("active");
                    i = parseInt(l) + 1;

                    //if optostart is false then this part is not needed
                    if (opt.autostart == true) {
                        clearInterval(timer);

                        timer = setInterval(aryaslide, opt.slideduration);
                    }

                }
            });



        }
        //Options and settings
    var defaultoptions = {
        width: "100%", //width of slider
        height: "600px", //height of slider
        slideduration: 3000, //time for each slide (in milliseconds)
        slidespeed: 1000, // slide transition speed(in milliseconds)
        transitioneffect: "slideDown", //current options : fadein,slideup,slidedown(more work needed here)
        pagination: true, // show pagination true / false
        autostart: true // start slide on page load true false

    }

    //Main function
    $.fn.arya = function (options) {

        var settings = $.extend(defaultoptions, options)

        slideshow(this, settings);
    };

})(jQuery)