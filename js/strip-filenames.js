// credits to yoot for making this javascript
$(function () {
    if (!window.Options) {
        return;
    }

    Options.extend_tab(
        'general',
        '<label id="strip-filenames">' +
            '<input type="checkbox">' +
            _('Strip filenames') +
        '</label>'
    );

    $('#strip-filenames > input').on('change', function () {
        localStorage.strip_filenames =
            localStorage.strip_filenames === 'true' ? 'false' : 'true';
    });

    if (localStorage.strip_filenames === 'true') {
        $('#strip-filenames > input').prop('checked', true);
    }
});
