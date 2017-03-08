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
      body.categoryAirport = (body.categoryAirport) ? true : false;
      body.categoryArtsCulture = (body.categoryArtsCulture) ? true : false;
      body.categoryBestStarts = (body.categoryBestStarts) ? true : false;
      body.categoryBusiness = (body.categoryBusiness) ? true : false;
      body.categoryClosure = (body.categoryClosure) ? true : false;
      body.categoryCouncil = (body.categoryCouncil) ? true : false;
      body.categoryCourts = (body.categoryCourts) ? true : false;
      body.categoryElections = (body.categoryElections) ? true : false;
      body.categoryEmergency = (body.categoryEmergency) ? true : false;
      body.categoryEmployees = (body.categoryEmployees) ? true : false;
      body.categoryEnvironment = (body.categoryEnvironment) ? true : false;
      body.categoryEvents = (body.categoryEvents) ? true : false;
      body.categoryExecutive = (body.categoryExecutive) ? true : false;
      body.categoryFleetAuctions = (body.categoryFleetAuctions) ? true : false;
      body.categoryHealth = (body.categoryHealth) ? true : false;
      body.categoryJails = (body.categoryJails) ? true : false;
      body.categoryJobs = (body.categoryJobs) ? true : false;
      body.categoryLicenses = (body.categoryLicenses) ? true : false;
      body.categoryMetro = (body.categoryMetro) ? true : false;
      body.categoryNews = (body.categoryNews) ? true : false;
      body.categoryOperations = (body.categoryOperations) ? true : false;
      body.categoryParks = (body.categoryParks) ? true : false;
      body.categoryPermits = (body.categoryPermits) ? true : false;
      body.categoryPets = (body.categoryPets) ? true : false;
      body.categoryProperty = (body.categoryProperty) ? true : false;
      body.categoryRecreation = (body.categoryRecreation) ? true : false;
      body.categoryRecyclingTrash = (body.categoryRecyclingTrash) ? true : false;
      body.categorySolidWasteHome = (body.categorySolidWasteHome) ? true : false;
      body.categorySolidWasteAdvisory = (body.categorySolidWasteAdvisory) ? true : false;
      body.categorySolidWasteEcoConsumer = (body.categorySolidWasteEcoConsumer) ? true : false;
      body.categorySolidWasteFacilities = (body.categorySolidWasteFacilities) ? true : false;
      body.categorySolidWasteGreenTools = (body.categorySolidWasteGreenTools) ? true : false;
      body.categorySolidWasteRecyclingEvents = (body.categorySolidWasteRecyclingEvents) ? true : false;
      body.categorySolidWasteWastemobile = (body.categorySolidWasteWastemobile) ? true : false;
      body.categoryRoads = (body.categoryRoads) ? true : false;
      body.categoryRural = (body.categoryRural) ? true : false;
      body.categorySafety = (body.categorySafety) ? true : false;
      body.categorySheriff = (body.categorySheriff) ? true : false;
      body.categorySocialServices = (body.categorySocialServices) ? true : false;
      body.categoryTransportation = (body.categoryTransportation) ? true : false;
      body.categoryVolunteer = (body.categoryVolunteer) ? true : false;
      body.categoryWaterTaxi = (body.categoryWaterTaxi) ? true : false;
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
        airport: body.categoryAirport,
        arts_culture: body.categoryArtsCulture,
        best_starts_for_kids: body.categoryBestStarts,
        business: body.categoryBusiness,
        closure: body.categoryClosure,
        council: body.categoryCouncil,
        courts: body.categoryCourts,
        elections: body.categoryElections,
        emergency: body.categoryEmergency,
        employees: body.categoryEmployees,
        environment: body.categoryEnvironment,
        events: body.categoryEvents,
        executive: body.categoryExecutive,
        fleet_auctions: body.categoryFleetAuctions,
        health: body.categoryHealth,
        jails: body.categoryJails,
        jobs: body.categoryJobs,
        licenses: body.categoryLicenses,
        metro: body.categoryMetro,
        news: body.categoryNews,
        operations: body.categoryOperations,
        parks: body.categoryParks,
        permits: body.categoryPermits,
        pets: body.categoryPets,
        property: body.categoryProperty,
        recreation: body.categoryRecreation,
        recycling_trash: body.categoryRecyclingTrash,
        swd_home: body.categorySolidWasteHome,
        swd_advisory_committee: body.categorySolidWasteAdvisory,
        swd_ecoconsumer: body.categorySolidWasteEcoConsumer,
        swd_facilities: body.categorySolidWasteFacilities,
        swd_greentools: body.categorySolidWasteGreenTools,
        swd_recycling_collection_events: body.categorySolidWasteRecyclingEvents,
        swd_wastemobile: body.categorySolidWasteWastemobile,
        roads: body.categoryRoads,
        rural: body.categoryRural,
        safety: body.categorySafety,
        sheriff: body.categorySheriff,
        socialservices: body.categorySocialServices,
        transportation: body.categoryTransportation,
        volunteer: body.categoryVolunteer,
        water_taxi: body.categoryWaterTaxi,
        tac_meeting: body.categoryTAC
      };
      // Push to Socrata
      producer.operation()
        .withDataset('w9jp-gibf')
        .add(data)
          .on('success', function(row) { console.log(row);  })
          .on('error', function(error) { console.error(error); })
      res.redirect('/thanks');
    });

    router.route('/thanks')
    .get(function (req, res) {
      res.render('thanks');
    })
  return router;
};

module.exports = routes;
