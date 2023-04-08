import {Layout, Menu} from 'antd';
import {
  CalculatorOutlined
} from '@ant-design/icons';

const {Header, Sider} = Layout;

export function SideMenu() {
    return (
        <Sider>
            <div className="logo"/>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <CalculatorOutlined />,
                        label: 'nav 1',
                    }
                ]}
            />
        </Sider>
    )
}