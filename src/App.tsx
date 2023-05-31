import type { TabsProps } from 'antd'
import { Tabs } from 'antd'

import BaseExample from './components/Base'
import Drag from './components/Dnd'
import './App.css'

const items: TabsProps['items'] = [
  {
    key: 'base',
    label: 'base example',
    children: <BaseExample />,
  },
  {
    key: 'dnd',
    label: 'dnd example',
    children: <Drag/>,
  },
  {
    key: 'other',
    label: 'other',
    children: '开发中',
  },

]
function App() {
  return (
    <Tabs className="main" items={items} />
  )
}

export default App
