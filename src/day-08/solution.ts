import { split } from '../utils'
import { EOL } from 'os'

class Counter {
  #value: number
  constructor () {
    this.#value = 0
  }

  get value () {
    return this.#value
  }

  increase () {
    this.#value += 1
  }
}

class TreeHelper {
  constructor (private readonly treeMap: number[][]) {}

  isVisible (x: number, y: number) {
    if (this.isOnEdge(x, y)) {
      return true
    }
    return this.areNeighboursEnoughLow(x, y)
  }

  private areNeighboursEnoughLow (x: number, y: number) {
    const treeHeight = this.treeMap[x][y]
    const isEnoughLow = (n: number) => n < treeHeight
    const neighbours = this.getNeighbours(x, y)
    return neighbours.top.every(isEnoughLow) ||
      neighbours.right.every(isEnoughLow) ||
      neighbours.bottom.every(isEnoughLow) ||
      neighbours.left.every(isEnoughLow)
  }

  private isOnEdge (x: number, y: number) {
    const maxX = this.treeMap.length - 1
    const maxY = this.treeMap[x].length - 1
    return x === 0 ||
      x === maxX ||
      y === 0 ||
      y === maxY
  }

  private getNeighbours (x: number, y: number) {
    const isNotUndefined = x => x !== undefined
    return {
      top: this.treeMap.slice(0, x).map(r => r[y]).filter(isNotUndefined),
      left: this.treeMap[x].slice(0, y).filter(isNotUndefined),
      right: this.treeMap[x].slice(y + 1).filter(isNotUndefined),
      bottom: this.treeMap.slice(x + 1).map(r => r[y]).filter(isNotUndefined)
    }
  }
}

export function countVisibleTrees (input: string) {
  const map = split(EOL, input).map(row => Array.from(row).map(x => Number(x)))
  const visibleTrees = new Counter()
  const helper = new TreeHelper(map)
  for (const [rowIndex, row] of map.entries()) {
    for (const [columnIndex] of row.entries()) {
      if (helper.isVisible(rowIndex, columnIndex)) {
        visibleTrees.increase()
      }
    }
  }
  return visibleTrees.value
}

export function calcHighestScenicScore (input: string) {
  const map = split(EOL, input).map(row => Array.from(row).map(x => Number(x)))
  const visibleTrees = new Counter()
  const helper = new TreeHelper(map)
  for (const [rowIndex, row] of map.entries()) {
    for (const [columnIndex] of row.entries()) {
      if (helper.isVisible(rowIndex, columnIndex)) {
        visibleTrees.increase()
      }
    }
  }
  return visibleTrees.value
}
