import jsonpatch, { Operation } from "fast-json-patch";

type HistoryDataType = {
  [k: string]: any;
};

class HistoryCcontroller {
  public baseData: HistoryDataType;
  public patch: Operation[];
  private historyStackLength: number;
  private historyIndex: number;

  constructor(historyStackLength = 10) {
    this.baseData = {
      name: "John",
      age: 30,
      city: "New York",
    };
    this.patch = [];
    this.historyStackLength = historyStackLength;
    this.historyIndex = 0;
  }

  public get lastData() {
    return jsonpatch.applyPatch({ ...this.baseData }, this.patch).newDocument;
  }

  private updateBaseData() {
    this.historyIndex =
      this.patch.length > this.historyStackLength
        ? this.historyStackLength
        : this.patch.length;

    if (this.patch.length > this.historyStackLength) {
      const currentPatch = this.patch.shift() as Operation;
      this.baseData = jsonpatch.applyOperation(
        { ...this.baseData },
        currentPatch
      ).newDocument;
    }
  }

  public add(path: string, value: unknown) {
    this.patch.push({
      op: "add",
      path,
      value,
    });

    this.updateBaseData();
  }

  public replace(path: string, value: unknown) {
    this.patch.push({
      op: "replace",
      path,
      value,
    });

    this.updateBaseData();
  }

  public delete(path: string) {
    this.patch.push({
      op: "remove",
      path,
    });

    this.updateBaseData();
  }

  public undo() {
    if (this.historyIndex > 0) {
      const currentPatch = this.patch.slice(0, this.historyIndex - 1);
      this.historyIndex -= 1;
      return jsonpatch.applyPatch({ ...this.baseData }, currentPatch)
        .newDocument;
    } else {
      return { ...this.baseData };
    }
  }
}

export default new HistoryCcontroller();
