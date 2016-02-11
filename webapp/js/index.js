// common dependencies
var _c = console || {};

$(function(){ 
    
    _c.log("application start!!!");    

    OL.init();

});

var OL = {
    init: function () {
    
        "use strict";

        var empresa = 0;

        var pymChild = new pym.Child();

        $(".bt").click(function(){
            $(".bt").removeClass("activo");
            $(this).addClass("activo");
            cambiaSwitch();
        });


        var myElement = document.getElementById('switcher');  //hammer.js to swipe swithcer
        var mc = new Hammer(myElement);
        mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        // listen to events...
        var lado = "";
        mc.on("panleft panright panend", function(ev) {
            //myElement.textContent = ev.type +" gesture detected.";
            //console.log(ev.type)
    
            if(ev.type == "panright" || ev.type == "panleft"){
                lado = ev.type; 
            }else if(ev.type == "panend"){
                if(lado == "panright"){
                    $(".bt").removeClass("activo");
                    $("#btOrto").addClass("activo");
                }else if(lado == "panleft"){
                    $(".bt").removeClass("activo");
                    $("#btCato").addClass("activo");
                }

                cambiaSwitch();
             }
        });


        function cambiaSwitch(){

            if(empresa == 0){
                $(".switcher").addClass("der");
                $("div.fotoCato").addClass("ver");
                $("div.fotoOrto").removeClass("ver");
               /* $("div.textoCato").addClass("ver");
                $("div.textoOrto").removeClass("ver");*/
                $("div.textoCato").fadeOut(200);
                $("div.textoOrto").delay(100).fadeIn(200);
                empresa = 1;
            }else{
                $(".switcher").removeClass("der");
                $("div.fotoCato").removeClass("ver");
                $("div.fotoOrto").addClass("ver");
                /*$("div.textoCato").removeClass("ver");
                $("div.textoOrto").addClass("ver");*/
                $("div.textoOrto").fadeOut(200);
                $("div.textoCato").delay(100).fadeIn(200);
                empresa = 0;
            };

            pymChild.sendHeight(); 
        };



  // Empresa ( 0 - Edesur / 1 - Edenor) 
        
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
                    $append.fadeIn(100);

                    // when modal is closed cleaner append div
                    $(".cerrar2", $append).on("click", function(){
                        $append.fadeOut("fast", function(){ $append.html(""); });
                        return false;
                    });
                });
                return false;
            });
        } 
};