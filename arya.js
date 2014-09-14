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
    var slideshow = function (el) {
            //this function returns the slides in an array
            //takes the element as a parameter

            //step 1:find arya-slides and put into array
            var slidearray = []
            el.find(".arya-slides section").each(function (index, elem) {
                slidearray.push(elem);
                console.log(index);
            });
            //step 2 : hide arya-slide
            el.find(".arya-slides").hide();
            //step 3 : show/prepare arya content div
            var contentel = el.find(".arya-content")
            $(contentel).css({
//                width: "300px",
//                height: "auto",
            })
            //step 4 lets try the slide and see
            var i = 0 // counter for slider
            setInterval(
                function () {

                    if (i < slidearray.length) {
                       
                        $(contentel).hide().html(slidearray[i]).fadeIn(1000);
                         i++;
                    } else {
                        i = 0;
                    }
                    
                }, 2000)

            return slidearray;
        }
        //Options and settings

    //Main function
    $.fn.arya = function () {
        slideshow(this);
    };

})(jQuery)