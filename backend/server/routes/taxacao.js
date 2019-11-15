module.exports = function(application) {
  
	application.post('/taxacao/post/', function(request, response) {
		application.server.controllers.taxacao.saveTaxacao(application, request, response);
	});

	application.get('/taxacao/get/', function(request, response) {
		application.server.controllers.taxacao.getTaxacao(application, request, response);
	});

}