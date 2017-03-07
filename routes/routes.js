var router = require('express').Router();
var soda = require('soda-js');
//var sodaOpts = config.socrata;
//var producer = new soda.Producer('data.kingcounty.gov', sodaOpts);

var routes = function (config) {
  var producer = new soda.Producer('data.kingcounty.gov', config.socrata);
  router.route('/')
    .get(function (req, res) {
      res.render('index');
    })
    .post(function (req, res) {
      var body = req.body;
      body.displayOnHomePage = (body.displayOnHomePage) ? true : false;
      body.categoryArtsCulture = (body.categoryArtsCulture) ? true : false;
      body.categoryBestStarts = (body.categoryBestStarts) ? true : false;

      var data = {
        start_time: body.startTimeDate,
        end_time: body.endTimeDate,
        event_name: body.eventName,
        event_description_details: body.eventDescription,
        location_name: body.locationName,
        location: {
          human_address: {
            address:body.street,
            city:body.city,
            state: body.state,
            zip: body.zip
          }
        },
        url: body.linkUrl,
        contact_name: body.contactName,
        contact_email: body.contactEmail,
        contact_phone: body.contactPhoneType,
        host_contact_department: body.contactDept,
        feed_keyword_s: body.feedKeywords,
        home_page_y_n: body.displayOnHomePage,
        arts_culture: body.categoryArtsCulture,
        best_starts_for_kids: body.categoryBestStarts,
        business: body.categoryBusiness,
        closure: '',
        council: '',
        courts: '',
        elections: '',
        emergency: '',
        employees: '',
        environment: '',
        events: '',
        executive: '',
        health: '',
        jails: '',
        jobs: '',
        licenses: '',
        metro: '',
        news: '',
        operations: '',
        parks: '',
        permits: '',
        pets: '',
        property: '',
        recreation: '',
        recycling_trash: '',
        roads: '',
        rural: '',
        safety: '',
        sheriff: '',
        socialservices: '',
        transportation: '',
        volunteer: '',
        tac_meeting: ''
      };
      // Push to Socrata
      producer.operation()
        .withDataset('w9jp-gibf')
        .add(data)
          .on('success', function(row) { console.log(row);  })
          .on('error', function(error) { console.error(error); })
      res.redirect('/');
    });
  return router;
};

module.exports = routes;
