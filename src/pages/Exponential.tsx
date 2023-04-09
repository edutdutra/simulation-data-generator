import {Button, Form, Input} from "antd";
import {useState} from "react";
import {generateFile} from "../utils/fileGenerator";

export function Exponential() {
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
        const {average} = values;

        const fileData = [JSON.stringify(getExponentialData(parseInt(average)), null, 2)];


        for (let i = 0; i < numberOfValues - 1; i++) {
            fileData.push('\n' + JSON.stringify(getExponentialData(parseInt(average)), null, 2))
        }

        generateFile(fileData, 'exponential-data.txt');
    }

    function getExponentialData(average: number) {
        return -average * Math.log(Math.random());
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
                <Form.Item name="average" label="Valor Médio" rules={[{required: true}]}>
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