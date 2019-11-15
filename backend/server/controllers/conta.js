module.exports.getContas = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var contaModel = new application.server.models.contaDAO(connection);

        contaModel.getContas(function(error, result) {
            // console.log(result);
            if (!result) {
                response.send({success: true, response: false});
                contaModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                contaModel._connection.end();
            }
        });
    }
}

module.exports.createConta = function(application, request, response){

    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var contaModel = new application.server.models.contaDAO(connection);

        var params = {
            nome_companhia: request.body.nome_companhia,
            trade_marcador: request.body.trade_marcador,
            dominio: request.body.dominio,
            subdominio: request.body.subdominio,
            email: request.body.email,
            celular: request.body.celular,
            telefone_fixo: request.body.telefone_fixo,
            ativo: parseInt(request.body.ativo),
            utc_data_criacao: new Date(),
            licenca_url: request.body.licenca_url,
            confirmado: parseInt(request.body.confirmado),
            slug_conta_tipo: request.body.slug_conta_tipo,
            parente_conta_id: parseInt(request.body.parente_conta_id),
            parente_login_permissao: parseInt(request.body.parente_login_permissao),
            filial_id: parseInt(request.body.filial_id)
        };
        //  if(params.nome_companhia && params.trade_marcador) {
            contaModel.createConta(params, function(error, result) {
                console.log(error);

                if (!result) {
                    response.send({success: true, response: false});
                    contaModel._connection.end();
                    console.log("deu erro");
                    console.log(result);
                } 
                else {
                    response.send({success: true, response: result});
                    contaModel._connection.end();
                }
            });
        // }
        // else {
        //     response.send({success: false});
        //     contaModel._connection.end();
        // } 
    }
}

module.exports.editConta = function(application, request, response){

    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var contaModel = new application.server.models.contaDAO(connection);

        var params = {
            id: request.body.id,
            nome_companhia: request.body.nome_companhia,
            trade_marcador: request.body.trade_marcador,
            dominio: request.body.dominio,
            subdominio: request.body.subdominio,
            email: request.body.email,
            celular: request.body.celular,
            telefone_fixo: request.body.telefone_fixo,
            licenca_url: request.body.licenca_url,
            slug_conta_tipo: request.body.slug_conta_tipo,
        };
        //  if(params.nome_companhia && params.trade_marcador) {
            contaModel.editConta(params, function(error, result) {
                console.log(error);

                if (!result) {
                    response.send({success: true, response: false});
                    contaModel._connection.end();
                    console.log("deu erro");
                    console.log(result);
                } 
                else {
                    response.send({success: true, response: result});
                    contaModel._connection.end();
                }
            });
        // }
        // else {
        //     response.send({success: false});
        //     contaModel._connection.end();
        // } 
    }

}

module.exports.deleteConta = function(application, request, response) {

    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var contaModel = new application.server.models.contaDAO(connection);

        var contaId = request.body.contaId;

        if (contaId >= 0) {
            contaModel.deleteConta(contaId, function(error, result) {

                console.log(error);

                if (!result) {
                    response.send({success: true, response: false});
                    contaModel._connection.end();
                } 
                else {
                    response.send({success: true, response: result});
                    contaModel._connection.end();
                }
            });
        }
        else {
            response.send({success: true, response: false});
        }
    }
}
