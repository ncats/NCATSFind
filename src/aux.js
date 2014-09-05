/**
 *	Author: Tyler Peryea
 *	Date: Friday, September 5th
 *
 *	Auxillerary functions for NCATSFind processing.
 *	These are currently unused, but still useful functions
 *	which are not currently active in the tool, but which
 *	could become active again soon.
 *
 *	Free to use
 */
function makeRotate() {
    jQuery(".mystr img").mousemove(function mouse(evt) {
        if (jQuery(this).attr("offset") == undefined) {
            jQuery(this).attr("offset", JSON.stringify(jQuery(this).offset()));
        }
        var offset = JSON.parse(jQuery(this).attr("offset"));
        if (jQuery(this).hasClass("rotate")) {
            var src = jQuery(this).attr("src");
            var rot = (src + "&rotate=0.0").split("&rotate=")[1].split("&")[0] / 1;
            var center_x = (offset.left) + (jQuery(this).width() / 2);
            var center_y = (offset.top) + (jQuery(this).height() / 2);
            var mouse_x = evt.pageX;
            var mouse_y = evt.pageY;
            var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y) - (rot);
            jQuery(this).attr("value", radians);
            var degree = (radians * (180 / Math.PI) * -1) + 90;
            jQuery(this).css('-moz-transform', 'rotate(' + degree + 'deg)');
            jQuery(this).css('-webkit-transform', 'rotate(' + degree + 'deg)');
            jQuery(this).css('-o-transform', 'rotate(' + degree + 'deg)');
            jQuery(this).css('-ms-transform', 'rotate(' + degree + 'deg)');
        }
    });
    jQuery(".mystr img").click(function() {
        if (jQuery(this).hasClass("rotate")) {
            jQuery(this).removeClass("rotate");
            var src = jQuery(this).attr("src");
            var rot = src.split("&rotate=")[1].split("&")[0];
            //alert(rot);
            src =
                src.replace(
                    /&rotate=[-]*[0-9]*[.]*[0-9]*/g,
                    "&rotate=" + (jQuery(this).attr("value") - Math.PI / 2 + rot / 1));
            jQuery(this).attr("value", 0.0);
            jQuery(this).fadeTo(50, 0.1, function() {
                jQuery(this).attr("src", src);
                jQuery(this).attr('style', "width:100%;display:none");
                jQuery(this).fadeTo(50, 0.1, function() {
                    jQuery(this).fadeTo(50, 1);
                });
            });

        } else {
            jQuery(this).attr("offset", JSON.stringify(jQuery(this).offset()));
            jQuery(this).addClass("rotate");
        }
    });
}
function displayEditWindow(strtitle, url) {
    jQuery("<iframe style='width:100%;height:100%;margin-right: 10px;min-width:740px;' src='" + url + "'></iframe>")
        .dialog({
            closeText: "hide",
            title: strtitle,
            position: 'top',
            show: {
                effect: 'fade',
                duration: 350
            },
            hide: {
                effect: 'fade',
                duration: 250
            }
        })
        .dialog("option", "width", 760)
        .dialog("option", "height", 600)
        .dialog({
            dialogClass: 'NCATSFindDialog'
        });
    jQuery(".NCATSFindDialog").css('position', 'fixed');
    jQuery(".NCATSFindDialog").not(".setup").css('top', '0px');
    jQuery(".NCATSFindDialog").not(".setup").css('left', '0px');
    jQuery(".NCATSFindDialog").not(".setup").addClass("setup");
    jQuery(".ui-dialog").css('z-index', 99999);
}
