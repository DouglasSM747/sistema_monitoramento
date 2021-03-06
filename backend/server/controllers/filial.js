module.exports.getDonosPDV = function (application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        
        var fk_gerentePDV = request.query.idpdv;
        
        filialModel.getDonosPDV(fk_gerentePDV, function (error, result) {
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

module.exports.getFuncionario = function (application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var idpdv = request.query.idpdv;

        filialModel.getFuncionario(idpdv, function (error, result) {
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

module.exports.getInfoEmpresaFuncionario = function (application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var id_vendedor = request.query.id_vendedor;
    
        filialModel.getInfoEmpresaFuncionario(id_vendedor, function (error, result) {
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
        
        var idcompra = parseInt(request.query.idcompra);
        var idpdv = parseInt(request.query.idpdv);
        filialModel.getProdutos(idpdv,idcompra, function (error, result) {
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
            CESP: parseInt(request.body.CESP),
            telefone_fixo: request.body.telefone_fixo,
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

module.exports.salvarInfoEmpresaVendedor = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);

        var params = {
            id_vendedor: parseInt(request.body.id_vendedor),
            salario_mensal: request.body.salario_mensal,
            agencia_pagamento: request.body.agencia_pagamento,
            conta_pagamento: request.body.conta_pagamento,
            Cargo: request.body.Cargo,
            status: parseInt(request.body.status),
            dia_pagamento: request.body.dia_pagamento,
            data_inicio_empresa: request.body.data_inicio_empresa,
        };

        console.log(params);

        filialModel.salvarInfoEmpresaVendedor(params, function (error, result) {
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

module.exports.CadastraInfoVendedorEmpresa = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);

        var params = {
            id_vendedor: parseInt(request.body.id_vendedor),
            salario_mensal: request.body.salario_mensal,
            agencia_pagamento: request.body.agencia_pagamento,
            conta_pagamento: request.body.conta_pagamento,
            Cargo: request.body.Cargo,
            status: parseInt(request.body.status),
            dia_pagamento: request.body.dia_pagamento,
            data_inicio_empresa: request.body.data_inicio_empresa,
        };


        filialModel.CadastraInfoVendedorEmpresa(params, function (error, result) {
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

module.exports.SalvarHistorico = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);

        var params = {
            id_compra: parseInt(request.body.id_compra),
            id_pdv: parseInt(request.body.id_pdv),
            id_produto: parseInt(request.body.id_produto),
            nome_produto: request.body.nome_produto,
            quantidade_comprada: request.body.quantidade_comprada,
            valor: parseInt(request.body.valor),
        };


        filialModel.SalvarHistorico(params, function (error, result) {
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

module.exports.addProdutoCompra = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);

        var params = {
            id_compra: parseInt(request.body.numero_nota),
            id_produto: parseInt(request.body.id_produto),
            quantidade: parseInt(request.body.quantidade_comprada),
        };
        
        var fk2_idPDV = parseInt(request.body.idpdv);

        filialModel.addProdutoCompra(params,fk2_idPDV, function (error, result) {
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

module.exports.cadastrarFuncionario = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);


        var params = {
            fk_id_PDV_pertencente: parseInt(request.body.fk_id_PDV_pertencente),
            tipo: 'funcionario',
            email: request.body.email,
            senha: parseInt(request.body.senha)
        };



        filialModel.cadastrarFuncionario(params, function (error, result) {
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

module.exports.cadastrarDono = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);


        var params = {
            idPDV: parseInt(request.body.idPDV),
            fk_gerentePDV: parseInt(request.body.fk_gerentePDV),
            email: request.body.email,
            senha: parseInt(request.body.senha),
            tipo: 'dono'
        };

        filialModel.cadastrarDono(params, function (error, result) {
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

module.exports.deletarDono = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);


        var params = {
            idPDV: parseInt(request.body.idPDV),
            fk_gerentePDV: parseInt(request.body.fk_gerentePDV),
        };

        filialModel.deletarDono(params, function (error, result) {
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

module.exports.CadastraInfoVendedorPessoal = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);

        var params = {
            nome: request.body.nome,
            sexo: request.body.sexo,
            data_nascimento: request.body.data_nascimento,
            fk_id_vendedor: parseInt(request.body.fk_id_vendedor)
        };


        filialModel.CadastraInfoVendedorPessoal(params, function (error, result) {
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


module.exports.salvarInfoPessoalVendedor = function (application, request, response) {
    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);

        var params = {
            nome: request.body.nome,
            sexo: request.body.sexo,
            data_nascimento: request.body.data_nascimento,
        };
        var fk_id_vendedor  = parseInt(request.body.fk_id_vendedor);

        filialModel.salvarInfoPessoalVendedor(params,fk_id_vendedor, function (error, result) {
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


module.exports.getFuncionarioInfoPessoal = function (application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var filialModel = new application.server.models.filialDAO(connection);
        var fk_id_vendedor = request.query.fk_id_vendedor;

        filialModel.getFuncionarioInfoPessoal(fk_id_vendedor, function (error, result) {
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