import {Button, Form, Input} from "antd";
import {layout, tailLayout} from "../utils/formLayout";
import {Entity} from "../dtos/Entity";

export function Simulator() {
    const [form] = Form.useForm();


    // ToDo - Recriar a função => calcula_tempo_atendimento
    // ToDo - Criar lógica para receber os parametros das distribuições


    function exec(values: any) {
        const {population, simulationTime, capacity, limit, arrivalsTime, serviceTime} = values;

        const currentPopulation = population;
        const elapsedTime = 0;
        // calcula_tempo_atendimento
        const queue = [];
        const entities = [];

        const treatment = [];
        const entitiesTreatment = []; //Entity array

        treatment.length = capacity
        entitiesTreatment.length = capacity

        // for (int i=0; i<capacidade_sistema; i++){
        //     atendimento_entidades[i] = null;
        // }

        // while (tempo_decorrido < tempo_simulacao && populacao_atual>0) {
        //     passo();
        // }
        //
        // calculos();
    }

    function onReset() {
        form.resetFields();
    }

    return (
        <div>
            <Form
                {...layout}
                name="control-hooks"
                style={{maxWidth: 800}}
                form={form}
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

                <Form.Item name="arrivalsTime" label="Tempo entre chegadas" rules={[{required: true}]}>
                    <Input type="number"/>
                </Form.Item>

                <Form.Item name="serviceTime" label="Tempo de serviço" rules={[{required: true}]}>
                    <Input type="number"/>
                </Form.Item>


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