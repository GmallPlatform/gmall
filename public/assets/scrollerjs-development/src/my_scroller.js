(function($){
    $.fn.extend({
        panOnMove: function() {
            return this.each(function() {
                var viewport = $(this),
                    ratio = {
                        x: this.scrollWidth / viewport.width(),
                        y: this.scrollHeight / viewport.height()
                    };
                // Attach event listeners
                viewport.bind({
                    mousemove: function(e) {
                        var viewportOffset = viewport.offset();
                        viewport.scrollLeft(ratio.x * (e.pageX - viewportOffset.left));
                        viewport.scrollTop(ratio.y * (e.pageY - viewportOffset.top));
                        //viewport.trigger('pan');
                    }
                });
            });
        }
    });
})(jQuery);