import { useState } from 'react'
import { Button, Input } from 'antd'

import './App.css'
import historyCcontroller from './historyCcontroller'
import { generateRandomString } from './utils'

function App() {
  const [json] = useState(historyCcontroller.baseData)

  const add = () => {
    historyCcontroller.add(`/${generateRandomString(10)}`, '新加的')

    console.log(historyCcontroller.lastData)
  }

  const undo = () => {
    console.log(historyCcontroller.undo())
  }

  return (
    <div className="main">
      <h3 className="m-3">增量JSON历史记录测试 「3M数据」</h3>

      <div>渲染性能不理想,可打开控制台查看</div>

      <Input.TextArea disabled value={JSON.stringify(json, null, 2)} />

      <div className="btns flex mt-5 justify-start">
        <Button onClick={add} className="mr-2">
          添加
        </Button>
        <Button className="mr-2" onClick={undo}>
          撤销
        </Button>
      </div>
    </div>
  )
}

export default App
