module.exports = function(application) {
  
    application.get('/sat/get/', function(request, response) {
      	application.server.controllers.sat.getSAT(application, request, response);
    });

    application.get('/sats/get/', function(request, response) {
        application.server.controllers.sat.getSATS(application, request, response);
    });

    application.post('/sat/post/', function(request, response) {
      	application.server.controllers.sat.saveSAT(application, request, response);
    });

    application.get('/cupons/get/', function(request, response) {
        application.server.controllers.sat.getCUPONS(application, request, response);
    });

    application.get('/cupon/get/', function(request, response) {
        application.server.controllers.sat.getCUPON(application, request, response);
    });
}
  