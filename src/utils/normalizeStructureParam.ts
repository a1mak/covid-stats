export default function normalizeStructureParam<T extends string>(arr: T[]) {
  return arr.reduce((obj, item) => {
    obj[item] = item
    return obj
  }, {} as Record<T, T>)
}
