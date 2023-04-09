import {Button, Form, Input} from "antd";
import {generateFile} from "../utils/fileGenerator";
import {useState} from "react";

export function Triangulate() {
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
        const a = parseInt(values.a);
        const b = parseInt(values.b);
        const c = parseInt(values.c);

        const fileData = [JSON.stringify(getExponentialData(a, b, c), null, 2)];


        for (let i = 0; i < numberOfValues - 1; i++) {
            fileData.push('\n' + JSON.stringify(getExponentialData(a, b, c), null, 2))
        }

        generateFile(fileData, 'triangulate-data.txt');
    }

    function getExponentialData(a: number, b: number, c: number,) {
        const u = Math.random();
        const conditionValue = (c - a) / (b - a);

        if (u < conditionValue) {
            const sqrtValue = u * (c - a) * (b - a);

            return a + Math.sqrt(sqrtValue);
        } else {
            const sqrtValue = (1 - u) * (b - c) * (b - a);

            return a + Math.sqrt(sqrtValue);
        }
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