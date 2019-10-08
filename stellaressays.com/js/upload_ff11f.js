$(function () {
    var ul = $('#upload_f ul');
    $('#browse_file').click(function () {
        // Simulate a click on the file input button
        // to show the file browser dialog
        $(this).parent().find('input').click();
    });
    // Initialize the jQuery File Upload plugin
    $('#upload_f').fileupload({
        url: '/files_upload',
        // This element will accept file drag/drop uploading
        dropZone: $('#drop'),
        // This function is called when a file is added to the queue;
        // either via the browse button, or via drag/drop:
        add: function (e, data) {
            $('#upload_all_files').val('0');
            var fname = data.files[0].name;
            
            if (fname.length > 26) {
                var str = fname.substr(0, 26);
                fname = str + '...';
            }
          //  alert($('.bx-viewport').css('height'));
            var tpl = $('<li class="working"><input class="knb" type="text" value="0" data-width="18" data-height="18"' +
                    ' data-fgColor="#49a8eb" data-readOnly="1" data-bgColor="#49a8eb" /><p></p><span></span></li>');

            // Append the file name and file size
            tpl.find('p').text(fname).append('<i>' + formatFileSize(data.files[0].size) + '</i><input name="new_files[]" type="text" value="' + data.files[0].name + '" hidden />');
            orderContainerHeight();
            
            // Add the HTML to the UL element
            data.context = tpl.appendTo(ul);

            // Initialize the knob plugin
            tpl.find('.knb').knob();

            // Listen for clicks on the cancel icon
            tpl.find('span').click(function () {

                if (tpl.hasClass('working')) {
                    jqXHR.abort();
                }

                tpl.fadeOut(function () {
                    tpl.remove();
                });

            });

            if ($('#file_order_id').length) {
                data.formData = {order_id: $('#file_order_id').val()};
            }

            // Automatically upload the file once it is added to the queue
            var jqXHR = data.submit();
        },
        progress: function (e, data) {

            // Calculate the completion percentage of the upload
            var progress = parseInt(data.loaded / data.total * 100, 10);

            // Update the hidden input field and trigger a change
            // so that the jQuery knob plugin knows to update the dial
            data.context.find('.knb').val(progress).change();

            if (progress == 100) {
                if ($('#up_file_user').length) {
                    $('#no-attach').hide();
                    var order = $('#file_order_id').val();
                    var now = new Date();
                    var day = ("0" + now.getDate()).slice(-2);
                    var month = ("0" + (now.getMonth() + 1)).slice(-2);
                    var today = (month) + "/" + (day) + "/" + now.getFullYear();
                    var add_newfile = '<div class="name">'
                                + order + '_' + data.files[0].name + '<br><br>'
                                +'</div>';
  
                    $('#up_file_user').append(add_newfile);
                    data.context.removeClass('working');
                }
            }
           
        },
        done: function (e, data) {
            $('#upload-error').hide();
            orderContainerHeight();
        },
        stop: function (e) {
            //Global Done All Files
            $('#upload-error').hide();
            $('#upload_all_files').val('1');
        },
        fail: function (e, data) {
            // Something has gone wrong!
            data.context.addClass('error');
            $('#upload-error').hide();
        }

    });


    // Prevent the default action when a file is dropped on the window
    $(document).on('drop dragover', function (e) {
        e.preventDefault();
    });

    // Helper function that formats the file sizes
    function formatFileSize(bytes) {
        if (typeof bytes !== 'number') {
            return '';
        }

        if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }

        if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }

        return (bytes / 1000).toFixed(2) + ' KB';
    }

    function formatAMPM() {
        date = new (Date);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


});