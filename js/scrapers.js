var xingscraper = {
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
    }()
};



var linkedinscraper = {
    name: $($('#name .full-name')).text().trim(),
    image: $($('.profile-picture img')[0]).attr('src'),
    job_title: $('#headline .title').text().split(' at ')[0],
    current_company: $('#headline .title').text().split(' at ')[1],
    current_company_location: $('#location .locality').text(),
    profil_url: window.location.href,
    languages: function() {
        return $.map($('#languages-view .section-item'), function(language) {
            return {
                name: $(language).find('h4').text().trim(),
                level: $(language).find('.languages-proficiency').text().trim()
            }
        });
    }(),
    is_contact: $($('.profile-actions.view-actions.outside-dropdown .button-primary')[0]).attr('data-action-name') !== 'add-to-network',
    connection_path: parseInt($('.connections-map-more').text()),
    cv: function() {
        return $.map($('#background-experience .section-item'), function(entry) {
            var fromUntil = $(entry).find('.experience-date-locale time');
            return  {
                from: $(fromUntil[0]).text(),
                until: $(fromUntil[1]).text(),
                company: $($(entry)).find('h5 span strong a').text().trim(),
                position: $($(entry)).find('h4 a').text().trim(),
            };
        });
    }()
};



