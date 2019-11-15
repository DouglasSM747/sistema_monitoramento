module.exports = function(application) {
  
    application.get('/pdv/get/', function(request, response) {
      	application.server.controllers.pdv.getPDV(application, request, response);
    });
    
    application.get('/pdvs/get/', function(request, response) {
        application.server.controllers.pdv.getPDVS(application, request, response);
    });
    
    application.post('/pdv/post/', function(request, response) {
      	application.server.controllers.pdv.savePDV(application, request, response);
    });

    application.post('/pdv/delete/', function(request, response) {
        application.server.controllers.pdv.deletePDV(application, request, response);
    });

    application.post('/pdv/update/', function(request, response) {
        application.server.controllers.pdv.updatePDV(application, request, response);
    });
  
}
  