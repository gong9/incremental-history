import type { Operation } from 'fast-json-patch'
import jsonpatch from 'fast-json-patch'
import { message } from 'antd'

interface HistoryDataType {
  [k: string]: unknown
}

class HistoryCcontroller {
  public baseData: HistoryDataType
  public patch: Operation[]
  private historyStackLength: number
  private historyIndex: number

  constructor(historyStackLength = 10) {
    this.baseData = {}
    this.patch = []
    this.historyStackLength = historyStackLength
    this.historyIndex = 0
  }

  public setBaseData(data: HistoryDataType) {
    this.baseData = jsonpatch.deepClone(data)
  }

  public get lastData() {
    return jsonpatch.applyPatch({ ...this.baseData }, this.patch).newDocument
  }

  private get isTopStack() {
    return this.historyIndex === this.patch.length
  }

  private updateBaseData() {
    this.historyIndex
      = this.patch.length > this.historyStackLength
        ? this.historyStackLength
        : this.patch.length

    if (this.patch.length > this.historyStackLength) {
      const currentPatch = this.patch.shift() as Operation
      this.baseData = jsonpatch.applyOperation(
        { ...this.baseData },
        currentPatch,
      ).newDocument
    }
  }

  private changeHistoryStack() {
    if (!this.isTopStack)
      this.patch = this.patch.slice(0, this.historyIndex)
  }

  public add(path: string, value: unknown) {
    this.changeHistoryStack()

    this.patch.push({
      op: 'add',
      path,
      value,
    })

    this.updateBaseData()
  }

  public replace(path: string, value: unknown) {
    this.changeHistoryStack()

    this.patch.push({
      op: 'replace',
      path,
      value,
    })

    this.updateBaseData()
  }

  public delete(path: string) {
    this.changeHistoryStack()

    this.patch.push({
      op: 'remove',
      path,
    })

    this.updateBaseData()
  }

  public undo() {
    if (this.historyIndex > 0) {
      const currentPatch = this.patch.slice(0, this.historyIndex - 1)
      this.historyIndex -= 1
      return jsonpatch.applyPatch({ ...this.baseData }, currentPatch)
        .newDocument
    }
    else {
      message.warning(`只能回退${this.historyStackLength}步`)
      return { ...this.baseData }
    }
  }
}

export default new HistoryCcontroller(10)
