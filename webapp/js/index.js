// common dependencies
var _c = console || {};

$(function(){ 
    
    _c.log("application start!!!");    

    OL.init();

});

/** olcreativa Global aplication handle 
* 
* init
* pymChild
* loader
* is_iframe
* window_width
* onResizedw
* btns_ajax_modal
* 
*/
var OL = {
    init: function () {
    
        "use strict";

        OL.loader.hide();
        
        /** if is not in iframe*/
        if(OL.is_iframe()){ 
            _c.log("You are out an iframe ;-)");
        }
        

        /** execute OL.onResizedw when size of page is changed*/
        var doit;
        window.onresize = function(d) {
          clearTimeout( doit );
          doit = setTimeout( OL.onResizedw, 200 );
        };

        /** init handle ctos modal btns */
        OL.btns_ajax_modal ();
    },

    /** ini PYM*/
    pymChild:  new pym.Child(),

    /** loder mothods */
    loader: {
        $loader: $("#loader"),
        show: function() { OL.loader.$loader.fadeIn(); },
        hide: function() { OL.loader.$loader.fadeOut("slow"); }
    },

    /** check if is an iframe */
    is_iframe: function(){
        return window === window.top;
    },

    /** actual window width*/
    window_width: $(window).width(),
    onResizedw: function () { // on resize stop event
        var w = $(window).width();
        if(OL.window_width != w){
            OL.window_width = w;
            // make changes here!!!
            // my_update()
            _c.log("window resize!!");

            setTimeout(function(){
                OL.pymChild.sendHeight(); // pym !!
            }, 1000);
        
        }
    },

    /** load modal from ".ajax_modal" btn */
    btns_ajax_modal: function (){
            $(".ajax_modal").on("click", function(){
                var $append = $("#append");
                $append.hide();
                $append.load(this.href, function(){
                    $append.fadeIn();

                    // when modal is closed cleaner append div
                    $(".cerrar_creditos", $append).on("click", function(){
                        $append.fadeOut("fast", function(){ $append.html(""); });
                        return false;
                    });
                });
                return false;
            });
        } 
};
