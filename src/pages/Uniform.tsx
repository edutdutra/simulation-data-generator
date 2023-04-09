import {useState} from "react";
import {Button, Form, Input} from "antd";
import {generateFile} from "../utils/fileGenerator";

export function Uniform() {
    const [numberOfValues, setNumberOfValues] = useState(10);
    const [form] = Form.useForm();


    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

    const tailLayout = {
        wrapperCol: {offset: 16},
    };

    function onReset() {
        form.resetFields();
    }

    function onFinish(values: any) {
        const {a, b} = values;

        const fileData = [JSON.stringify(getUniformData(parseInt(a), parseInt(b)), null, 2)];


        for (let i = 0; i < numberOfValues - 1; i++) {
            fileData.push('\n' + JSON.stringify(getUniformData(parseInt(a), parseInt(b)), null, 2))
        }

        generateFile(fileData, 'uniform-data.txt');
    }

    function getUniformData(a: number, b: number) {
        return a + (b - a) * Math.random();
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

                <Form.Item {...tailLayout} style={{}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset} style={{marginLeft: 20}}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}