module.exports = function(application) {
  
  application.post('/token/check', function(request, response) {
    application.server.controllers.misc.checkToken(application, request, response);
  });

  application.post('/send/mail', function(request, response) {
    application.server.controllers.misc.sendMail(application, request, response);
  });
  
}
