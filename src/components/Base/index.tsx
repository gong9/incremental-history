import { useState } from 'react'
import { Button, Card, Input } from 'antd'

import historyCcontroller from '../../historyController'
import { generateRandomString } from '../../utils'
import './index.css'

function BaseExample() {
  const [json, setJson] = useState({})

  const add = () => {
    historyCcontroller.add(`/${generateRandomString(15)}`, '新加的')

    setJson(historyCcontroller.lastData)
  }

  const undo = () => {
    setJson(historyCcontroller.undo())
  }

  return (
    <Card className="base">
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
    </Card>
  )
}

export default BaseExample
