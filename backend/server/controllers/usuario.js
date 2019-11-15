const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('secret-key');

const saltRounds = 10;

module.exports.authUsuario = function(application, request, response) {

    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var usuarioModel = new application.server.models.usuarioDAO(connection);
        
        var { email, password } = request.body;

        if(email && password) {
            usuarioModel.authUsuario(request.body, function(error, result) {
                if (!result || result.length < 1) {
                    response.send({success: true, response: false});
                } 
                else {
                    var privateKey = secretKey.create('1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X');
                    
                    bcrypt.compare(password, result[0].senha_hash, function(err, res) {
                        if (res) {
                            var token = jwt.sign({password: result[0].senha_hash}, privateKey.secret, { algorithm: HS256});
                            response.send({success: true, response: true, token: token, userId: result[0].id});
                            usuarioModel._connection.end();
                        }
                        else {
                            response.send({success: true, response: false});
                            usuarioModel._connection.end();
                        }
                    });
                }
            });
        }
        else {
            response.send({success: true, response: false});
        }
    }
}

module.exports.getUsuarios = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var usuarioModel = new application.server.models.usuarioDAO(connection);

        usuarioModel.getUsuarios(function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                usuarioModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                usuarioModel._connection.end();
            }
        });
    }
}

module.exports.createUsuario = function(application, request, response) {

    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var usuarioModel = new application.server.models.usuarioDAO(connection);

        var params = {
            nome_usuario: request.body.nomeUsuario,
            conta_id: parseInt(request.body.contaId),
            senha_hash: request.body.senha,
            usuario_role_id: 1,
            utc_data_criacao: new Date(),
            ativo: 1,
            foi_deletado: 0
        }

        if (params.nome_usuario && params.conta_id && params.senha_hash) {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(params.senha_hash, salt, function(err, hash) {
                    params.senha_hash = hash;
                    
                    usuarioModel.createUsuario(params, function(error, result) {
                        if (!result) {
                            response.send({success: true, response: false});
                            usuarioModel._connection.end();
                        }
                        else {
                            response.send({success: true, response: true, usuarioId: result ? result.insertId : 0});
                            usuarioModel._connection.end();
                        }
                    });
                });
            });
        }
        else {
            response.send({success: true, response: false});
        }
    }
}

module.exports.updateUsuario = function(application, request, response) {

    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var usuarioModel = new application.server.models.usuarioDAO(connection);

        var params = {
            usuarioId: parseInt(request.body.usuarioId),
            update_fields: {conta_id: parseInt(request.body.contaId), nome_usuario: '\"' + request.body.nomeUsuario + '\"'}
        }

        if (params.usuarioId && params.update_fields) {
            usuarioModel.updateUsuario(params, function(error, result) {
                if (!result) {
                    response.send({success: true, response: false});
                    usuarioModel._connection.end();
                }
                else {
                    response.send({success: true, response: true});
                    usuarioModel._connection.end();
                }
            });
        }
        else {
            response.send({success: true, response: false});
        }
    }
}

module.exports.deleteUsuario = function(application, request, response) {

    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var usuarioModel = new application.server.models.usuarioDAO(connection);

        var usuarioId = request.body.usuarioId;

        if (usuarioId) {
            usuarioModel.deleteUsuario(usuarioId, function(error, result) {
                if (!result) {
                    response.send({success: true, response: false});
                    usuarioModel._connection.end();
                } 
                else {
                    response.send({success: true, response: true});
                    usuarioModel._connection.end();
                }
            });
        }
        else {
            response.send({success: true, response: false});
        }
    }
}

module.exports.updateSenha = function(application, request, response) {

    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var usuarioModel = new application.server.models.usuarioDAO(connection);

        var params = {
			usuarioId: request.body.usuarioId, 
            senha: request.body.senha,
            senhaAntiga: request.body.senhaAntiga
		}
        if (params.usuarioId && params.senha && params.senhaAntiga) {
			usuarioModel.getUser(params.usuarioId, function(error, result) {
                if (!result || result.length < 1) {
                    response.send({success: true, response: false});
                } 
                else {
                    bcrypt.compare(params.senhaAntiga, result[0].senha_hash, function(err, res) {
						if (res) {
							bcrypt.genSalt(saltRounds, function(err, salt) {
								bcrypt.hash(params.senha, salt, function(err, hash) {
									params.senha = hash;
									
									usuarioModel.updateSenha(params, function(error, result) {
										if (!result) {
											response.send({success: true, response: false});
											usuarioModel._connection.end();
										}
										else {
											response.send({success: true, response: true});
											usuarioModel._connection.end();
										}
									});
								});
							});
						}
						else {
							response.send({success: true, response: false});
							usuarioModel._connection.end();
						}
					});
                }
            });
        }
        else {
            response.send({success: true, response: false});
        }
    }
}

module.exports.createRole = function(application, request, response) {

    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var usuarioModel = new application.server.models.usuarioDAO(connection);

        var descricao = request.body.descricao;

        if (!descricao) {
            usuarioModel.createRole(descricao, function(error, result) {
                if (!result) {
                    response.send({success: true, response: false});
                    usuarioModel._connection.end();
                } 
                else {
                    response.send({success: true, response: result});
                    usuarioModel._connection.end();
                }
            });
        }
        else {
            response.send({success: true, response: false});
        }
    }
}

module.exports.deleteRole = function(application, request, response) {

    if (request.method == 'POST') {
        var connection = application.config.dbConnection();
        var usuarioModel = new application.server.models.usuarioDAO(connection);

        var roleId = request.body.roleId;

        if (!roleId) {
            usuarioModel.deleteRole(roleId, function(error, result) {
                if (!result) {
                    response.send({success: true, response: false});
                    usuarioModel._connection.end();
                } 
                else {
                    response.send({success: true, response: result});
                    usuarioModel._connection.end();
                }
            });
        }
        else {
            response.send({success: true, response: false});
        }
    }
}

module.exports.getRoles = function(application, request, response) {

    if (request.method == 'GET') {
        var connection = application.config.dbConnection();
        var usuarioModel = new application.server.models.usuarioDAO(connection);

        usuarioModel.getRoles(function(error, result) {
            if (!result) {
                response.send({success: true, response: false});
                usuarioModel._connection.end();
            } 
            else {
                response.send({success: true, response: result});
                usuarioModel._connection.end();
            }
        });
    }
}

