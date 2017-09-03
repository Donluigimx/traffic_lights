
function stop_traffic_light() {
    $.get(
        '/stop_traffic_light',
        function (data) {
            if (data === 'No') {
                return;
            }
            $("#body").removeClass('is-danger').addClass('is-primary');
            setTimeout(
                function () {
                    $("#body").removeClass('is-primary').addClass('is-danger');
                },
                5000
            );
        }
    );
}