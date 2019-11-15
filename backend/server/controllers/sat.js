module.exports.getSAT = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var satModel = new application.server.models.satDAO(connection);
        var idPdv = request.query.idPdv;
        
        satModel.getSAT(idPdv,function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                satModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                satModel._connection.end();
            }
        });
    }
}

module.exports.getCUPONS = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var satModel = new application.server.models.satDAO(connection);
        // var idFilial = request.query.idFilial;

        satModel.getCUPONS(function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                satModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                satModel._connection.end();
            }
        });
    }
}

module.exports.getCUPON = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var satModel = new application.server.models.satDAO(connection);
        var idSat = parseInt(request.query.idSat);
        
        satModel.getCUPON(idSat ,function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                satModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                satModel._connection.end();
            }
        });
    }
}

module.exports.getSATS = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var satModel = new application.server.models.satDAO(connection);
        // var idFilial = request.query.idFilial;

        satModel.getSATS(function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                satModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                satModel._connection.end();
            }
        });
    }
}

module.exports.saveSAT = function(application, request, response) {

    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection();
        var satModel = new application.backend.server.models.satDAO(connection);
        var params = {
            descricao: request.body.descricao,
            id_ponto_de_venda: parseInt(request.body.id_ponto_de_venda),
            serial: request.body.serial,
            nome: request.body.nome,
        };
        console.log(params.id_ponto_de_venda)

        if(params.nome){
            satModel.saveSAT(params, function(error, result) {
                if (!result) {
                    response.send({success: true, response: false});
                    satModel._connection.end();
                } 
                else {
                    response.send({success: true, response: result});
                    satModel._connection.end();
                }
            });
        }
        else{
            response.send({success: false});
            satModel._connection.end();
        }
        
    }
}