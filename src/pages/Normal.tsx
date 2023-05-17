import {Button, Form, Input, InputNumber} from "antd";
import {generateFile} from "../utils/fileGenerator";
import {useState} from "react";
import {getNormalData} from "../utils/distributions";

export function Normal() {
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
        const {average, variance} = values;

        const fileData = [JSON.stringify(getNormalData(parseInt(average), parseFloat(variance)), null, 2)];


        for (let i = 0; i < numberOfValues - 1; i++) {
            fileData.push('\n' + JSON.stringify(getNormalData(parseInt(average), parseFloat(variance)), null, 2))
        }

        generateFile(fileData, 'normal-data.dft');
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
                <Form.Item name="average" label="Média" rules={[{required: true}]}>
                    <Input type="number"/>
                </Form.Item>

                <Form.Item name="variance" label="Variância" rules={[{required: true}]}>
                    <Input type="number"/>
                </Form.Item>

                <Form.Item name="amount" label="Quantidade" initialValue={500}>
                    <InputNumber min={1} value={numberOfValues} onChange={handleChangeNumberOfValues} />
                </Form.Item>

                <Form.Item {...tailLayout}>
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