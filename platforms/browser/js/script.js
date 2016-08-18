$( document ).on( "pagecreate", "#page", function() {
    var info = [];

    $.get('pages/main.txt', function(data) {
      $("#main").html(data);
      info['main'] = data;
    }, 'text');

    $( document ).on( "swiperight swipeleft", "#page", function( e ) {
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            } else if (e.type === 'swipeleft') {
                $( "#right-panel" ).panel( "open" )
            }
        } else if ($( ".ui-page-active" ).jqmData( "panel" ) == "open"){
			$( "#left-panel" ).panel( "close" );
            $( "#right-panel" ).panel( "close" );
    	}
    });

    $(document).delegate('#left-panel ul li > a', 'tap', function () {
        var href = $(this).attr('href').replace('#','');
        if (href != ''){
            if (info[href]==null){
                $.get('pages/'+href+'.txt', function(data) {
                  $("#main").html(data);
                  info[href] = data;
                }, 'text');
            } else {
                $("#main").html(info[href]);
            }
            //
            $('html, body').stop().animate({ scrollTop : 0 }, 500);
            $("[data-role=panel]").panel("close");
        }
    });

    $(document).on('tap', 'a[href^="http://"], a[href^="https://"]', function(e){

        e.preventDefault();
        var $this = $(this); 
        var target = $this.data('inAppBrowser') || '_system';

        window.open($this.attr('href'), target, 'location=no');
    });
});
