module.exports.getPDV = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var pdvModel = new application.server.models.pdvDAO(connection);
        var idFilial = request.query.idFilial;

        pdvModel.getPDV(idFilial, function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                pdvModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                pdvModel._connection.end();
            }
        });
    }
}

module.exports.updatePDV = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var pdvModel = new application.server.models.pdvDAO(connection);

        var params = {
            id: request.body.id,
            atributo: request.body.atributo,
            informacao: request.body.informacao,
        };
        pdvModel.updatePDV(params, function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                pdvModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                pdvModel._connection.end();
            }
        });
    }
}

module.exports.deletePDV = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var pdvModel = new application.server.models.pdvDAO(connection);
        var params = {
            PDVid: request.body.id,
        }

        if(params.PDVid >= 0){
            pdvModel.deletePDV(params.PDVid, function(error, result) {
                if (!result) {
                    response.send({success: true, response: false});
                    pdvModel._connection.end();
                } 
                else {
                    response.send({success: true, response: result});
                    pdvModel._connection.end();
                }
            });
        }
        else{
            response.send({success: false});
            pdvModel._connection.end();
        }
    }
}

module.exports.getPDVS = function(application, request, response){
    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var pdvModel = new application.server.models.pdvDAO(connection);

        pdvModel.getPDVS(function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                pdvModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                pdvModel._connection.end();
            }
        });
    }
}
module.exports.savePDV = function(application, request, response) {

    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var pdvModel = new application.server.models.pdvDAO(connection);

        var params = {
            nome: request.body.nome,
            descricao: request.body.descricao,
            filial_id: parseInt(request.body.filial_id),
            mac_addr: request.body.mac_addr,
            hash: request.body.hash,
            chave_hash: request.body.chave_hash,
            ultimo_comm: request.body.ultimo_comm,
            ativo: 1,
        };
        if(params.nome){
            pdvModel.savePDV(params, function(error, result) {
                // console.log(resuxlt);

                if (!result) {
                    response.send({success: true, response: false});
                    pdvModel._connection.end();
                } 
                else {
                    response.send({success: true, response: result});
                    pdvModel._connection.end();

                }

            });
        }
        else{
            response.send({success: false});
            pdvModel._connection.end();
        }
        
    }
}