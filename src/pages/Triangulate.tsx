import {Button, Form, Input} from "antd";

export function Triangulate() {
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

        const u = Math.random();
        const conditionValue = (c - a) / (b - a);

        let result = 0;

        if (u < conditionValue) {
            const sqrtValue = u * (c - a) * (b - a);

            result = a + Math.sqrt(sqrtValue);
        } else {
            const sqrtValue = (1 - u) * (b - c) * (b - a);

            result = a + Math.sqrt(sqrtValue);
        }

        console.log(result);
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