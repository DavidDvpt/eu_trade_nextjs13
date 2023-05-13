export function selectItemParser(datas: any[] | null): SelectTypes {
  if (!datas) {
    return [];
  }
  return datas.map((m: any) => ({ value: m.id, label: m.name }));
}
