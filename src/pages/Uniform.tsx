import {useState} from "react";
import {Button, Form, Input, InputNumber} from "antd";
import {generateFile} from "../utils/fileGenerator";

export function Uniform() {
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
        const {a, b} = values;

        const fileData = [JSON.stringify(getUniformData(parseInt(a), parseInt(b)), null, 2)];


        for (let i = 0; i < numberOfValues - 1; i++) {
            fileData.push('\n' + JSON.stringify(getUniformData(parseInt(a), parseInt(b)), null, 2))
        }

        generateFile(fileData, 'uniform-data.dft');
    }

    function getUniformData(a: number, b: number) {
        return a + (b - a) * Math.random();
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