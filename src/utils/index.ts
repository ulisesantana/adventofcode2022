export * from './readFile'

export const sum = (...list: number[]) => list.reduce((total, n) => total + n)
export const split = (divider: RegExp|string, text: string) => text.split(divider).filter(Boolean)
