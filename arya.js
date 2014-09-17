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
                myelem = $(elem).attr("id", index)
                //this nice code does wonders..lol..basically allows me to add ids to each section or page
                var elem = $('<div>').append(myelem.clone()).html()

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

            $(contentel).append(slidearray[0]);
            var aryaslide = function () {
                el.find(".active").removeClass("active");
                if (i < slidearray.length) {
                    contentel.append(slidearray[i]);
                    console.log(contentel.html())
                    var animel = contentel.find("section#" + i).last().css({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        
                        width: "0px",
                        height: "100%"
                    }).addClass("animated")
                    for (var x=0; x < 5; x++) {
                        animel.animate({
                            left:x*100,
                            width: "100%",
                        }, 200)
                        animel.animate({
                            left:x*20,
                            width: "100%",
                        }, 100)
                    }
                    $("#page" + i).addClass("active");

                    i++;
                    if (i == slidearray.length) {
                        el.find(".animated:not(:last)").remove();
                        i = 0;
                    }
                } else {
                    i = 0; //solves pagination click for last page ..hmmmm
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
                    i = parseInt(l) //new for cornerslider
                    aryaslide();
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

        //completed anims : cornerslide

    }

    //Main function
    $.fn.arya = function (options) {

        var settings = $.extend(defaultoptions, options)

        slideshow(this, settings);
    };

})(jQuery)