type HistoryDataType = {
  [k: string]: any;
};

type PatchType = {
  op: string;
  path: string;
  value: any;
};

class HistoryCcontroller {
  public historyData: HistoryDataType;
  public patch: PatchType[];
  private historyIndex: number;

  constructor() {
    this.historyData = {
      name: "John",
      age: 30,
      city: "New York",
    };
    this.patch = [];
    this.historyIndex = 0;
  }

  public add(path: string, value: any) {
    this.patch.push({
      op: "add",
      path,
      value,
    });

    this.historyIndex++;
  }

  public replace(path: string, value: any) {
    this.patch.push({
      op: "replace",
      path,
      value,
    });

    this.historyIndex++;
  }

  public delete(path: string) {
    this.patch.push({
      op: "delete",
      path,
      value: null,
    });

    this.historyIndex++;
  }

  public undo() {
    if (this.historyIndex > 0) {
      const currentPatch = this.patch.slice(0, this.historyIndex);

      return currentPatch;
    } else {
      return [];
    }
  }
}

export default new HistoryCcontroller();
