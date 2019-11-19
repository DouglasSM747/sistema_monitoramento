module.exports.getCompra = function (application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var idpdv = request.query.idpdv;
        filialModel.getCompra(idpdv, function (error, result) {
            if (!result) {
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}

module.exports.Login = function (application, request, response) {

    if (request.method == 'GET') {

        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var email = request.query.email;
        var senha = request.query.senha;
        filialModel.Login(email, senha, function (error, result) {
            if (!result) {
                console.log(error)
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}

module.exports.getInfo = function (application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var idpdv = request.query.idpdv;
        filialModel.getInfo(idpdv, function (error, result) {
            if (!result) {
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}

module.exports.getEstoque = function (application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var idpdv1 = request.query.idpdv;
        filialModel.getEstoque(idpdv1, function (error, result) {
            if (!result) {
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}

module.exports.getProdutos = function (application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var idcompra = request.query.idcompra;
        filialModel.getProdutos(idcompra, function (error, result) {
            if (!result) {
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}

module.exports.simpleSearchFilial = function (application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var nome = request.query.pesquisa;

        filialModel.simpleSearchFilial(nome, function (error, result) {
            if (!result) {
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}

module.exports.advancedSearchFilial = function (application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var params = {
            status: parseInt(request.query.status),
            tributacao: parseInt(request.query.trib),
            ordem: request.query.ordem,
            bairro: request.query.bairro,
        }
        filialModel.advancedSearchFilial(params, function (error, result) {
            if (!result) {
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}

module.exports.updateFilial = function (application, request, response) {
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

        filialModel.updateFilial(params, function (error, result) {
            if (!result) {
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}

module.exports.deleteProdutoL = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var idpdv = request.query.idpdv;
        var id_produto = request.query.idproduto;

        filialModel.deleteProdutoL(idpdv, id_produto, function (error, result) {
            if (!result) {
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}

module.exports.deleteProdutoF = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var idpdv = request.query.idpdv;
        var id_produto = request.query.idproduto;
        filialModel.deleteProdutoF(idpdv, id_produto, function (error, result) {
            if (!result) {
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}


module.exports.addProduto = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);

        var params = {
            fk2_idPDV: parseInt(request.body.idpdv),
            quantidade_estoque: parseInt(request.body.quantidade),
            id_produto: parseInt(request.body.idproduto),
            nome_produto: request.body.nome,
            valor: parseInt(request.body.valor),
            status: parseInt(request.body.status),
        };


        filialModel.addProduto(params, function (error, result) {
            if (!result) {
                console.log(error);
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}
module.exports.saveInfo = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);

        var params = {
            nomepdv: request.body.nomepdv,
            nota: request.body.nota,
            localizacao: request.body.localizacao,
            nome_dono_PDV: request.body.nome_dono_PDV,
            data_fundacao: request.body.data_fundacao,
            preco_medio: request.body.preco_medio,
            CESP: request.body.nomepdv,
            telefone_fixo: request.body.telefone_fixo,
            informacoes_PDVcol: request.body.informacoes_PDVcol,
            fk_id_PDV: request.body.atual_pdv
        };


        filialModel.saveInfo(params, function (error, result) {
            if (!result) {
                console.log(error);
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}

module.exports.updateProduto = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        
        var params = {
            fk2_idPDV: parseInt(request.body.idpdv),
            quantidade_estoque: parseInt(request.body.quantidade),
            id_produto: parseInt(request.body.idproduto),
            nome_produto: request.body.nome,
            valor: parseInt(request.body.valor),
            status: parseInt(request.body.status),
        };


        filialModel.updateProduto(params, function (error, result) {
            if (!result) {
                console.log(error);
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}

module.exports.realizarCompra = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        
        var params = {
            numero_nota: parseInt(request.body.numero_nota),
            data_compra: request.body.data_compra,
            id_vendedor_responsavel: parseInt(request.body.id_vendedor_responsavel),
            fk_id_pdv_occorrente: parseInt(request.body.fk_id_pdv_occorrente),
            valor_compra: parseInt(request.body.quantidade_total_compra),
            forma_pagamento: request.body.forma_pagamento,
            nome_comprador: request.body.nome_comprador,
            valor_pago: parseInt(request.body.valor_pago),

        };

        filialModel.realizarCompra(params, function (error, result) {
            if (!result) {
                console.log(error);
                response.send({ success: true, response: false });
                filialModel._connection.end();
            }
            else {
                response.send({ success: true, response: result });
                filialModel._connection.end();
            }
        });
    }
}