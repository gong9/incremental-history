import { useState } from "react";
import jsonPatch from "fast-json-patch";
import { Button, Input } from 'antd'

import "./App.css";
import historyCcontroller from "./historyCcontroller";

const App = () => {
  const [json, setJson] = useState(historyCcontroller.historyData);

  const generateRandomString = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const add = () => {
    historyCcontroller.add(`/${generateRandomString(5)}`, "新加的");
    setJson({
      ...jsonPatch.applyPatch(historyCcontroller.historyData, historyCcontroller.patch as any)
        .newDocument,
    });
  };
  const undo = () => {
    setJson({
      ...jsonPatch.applyPatch(historyCcontroller.historyData, historyCcontroller.undo() as any)
        .newDocument,
    });
  };

  return (
    <div className="main">
      <h3 className="m-3">增量JSON历史记录测试</h3>

      <Input.TextArea disabled value={JSON.stringify(json, null, 2)} />

      <div className="btns flex mt-5 justify-start">
        <Button onClick={add} className='mr-2'>添加</Button>
        <Button className='mr-2'>替换</Button>
        <Button className='mr-2'>删除</Button>
        <Button className='mr-2' onClick={undo}>撤销</Button>
      </div>
    </div>
  );
};

export default App;
