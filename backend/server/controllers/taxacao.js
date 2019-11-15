module.exports.saveTaxacao = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var taxacaoModel = new application.server.models.taxacaoDAO(connection);
        
        var params = {
            nome: request.body.name,
            ativo: parseInt(request.body.active)
        };
        
        if(params.nome) {
            taxacaoModel.saveTaxacao(params, function(error, result) {
                if (error || !result) {
                    response.send({success: false});
                    taxacaoModel._connection.end();
                }
                else {
                    response.send({success: true});
                    taxacaoModel._connection.end();
                }
            });
        }
        else {
            response.send({success: false});
            taxacaoModel._connection.end();
        }
    }
}

module.exports.getTaxacao = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var taxacaoModel = new application.server.models.taxacaoDAO(connection);

        taxacaoModel.getTaxacao(function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                taxacaoModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                taxacaoModel._connection.end();
            }
        });
    }
}