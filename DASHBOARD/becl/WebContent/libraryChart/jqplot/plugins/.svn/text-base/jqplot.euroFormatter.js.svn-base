(function($) {
    $.jqplot.euroFormatter = function (format, val) {
        if (!format) {
            format = '%.1f';
        }
        return ''+numberWithCommas($.jqplot.sprintf(format, val));
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    }
})(jQuery);