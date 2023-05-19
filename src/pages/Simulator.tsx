import {useState} from "react";
import {Button, Form, Input, Radio} from "antd";
import {layout, tailLayout} from "../utils/formLayout";
import {Entity} from "../dtos/Entity";
import {Box} from "@mui/material";
import {getExponentialData, getNormalData, getTriangulateData, getUniformData} from "../utils/distributions";


export function Simulator() {
    const [form] = Form.useForm();

    const [distribution, setDistribution] = useState('');

    const [a, setA] = useState<number>(0);
    const [b, setB] = useState<number>(0);
    const [c, setC] = useState<number>(0);
    const [average, setAverage] = useState<number>(0);
    const [variance, setVariance] = useState<number>(0);


    const [populacao, setPopulacao] = useState();
    // const [populacao_atual, setPopulacao_atual] = useState();
    let populacao_atual: number
    const [capacidade_sistema, setCapacidade_sistema] = useState(0);
    const [tempo_simulacao, setTempo_simulacao] = useState(0);
    const [limite_fila, setLimite_fila] = useState(0);

    let tempo_decorrido: number = 0;
    let tempo_proxima_chegada: number = 0

    const [tempo_chegada, setTempo_chegada] = useState(0);
    const [tempo_atendimento, setTempo_atendimento] = useState(0);


    let fila_espera: Entity[] = []
    let entidades: Entity[] = []

    // arrays com tamanhos setados
    let atendimento: number[] = [];
    let atendimento_entidades: Entity[] = [];
    let numero_entidades_fila_cada_tempo: number[] = [];
    let taxa_media_ocupacao_servidor: number[] = [];
    let numero_entidades_cada_passo: number[] = [];

    //Matriz - arrays com tamanhos setados
    let taxa_ocupacao_servidor_cada_tempo: number[] = [];


    let numero_medio_entidades_fila: number
    let tempo_medio_entidade_fila: number
    let tempo_medio_sistema: number
    let numero_maximo_entidades_simultaneas_sistema: number

    // public Simulacao(
    //         int populacao,
    //         int capacidade_sistema,
    //         int tempo_simulacao,
    //         int limite_fila){

    //         this.populacao = populacao;
    //         this.populacao_atual = populacao;
    //         this.capacidade_sistema = capacidade_sistema;
    //         this.tempo_simulacao = tempo_simulacao;
    //         this.limite_fila = limite_fila;

    //         calcula_tempo_atendimento();

    //         for (int i=0; i<capacidade_sistema; i++){
    //             atendimento_entidades[i] = null;
    //         }
    //     }

    function run() {
        while (tempo_decorrido < tempo_simulacao && populacao_atual > 0) {
            passo();
        }

        calculos();
    }

    function passo() {
        if (limite_fila == 0) {
            if (tempo_proxima_chegada <= tempo_decorrido) {
                adiciona_na_fila();
                calcula_tempo_chegada();
            }
        } else {
            if (tempo_proxima_chegada <= tempo_decorrido &&
                fila_espera.length < limite_fila) {
                adiciona_na_fila();
                calcula_tempo_chegada();
            }
        }

        atende();

        passo_calculos();

        decorre_tempo();
    }

    // ToDo - tempo_chegada ????? aonde start
    function calcula_tempo_chegada() {
        if (tempo_chegada > 0) {
            tempo_proxima_chegada += tempo_chegada;
        } else {
            let valor;
            switch (tempo_chegada) {
                case -1:
                    // valor = Distribuicoes.exponencial(valor_medio_chegada);
                    valor = getExponentialData(average);
                    tempo_proxima_chegada += valor > 0 ? valor : 1;
                    break;
                case -2:
                    // valor = Distribuicoes.normal(media_chegada, variancia_chegada);
                    valor = getNormalData(average, variance);
                    tempo_proxima_chegada += valor > 0 ? valor : 1;
                    break;
                case -3:
                    // valor = Distribuicoes.triangular(valor_min_chegada, valor_max_chegada, moda_chegada);
                    valor = getTriangulateData(a, b, c);
                    tempo_proxima_chegada += valor > 0 ? valor : 1;
                    break;
                case -4:
                    // valor = Distribuicoes.uniforme(a_chegada, b_chegada);
                    valor = getUniformData(a, b);
                    tempo_proxima_chegada += valor > 0 ? valor : 1;
                    break;
            }
        }
    }

    // ToDo - tempo_atendimento ????? aonde start
    function calcula_tempo_atendimento() {
        if (tempo_atendimento > 0) {
            return tempo_atendimento;
        } else {
            let valor;
            switch (tempo_atendimento) {
                case -1:
                    valor = getExponentialData(average);
                    return valor > 0 ? valor : 1;
                case -2:
                    valor = getNormalData(average, variance);
                    return valor > 0 ? valor : 1;
                case -3:
                    valor = getTriangulateData(a, b, c);
                    return valor > 0 ? valor : 1;
                case -4:
                    valor = getUniformData(a, b);
                    return valor > 0 ? valor : 1;
            }
        }
        return 1; //Não deveria chegar aqui
    }

    function passo_calculos() {
        numero_entidades_fila_cada_tempo[tempo_decorrido] = fila_espera.length;

        for (let i = 0; i < taxa_ocupacao_servidor_cada_tempo.length; i++) {
            if (atendimento[i] > tempo_decorrido) {
                taxa_ocupacao_servidor_cada_tempo[i][tempo_decorrido] = 1;
            } else {
                taxa_ocupacao_servidor_cada_tempo[i][tempo_decorrido] = 0;
            }
        }

        for (let e of entidades) {
            if (!e.terminado) {
                numero_entidades_cada_passo[tempo_decorrido]++;
            }
        }
    }


    function atende() {
        for (let i = 0; i < atendimento.length; i++) {
            if (atendimento_entidades[i] != null &&
                atendimento[i] <= tempo_decorrido) {
                atendimento_entidades[i].terminado = true;
                atendimento_entidades[i] = {} as Entity;
                populacao_atual--;
            }
        }

        for (let i = 0; i < atendimento.length; i++) {
            if (atendimento_entidades[i] == null) {
                if (fila_espera.length > 0) {
                    atendimento[i] += calcula_tempo_atendimento();
                    atendimento_entidades[i] = fila_espera[0];
                    tira_da_fila();
                }
            }
        }
    }

    function tira_da_fila() {
        fila_espera.shift();
    }

    function adiciona_na_fila() {
        const ent = {tempo_fila: 0, tempo_sistema: 0, terminado: false}

        fila_espera.push(ent);
        entidades.push(ent);
    }

    function decorre_tempo() {
        tempo_decorrido++;

        for (let e of fila_espera) {
            e.tempo_fila++;
        }

        for (let e of entidades) {
            if (!e.terminado) {
                e.tempo_sistema++;
            }
        }
    }

    function calcula_numero_medio_entidades_fila() {
        for (let i of numero_entidades_fila_cada_tempo) {
            numero_medio_entidades_fila += i;
        }

        numero_medio_entidades_fila = numero_medio_entidades_fila / tempo_decorrido;
    }

    function calcula_taxa_media_ocupacao_servidor() {
        for (let i = 0; i < taxa_media_ocupacao_servidor.length; i++) {

            for (let j of taxa_ocupacao_servidor_cada_tempo[i]) {
                taxa_media_ocupacao_servidor[i] += j;
            }
        }

        for (let i = 0; i < taxa_media_ocupacao_servidor.length; i++) {
            taxa_media_ocupacao_servidor[i] = taxa_media_ocupacao_servidor[i] / tempo_decorrido;
        }
    }

    function calcula_tempo_medio_entidade_fila() {
        for (let e of entidades) {
            tempo_medio_entidade_fila += e.tempo_fila;
        }
        tempo_medio_entidade_fila = tempo_medio_entidade_fila / entidades.length;
    }

    function calcula_tempo_medio_sistema() {
        for (let e of entidades) {
            tempo_medio_sistema += e.tempo_sistema;
        }
        tempo_medio_sistema = tempo_medio_sistema / entidades.length;
    }

    function calcula_numero_maximo_entidades_simultaneas_sistema() {
        let aux = 0;
        for (let i of numero_entidades_cada_passo) {
            if (i > aux)
                aux = i;
        }
        numero_maximo_entidades_simultaneas_sistema = aux;

    }

    function calculos() {
        calcula_numero_medio_entidades_fila();
        calcula_taxa_media_ocupacao_servidor();
        calcula_tempo_medio_entidade_fila();
        calcula_tempo_medio_sistema();
        calcula_numero_maximo_entidades_simultaneas_sistema();


        console.log('Número Médio de Entidades nas Filas', numero_medio_entidades_fila)
        console.log('Tempo Médio de uma Entidade na Fila', tempo_medio_entidade_fila)
        console.log('Tempo Médio no Sistema', tempo_medio_sistema)

        // console.log('Contador de Entidades na Entrada', contador_entidades_entrada)
        // console.log('Contador de Entidades na Saída', contador_entidades_saida)

        console.log('Número máximo de entidades simultâneas no sistema', numero_maximo_entidades_simultaneas_sistema)
    }

    function onValuesChange(values: any) {
        const {
            distribution,
            a,
            b,
            c,
            average,
            variance,
            population,
            simulationTime,
            capacity,
            limit,
            arrivalsTime,
            serviceTime
        } = values;

        setLimite_fila(limit)
        setTempo_simulacao(simulationTime)
        setCapacidade_sistema(capacity)
        setPopulacao(population)

        populacao_atual = population

        setTempo_chegada(arrivalsTime)
        setTempo_atendimento(serviceTime)

        setDistribution(distribution);

        setA(a);
        setB(b);
        setC(c);
        setAverage(average);
        setVariance(variance);

    }

    function onFinish() {
        for (let i = 0; i < capacidade_sistema; i++) {
            atendimento_entidades[i] = {} as Entity;
        }

        for (let i = 0; i < capacidade_sistema; i++) {
            taxa_ocupacao_servidor_cada_tempo[i] = [];
        }



        run();
    }

    function onReset() {
        form.resetFields();
    }

    return (
        <div>
            <Form
                {...layout}
                name="control-hooks"
                style={{maxWidth: 1000}}
                form={form}
                onValuesChange={onValuesChange}
                onFinish={onFinish}
            >
                <Form.Item name="population" label="População de usuários" rules={[{required: true}]}>
                    <Input type="number"/>
                </Form.Item>

                <Form.Item name="simulationTime" label="Tempo de simulação" rules={[{required: true}]}>
                    <Input type="number"/>
                </Form.Item>

                <Form.Item name="capacity" label="Capacidade do sistema" rules={[{required: true}]}>
                    <Input type="number"/>
                </Form.Item>

                <Form.Item name="limit" label="Limite da fila" rules={[{required: true}]}>
                    <Input type="number"/>
                </Form.Item>

                <Form.Item label="Distribuição" name="distribution">
                    <Radio.Group value={distribution}>
                        <Radio.Button value="d0">Determinístico</Radio.Button>
                        <Radio.Button value="d1">Uniforme</Radio.Button>
                        <Radio.Button value="d2">Triangular</Radio.Button>
                        <Radio.Button value="d3">Exponencial</Radio.Button>
                        <Radio.Button value="d4">Normal</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Box hidden={distribution !== 'd0'}>
                    <Form.Item name="arrivalsTime" label="Tempo entre chegadas">
                        <Input type="number"/>
                    </Form.Item>

                    <Form.Item name="serviceTime" label="Tempo de serviço">
                        <Input type="number"/>
                    </Form.Item>
                </Box>
                {/* Uniforme */}
                <Box hidden={distribution !== 'd1'}>
                    <Form.Item name="a" label="Valor Mínimo">
                        <Input type="number"/>
                    </Form.Item>

                    <Form.Item name="b" label="Valor Máximo">
                        <Input type="number"/>
                    </Form.Item>
                </Box>


                {/* Triangular */}
                <Box hidden={distribution !== 'd2'}>
                    <Form.Item name="a" label="Valor Mínimo">
                        <Input type="number"/>
                    </Form.Item>

                    <Form.Item name="b" label="Valor Máximo">
                        <Input type="number"/>
                    </Form.Item>

                    <Form.Item name="c" label="Moda">
                        <Input type="number"/>
                    </Form.Item>
                </Box>


                {/* Exponencial */}
                <Box hidden={distribution !== 'd3'}>
                    <Form.Item name="average" label="Valor Médio">
                        <Input type="number"/>
                    </Form.Item>
                </Box>


                {/* Normal */}
                <Box hidden={distribution !== 'd4'}>
                    <Form.Item name="average" label="Média">
                        <Input type="number"/>
                    </Form.Item>

                    <Form.Item name="variance" label="Variância">
                        <Input type="number"/>
                    </Form.Item>
                </Box>


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Simular
                    </Button>
                    <Button htmlType="button" onClick={onReset} style={{marginLeft: 20}}>
                        Limpar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}