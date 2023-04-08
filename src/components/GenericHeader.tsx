import {Layout, Menu} from "antd";

const { Header } = Layout;

export function GenericHeader() {
    return (
        <Header style={{ position: 'sticky', zIndex: 1, width: '100%' }}>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={new Array(3).fill(null).map((_, index) => ({
                    key: String(index + 1),
                    label: `nav ${index + 1}`,
                }))}
            />
        </Header>
    )
}