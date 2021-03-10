// Adapted from popin notes
// http://ignorethecode.net/blog/2010/04/20/footnotes/ 

// this script requires jQuery

var Footnotes = {
    footnotetimeout: false,
    setup: function() {
        var footnotelinks = $("a[rel='footnote']")
        
        footnotelinks.unbind('mouseover',Footnotes.footnoteover);
        footnotelinks.unbind('mouseout',Footnotes.footnoteoout);
        
        footnotelinks.bind('mouseover',Footnotes.footnoteover);
        footnotelinks.bind('mouseout',Footnotes.footnoteoout);
    },
    footnoteover: function() {
        clearTimeout(Footnotes.footnotetimeout);
        $('#footnotediv').stop();
        $('#footnotediv').remove();
        
        var id = $(this).attr('href').substr(1);
        var position = $(this).offset();
    
        var div = $(document.createElement('div'));
        div.attr('id','footnotediv');
        div.bind('mouseover',Footnotes.divover);
        div.bind('mouseout',Footnotes.footnoteoout);

        var el = document.getElementById(id);
        div.html($(el).html());
        
        div.css({
            position:'absolute',
            width:'400px',
            opacity:0.9
        });
        $(document.body).append(div);

        var left = position.left;
        if(left + 420  > $(window).width() + $(window).scrollLeft())
            left = $(window).width() - 420 + $(window).scrollLeft();
        var top = position.top+20;
        if(top + div.height() > $(window).height() + $(window).scrollTop())
            top = position.top - div.height() - 15;
        div.css({
            left:left,
            top:top
        });
    },
    footnoteoout: function() {
        Footnotes.footnotetimeout = setTimeout(function() {
            $('#footnotediv').animate({
                opacity: 0
            }, 600, function() {
                $('#footnotediv').remove();
            });
        },100);
    },
    divover: function() {
        clearTimeout(Footnotes.footnotetimeout);
        $('#footnotediv').stop();
        $('#footnotediv').css({
                opacity: 0.9
        });
    }
}


$(document).ready(function() {
    var sups = document.getElementsByTagName('sup');
    var footnotehtml = [];
    for(var i=0; i<sups.length; i++) {
        var sup = sups[i];
        if(sup['id'] && sup['id'].substr(0,3) == 'fnr') {
            var footnr = sup['id'].substr(3);
            var footnote = document.getElementById('fn'+footnr);
            if(!footnote) {
                continue;
            }
            footnotehtml[i] = footnote.innerHTML;
            sup.setAttribute('footnoteindex',i);
            sup.onmouseover = function(event) {
                var footnotepopup = document.getElementById('footnotepopup');
                if(footnotepopup) {
                    footnotepopup.parentNode.removeChild(footnotepopup);
                }
                var index = parseInt(this.getAttribute('footnoteindex'));
                var popup = document.createElement('div');
                popup.innerHTML = footnotehtml[index];
                popup.id = 'footnotepopup';
                popup.style.left = (event.pageX) + 'px';
                popup.style.top = (event.pageY) + 'px';

                
                document.body.appendChild(popup);
                popup.classList.add("footnotepopup")
            };
            sup.onmouseout = function(event) {
                var footnotepopup = document.getElementById('footnotepopup');
                if(footnotepopup) {
                    footnotepopup.parentNode.removeChild(footnotepopup);
                }
            };
        }
    }

    Footnotes.setup();    
});
