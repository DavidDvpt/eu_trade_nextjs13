export function selectItemParser(datas: any): SelectTypes {
  return datas.map((m: any) => ({ value: m.id, label: m.name }));
}
