import {Button, Form, Input, InputNumber} from "antd";
import {generateFile} from "../utils/fileGenerator";
import {useState} from "react";

export function Triangulate() {
    const [numberOfValues, setNumberOfValues] = useState(500);
    const [form] = Form.useForm();

    const layout = {
        labelCol: {span: 6},
        wrapperCol: {span: 12},
    };

    const tailLayout = {
        wrapperCol: {offset: 12},
    };

    function onReset() {
        form.resetFields();
        setNumberOfValues(500)
    }

    function onFinish(values: any) {
        const a = parseInt(values.a);
        const b = parseInt(values.b);
        const c = parseInt(values.c);

        const fileData = [JSON.stringify(getExponentialData(a, b, c), null, 2)];


        for (let i = 0; i < numberOfValues - 1; i++) {
            fileData.push('\n' + JSON.stringify(getExponentialData(a, b, c), null, 2))
        }

        generateFile(fileData, 'triangulate-data.dft');
    }

    function getExponentialData(a: number, b: number, c: number,) {
        const u = Math.random();
        const conditionValue = (c - a) / (b - a);

        if (u < conditionValue) {
            const sqrtValue = u * (c - a) * (b - a);

            return a + Math.sqrt(sqrtValue);
        } else {
            const sqrtValue = (1 - u) * (b - c) * (b - a);

            return b - Math.sqrt(sqrtValue);
        }
    }

    function handleChangeNumberOfValues(newValue: any) {
        setNumberOfValues(newValue)
    }

    return (
        <div>
            <Form
                {...layout}
                name="control-hooks"
                style={{maxWidth: 600}}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item name="a" label="Valor Mínimo" rules={[{required: true}]}>
                    <Input type="number"/>
                </Form.Item>

                <Form.Item name="b" label="Valor Máximo" rules={[{required: true}]}>
                    <Input type="number"/>
                </Form.Item>

                <Form.Item name="c" label="Moda" rules={[{required: true}]}>
                    <Input type="number"/>
                </Form.Item>

                <Form.Item name="amount" label="Quantidade" initialValue={500}>
                    <InputNumber min={1} value={numberOfValues} onChange={handleChangeNumberOfValues} />
                </Form.Item>

                <Form.Item {...tailLayout} style={{}}>
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                    <Button htmlType="button" onClick={onReset} style={{marginLeft: 20}}>
                        Limpar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}