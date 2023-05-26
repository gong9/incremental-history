import { useState } from 'react'
import { Button, Input } from 'antd'

import './App.css'
import historyCcontroller from './historyCcontroller'
import { generateRandomString } from './utils'
import bigBaseData from './data.json'

function App() {
  const [json, setJson] = useState({})

  const add = () => {
    historyCcontroller.add(`/${generateRandomString(10)}`, '新加的')

    setJson(historyCcontroller.lastData)
  }

  const undo = () => {
    setJson(historyCcontroller.undo())
  }

  const toggle = () => {
    setJson(bigBaseData)
  }

  return (
    <div className="main">
      <h3 className="m-3">高性能增量JSON历史记录测试 「base」</h3>

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
