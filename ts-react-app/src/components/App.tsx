import React from 'react'
import {
  useRouteMatch,
  Link,
  Route,
} from 'react-router-dom'
import {
  ConfigProvider,
  Layout,
  Menu,
} from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import './App.css'
import Employee from '@/components/Employee'
import Setting from '@/components/Setting'

const {
  Header,
  Content,
  Footer,
} = Layout

const App = () => {
  const match = useRouteMatch()
  const defaultKey = match.url.replace('/', '') || 'employee'
  return <ConfigProvider locale={zh_CN}>
    <Layout>
      <Header>
        <Menu
          className="menu"
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[defaultKey]}
        >
          <Menu.Item key="employee">
            <Link to="/employee">员工管理</Link>
          </Menu.Item>
          <Menu.Item key="setting">
            <Link to="/setting">系统管理</Link>
          </Menu.Item>
        </Menu>
        <Content className="contentWrap">
          <div className="content">
            <Route path="/" exact component={Employee} />
            <Route path="/employee" component={Employee} />
            <Route path="/setting" component={Setting} />
          </div>
        </Content>
        <Footer className="footer">TypeScript in Action</Footer>
      </Header>
    </Layout>
  </ConfigProvider>
}

export default App