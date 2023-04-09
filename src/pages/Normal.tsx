import {Button, Form, Input} from "antd";
import {generateFile} from "../utils/fileGenerator";
import {useState} from "react";

export function Normal() {
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
        const {average, variance} = values;

        const fileData = [JSON.stringify(getNormalData(parseInt(average), parseInt(variance)), null, 2)];


        for (let i = 0; i < numberOfValues - 1; i++) {
            fileData.push('\n' + JSON.stringify(getNormalData(parseInt(average), parseInt(variance)), null, 2))
        }

        generateFile(fileData, 'normal-data.txt');
    }

    function getNormalData(average: number, variance: number) {
        const random = Math.random();
        const z = Math.sqrt(-2 * Math.log(random * Math.sin(2 * Math.PI * random)))

        return average + (variance * z);
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
                <Form.Item name="average" label="Média" rules={[{required: true}]}>
                    <Input type="number"/>
                </Form.Item>

                <Form.Item name="variance" label="Variância" rules={[{required: true}]}>
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