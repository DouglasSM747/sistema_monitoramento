module.exports.getCompra = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var idpdv = request.query.idpdv;
        filialModel.getCompra(idpdv,function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                filialModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                filialModel._connection.end();
            }
        });
    }
}

module.exports.getEstoque = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var idpdv1 = request.query.idpdv;
        filialModel.getEstoque(idpdv1,function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                filialModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                filialModel._connection.end();
            }
        });
    }
}

module.exports.getProdutos = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var idcompra = request.query.idcompra;
        filialModel.getProdutos(idcompra,function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                filialModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                filialModel._connection.end();
            }
        });
    }
}

module.exports.simpleSearchFilial = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var nome = request.query.pesquisa;

        filialModel.simpleSearchFilial(nome, function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                filialModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                filialModel._connection.end();
            }
        });
    }
}

module.exports.advancedSearchFilial = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var params = {
            status: parseInt(request.query.status),
            tributacao: parseInt(request.query.trib),
            ordem: request.query.ordem,
            bairro: request.query.bairro,
        } 
        filialModel.advancedSearchFilial(params, function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                filialModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                filialModel._connection.end();
            }
        });
    }
}

module.exports.updateFilial = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);

        var params = {
            id: request.body.id,
            nome: request.body.nome,
            telefone_fixo: request.body.telefone_fixo,
            cnpj: request.body.cnpj,
            inscricao_estadual: request.body.inscricao_estadual,
            filial_tipo: parseInt(request.body.filial_tipo),
            sistema_tributacao_id: parseInt(request.body.sistema_tributacao_id),
            sefaz_chave_seguranca: request.body.sefaz_chave_seguranca,
            status: 1,
            cep: request.body.cep,
            bairro: request.body.bairro,
            pais: request.body.pais,
            cidade: request.body.cidade,
            uf: request.body.uf,
            rua: request.body.rua,
            numero: request.body.numero,
            complemento: request.body.complemento,
            latitude: parseFloat(request.body.latitude),
            longitude: parseFloat(request.body.longitude)
        };

        filialModel.updateFilial(params, function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                filialModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                filialModel._connection.end();
            }
        });
    }
}