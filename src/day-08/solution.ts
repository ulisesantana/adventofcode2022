import { multiply, split } from '../utils'
import { EOL } from 'os'

class TreeHelper {
  private readonly treeMap: Array<number[]>
  constructor (input: string) {
    this.treeMap = split(EOL, input).map(row => Array.from(row).map(x => Number(x)))
  }

  calcVisibleTrees () {
    let visibleTrees = 0
    for (const [x, y] of this.generateTreeMapIterator()) {
      if (this.isVisible(x, y)) {
        visibleTrees += 1
      }
    }
    return visibleTrees
  }

  calcHighestScenicScore () {
    const scores = [] as number[]
    for (const [x, y] of this.generateTreeMapIterator()) {
      scores.push(this.calcScenicScore(x, y))
    }
    return Math.max(...scores)
  }

  private isVisible (x: number, y: number) {
    return this.isOnEdge(x, y) || !this.areNeighboursBlockingTreeAt(x, y)
  }

  private areNeighboursBlockingTreeAt (x: number, y: number) {
    const treeHeight = this.treeMap[x][y]
    const isBlocking = (n: number) => n >= treeHeight
    return Object.values(this.getNeighboursSortedByProximity(x, y))
      .every(neighboursInOneDirection => neighboursInOneDirection.some(isBlocking))
  }

  private isOnEdge (x: number, y: number) {
    const maxX = this.treeMap.length - 1
    const maxY = this.treeMap[x].length - 1
    return x === 0 || x === maxX || y === 0 || y === maxY
  }

  private calcScenicScore (x: number, y: number) {
    const baseHeight = this.treeMap[x][y]
    const scores = Object
      .values(this.getNeighboursSortedByProximity(x, y))
      .map(n => this.countTreeVisibility(baseHeight, n))
    return multiply(...scores)
  }

  private countTreeVisibility (treeHeight: number, [tree, ...rest]: number[], treeVisibility = 1) {
    if (!rest.length) {
      return tree !== undefined ? treeVisibility : 0
    }
    if (tree >= treeHeight) {
      return treeVisibility
    }
    return this.countTreeVisibility(treeHeight, rest, treeVisibility + 1)
  }

  private * generateTreeMapIterator (): Generator<[number, number]> {
    for (const [rowIndex, row] of this.treeMap.entries()) {
      for (const [columnIndex] of row.entries()) {
        yield [rowIndex, columnIndex]
      }
    }
  }

  private getNeighboursSortedByProximity (x: number, y: number) {
    const isNotUndefined = x => x !== undefined
    return {
      up: this.treeMap.slice(0, x).map(r => r[y]).filter(isNotUndefined).reverse(),
      left: this.treeMap[x].slice(0, y).filter(isNotUndefined).reverse(),
      right: this.treeMap[x].slice(y + 1).filter(isNotUndefined),
      down: this.treeMap.slice(x + 1).map(r => r[y]).filter(isNotUndefined)
    }
  }
}

export function countVisibleTrees (input: string) {
  return new TreeHelper(input).calcVisibleTrees()
}

export function calcHighestScenicScore (input: string) {
  return new TreeHelper(input).calcHighestScenicScore()
}
