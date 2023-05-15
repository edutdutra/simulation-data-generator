import {Button, Form, Input} from "antd";
import {layout, tailLayout} from "../utils/formLayout";

export function Simulator() {
    const [form] = Form.useForm();

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