

	
		
/* Masonry Isotope init */
jQuery.noConflict()(function($){
			var $container = $('#container-folio');
					
			if($container.length) {
				$container.waitForImages(function() {
					$(this).slideDown();
					// initialize isotope
					$container.isotope({
					
					  itemSelector : '.box',
					  
					  resizable: false, // disable normal resizing
					 masonry: { columnWidth: $container.width() / 12 }
					});
					
					// filter items when filter link is clicked
					$('#filters a').click(function(){
					  var selector = $(this).attr('data-filter');
					  $container.isotope({ filter: selector });
					  $(this).removeClass('active').addClass('active').siblings().removeClass('active all');
					  
					  return false;
					});
					 
						// update columnWidth on window resize
						$(window).smartresize(function(){
		
							$(window).smartresize(function(){
				  $container.isotope({
					// update columnWidth to a percentage of container width
					masonry: { columnWidth: $container.width() / 12 }
				  }); 
				  
				  });

		});
					
					
					
				},null,true);
				
			}});

		jQuery.noConflict()(function($){	
		
		$('#countdown').countdown('2014/12/12', function(event) {
			$(this).html(event.strftime('%w weeks %d days <br /> %H:%M:%S'));
		});
			
		
		 // Basic FitVids Test
        $(".container").fitVids();	
		
		$(function(){
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 40
			});
		});
	
	});
	
		
	
		