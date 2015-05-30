    // console.log('inject');
    // var readyStateCheckInterval = setInterval(function() {
    //     if (document.readyState === "complete") {
    //         clearInterval(readyStateCheckInterval);

    //         // We check if we are on xing
    //         if(window.location.host === 'www.xing.com') {
    //             if($('.component-user-name').length === 1) {
    //                 var xingscraper = {
    //                     name: $($('h1.mr10')[0]).text().trim(),
    //                     image: $($('img.user-image')[0]).attr('src'),
    //                     job_title: $($('strong.job-title')[0]).text().trim(),
    //                     current_company: $($('.company-name')[0]).text().trim(),
    //                     current_company_location: $($('.company-location')[0]).text().trim(),
    //                     is_lookin_for_job: function() {
    //                         var isLooking = $($('.projobs-status')[0]).text().trim();
    //                         if(isLooking === '') {
    //                             return false;
    //                         }
    //                         if(isLooking == 'Derzeit kein Interesse an Jobangeboten') {
    //                             return false;
    //                         }
    //                         return true;
    //                     }(),
    //                     profil_url: window.location.href,
    //                     languages: function() {
    //                         return $.map($('#language-skills .language'), function(language) {
    //                             return {
    //                                 name: $(language).find('h3').text().trim(),
    //                                 level: $(language).find('.language-level-name').text().trim()
    //                             }
    //                         });
    //                     }(),
    //                     notes: $('#notes-textarea').val(),
    //                     is_contact: $('#contact-path ul li').length === 2,
    //                     connection_path: $('#contact-path ul li').length,
    //                     cv: function() {
    //                         return $.map($('.cv-entry'), function(entry) {
    //                             var fromUntil = $(entry).find('.details .additional.top').text().split(' - ');
    //                             return  {
    //                                 from: fromUntil[0],
    //                                 until: fromUntil[1] ,
    //                                 duration: $($(entry)).find('.duration .label').text().trim(),
    //                                 company: $($(entry)).find('.job-company-name').text().trim(),
    //                                 position: $($(entry)).find('.job-title').text()
    //                             };
    //                         });
    //                     }(),
    //                     email: false,
    //                     website: false
    //                 };
    //                 console.log('sendMessage', xingscraper);
    //                 chrome.runtime.sendMessage({'type' : 'xing', data: xingscraper});
    //             }
    //         }
    //     }
    // }, 10);
    //


if(window.location.host === 'www.xing.com') {
    if($('.component-user-name').length === 1) {
        chrome.runtime.sendMessage({'signal' : 'xing'});
    }
}



/* Inform the backgrund page that
 * this tab should have a page-action */
chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showPageAction'
});

/* Listen for message from the popup */
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    /* First, validate the message's structure */
    if ((msg.from === 'popup') && (msg.subject === 'getInfo')) {
        /* Collect the necessary data
         * (For your specific requirements `document.querySelectorAll(...)`
         *  should be equivalent to jquery's `$(...)`) */
        /* Directly respond to the sender (popup),
         * through the specified callback */
        response({
            name: $($('h1.mr10')[0]).text().trim(),
            image: $($('img.user-image')[0]).attr('src'),
            job_title: $($('strong.job-title')[0]).text().trim(),
            current_company: $($('.company-name')[0]).text().trim(),
            current_company_location: $($('.company-location')[0]).text().trim(),
            is_lookin_for_job: function() {
                var isLooking = $($('.projobs-status')[0]).text().trim();
                if(isLooking === '') {
                    return false;
                }
                if(isLooking == 'Derzeit kein Interesse an Jobangeboten') {
                    return false;
                }
                return true;
            }(),
            profil_url: window.location.href,
            languages: function() {
                return $.map($('#language-skills .language'), function(language) {
                    return {
                        name: $(language).find('h3').text().trim(),
                        level: $(language).find('.language-level-name').text().trim()
                    }
                });
            }(),
            notes: $('#notes-textarea').val(),
            is_contact: $('#contact-path ul li').length === 2,
            connection_path: $('#contact-path ul li').length,
            cv: function() {
                return $.map($('.cv-entry'), function(entry) {
                    var fromUntil = $(entry).find('.details .additional.top').text().split(' - ');
                    return  {
                        from: fromUntil[0],
                        until: fromUntil[1] ,
                        duration: $($(entry)).find('.duration .label').text().trim(),
                        company: $($(entry)).find('.job-company-name').text().trim(),
                        position: $($(entry)).find('.job-title').text()
                    };
                });
            }(),
            email: false,
            website: false
        });
    }
});
