import axios from "axios";
export default {
    data() {
        return {
            atual_pdv: 0,
            nomepdv: "",
            nota: 0,
            localizacao: "",
            nome_dono_PDV: "",
            data_fundacao: "",
            preco_medio: 0,
            CESP: "",
            telefone_fixo: "",
            user: {}
        };
    },
    mounted() {
        this.getInfoEmpresa(window.localStorage.getItem("ID_PDV"));
    },
    methods: {
        getInfoEmpresa(pdv) {
            var self = this;
            //puxa todos os itens do estoque do PDV que tem como status == 1
            axios
                .get("http://localhost:5000/pdv/info?idpdv=" + pdv) // get na API para mostrar todas os pdv
                .then(function (response) {
                    (self.atual_pdv = response.data.response[0].fk_id_PDV),
                        (self.nomepdv = response.data.response[0].nomepdv),
                        (self.nota = response.data.response[0].nota),
                        (self.localizacao = response.data.response[0].localizacao),
                        (self.nome_dono_PDV = response.data.response[0].nome_dono_PDV),
                        (self.data_fundacao = response.data.response[0].data_fundacao),
                        (self.preco_medio = response.data.response[0].preco_medio),
                        (self.CESP = response.data.response[0].CESP),
                        (self.telefone_fixo = response.data.response[0].telefone_fixo)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        SalvarInfo(pdv) {
            axios
                .post("http://localhost:5000/pdv/saveinfo", {
                    atual_pdv: pdv,
                    nomepdv: this.nomepdv,
                    nota: this.nota,
                    localizacao: this.localizacao,
                    nome_dono_PDV: this.nome_dono_PDV,
                    data_fundacao: this.data_fundacao,
                    preco_medio: this.preco_medio,
                    CESP: this.CESP,
                    telefone_fixo: this.telefone_fixo,
                })
                .then(function (response) {
                    location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};