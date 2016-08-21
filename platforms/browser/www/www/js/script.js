$( document ).on( "pagecreate", "#page", function() {
    var info = [];
    
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

    $(document).delegate('#left-panel ul li > a', 'tap', function () {
        var href = $(this).attr('href').replace('#','');
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
        if (typeof navigator !== "undefined" && navigator.app) {
            // Mobile device.
            navigator.app.loadUrl($this.attr('href'), {openExternal: true});
        } else {
            // Possible web browser
            window.open($this.attr('href'), "_blank");
        }
    });
});
