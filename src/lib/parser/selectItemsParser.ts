export function selectItemParser(datas: any) {
  return datas.map((m: any) => ({ value: m.id, label: m.name }));
}
