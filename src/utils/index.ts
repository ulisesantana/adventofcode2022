export * from './readFile'

export const sum = (...list: number[]) => list.reduce((total, n) => total + n, 0)
export const multiply = (...list: number[]) => list.reduce((total, n) => total * n, 1)
export const split = (divider: RegExp|string, text: string) => text.split(divider).filter(Boolean)
