import {Button, Form, Input} from "antd";

export function Uniform() {
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

        const result = parseInt(a) + (parseInt(b) - parseInt(a)) * Math.random();
        console.log(result)

        const blob = new Blob([JSON.stringify(result, null, 2), '\n' + JSON.stringify(result, null, 2)], {
            type: "application/json",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "user-info.txt";
        link.href = url;
        link.click();
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