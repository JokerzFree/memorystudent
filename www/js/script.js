$( document ).on( "pagecreate", "#page", function() {
    var info = [];

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady(){
        toast('Запустилось!');
        var exitApp = false, intval = setInterval(function (){exitApp = false;}, 1000);
        document.addEventListener("backbutton", function (e){
            e.preventDefault();
            if (exitApp) {
                clearInterval(intval) 
                (navigator.app && navigator.app.exitApp()) || (device && device.exitApp())
            }
            else {
                toast('Нажмите "Назад" еще раз для выхода из приложения');
                exitApp = true
                history.back(1);
            } 
        }, false);
    }


    $.get('pages/main.txt', function(data) {
      $("#main").html(data).trigger('create');;
      info['main'] = data;
    }, 'text');

    $( document ).on( "swiperight", "#page", function( e ) {
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        } else if ($( ".ui-page-active" ).jqmData( "panel" ) == "open"){
			$( "#left-panel" ).panel( "close" );
    	}
    });

    $(document).delegate('#left-panel ul li > a', 'click', function () {
        var href = $(this).attr('href').replace('#','');
        console.log(href);
        if (href != ''){
            if (info[href]==null){
                $.get('pages/'+href+'.txt', function(data) {
                  $("#main").html(data).trigger('create');
                  info[href] = data;
                }, 'text');
            } else {
                $("#main").html(info[href]).trigger('create');;
            }
            $('html, body').stop().animate({ scrollTop : 0 }, 500);
            $("[data-role=panel]").panel("close");
        }
    });

    $(".ui-collapsible-heading-toggle").on('click', function(){
        var item = $(this);
        if (!item.hasClass('ui-icon-minus')){
            $("li.ui-collapsible").not(item).collapsible( "collapse" );
        }
    });

    $(document).on('tap', 'a[href^="http://"], a[href^="https://"]', function(e){
        e.preventDefault();
        $this = $(this);
        window.open($this.attr('href'), '_system');
    });

    function toast(message) {
        var $toast = $('<div class="ui-loader ui-overlay-shadow ui-body-e ui-corner-all"><h3>' + message + '</h3></div>');

        $toast.css({
            display: 'block', 
            background: '#fff',
            opacity: 0.90, 
            position: 'fixed',
            padding: '7px',
            'text-align': 'center',
            width: '80%',
            left: '10%',
            top: '50%'
        });

        var removeToast = function(){
            $(this).remove();
        };

        $toast.click(removeToast);

        $toast.appendTo($.mobile.pageContainer).delay(2000);
        $toast.fadeOut(400, removeToast);
    }
});
