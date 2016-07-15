$(document).ready(function() {
                $("#lightSlider").lightSlider({
                item:5,
                loop:true,
                slideMove:1,
                speed:600,slideWidth:200
            });  
          });
                $( "div#list" ).on({
                click: function() {
                $( this ).siblings("#unvisible").toggleClass("unvisible");
                }});

                $( "p.click" ).on({
                click: function() {
                $( this ).siblings(".subplace").toggleClass("placeClick");
                var a = $(this).text();
                var s = $(this).find("span").text();
                 $(this).text(s).append($('<span/>', {text:a.replace(s,"")}));
                }});