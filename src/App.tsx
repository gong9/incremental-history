import { useState } from "react";
import jsonPatch from "fast-json-patch";

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
      <h3>增量json历史记录测试</h3>

      <textarea disabled value={JSON.stringify(json, null, 2)} />

      <div className="btns">
        <button onClick={add}>添加</button>
        <button>替换</button>
        <button>删除</button>
        <button onClick={undo}>撤销</button>
      </div>
    </div>
  );
};

export default App;
