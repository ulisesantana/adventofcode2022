import { EOL } from 'os'
import { split, sum } from '../utils'

abstract class Data {
  constructor (readonly path: string, readonly size: number) {}
}

class File extends Data {}

class Directory extends Data {}

class DiskUtilities {
  public static readonly rootPath = '/'
  private readonly directoryPathList = new Set<string>()
  #directories: Directory[] = []
  private readonly files = [] as File[]
  private currentDirectory: string = ''
  private changeDirectoryCommand = '$ cd '

  constructor (private readonly terminalOutput: string[]) {}

  get directories () {
    return this.#directories
  }

  scan (): DiskUtilities {
    for (const line of this.terminalOutput) {
      if (line.startsWith(this.changeDirectoryCommand)) {
        this.changeDirectory(line)
      }
      if (line.match(/\d/)) {
        this.addFile(line)
      }
    }
    this.#directories = this.buildDirectoriesFrom(this.directoryPathList)
    return this
  }

  getBestDirectoryForDelete (totalSpace: number, requiredSpace: number): Directory {
    const neededSpace = this.getNeededSpace(totalSpace, requiredSpace)
    return DiskUtilities.getDirectoryForFreeUpEnoughSpace(neededSpace, this.sortBySizeAsc().#directories)
  }

  private sortBySizeAsc (): DiskUtilities {
    this.#directories.sort((a: Data, b: Data) => a.size - b.size)
    return this
  }

  private getNeededSpace (totalSpace: number, requiredSpace: number) {
    const freeSpace = totalSpace - this.#directories.find(d => d.path === DiskUtilities.rootPath)!.size
    return freeSpace >= requiredSpace ? 0 : requiredSpace - freeSpace
  }

  private buildDirectoriesFrom (directories: Set<string>) {
    return Array.from(directories).map(path => new Directory(
      path,
      sum(...this.files.reduce<number[]>((
        sizes, file) => file.path.startsWith(path)
        ? sizes.concat(file.size)
        : sizes,
      []))
    ))
  }

  private changeDirectory (command: string) {
    const [directoryName] = split(this.changeDirectoryCommand, command)
    if (directoryName === DiskUtilities.rootPath) {
      this.currentDirectory = DiskUtilities.rootPath
    } else if (directoryName === '..') {
      this.currentDirectory = DiskUtilities.rootPath + split('/', this.currentDirectory).slice(0, -1).join('/')
    } else {
      this.currentDirectory = this.concatPath(directoryName)
    }
    this.directoryPathList.add(this.currentDirectory)
  }

  private addFile (line: string) {
    const [size, name] = split(/\s/, line)
    this.files.push(new File(this.concatPath(name), Number(size)))
  }

  private concatPath (directoryName: string) {
    if (this.currentDirectory === DiskUtilities.rootPath) {
      return `/${directoryName}`
    }
    return `${this.currentDirectory}/${directoryName}`
  }

  private static getDirectoryForFreeUpEnoughSpace (neededSpace: number, [directory, ...rest]: Directory[]): Directory {
    if (directory === undefined) {
      throw new Error('There is no directory bigger than needed space.')
    }
    if (directory.size >= neededSpace) {
      return directory
    }
    return this.getDirectoryForFreeUpEnoughSpace(neededSpace, rest)
  }
}

export function sumDirectoriesWithMaxSize100000 (input: string) {
  const maxSize = 100_000
  const terminalOutput = split(EOL, input)
  const directories = new DiskUtilities(terminalOutput).scan().directories.filter(d => d.size <= maxSize)
  return sum(...directories.map(d => d.size))
}

export function getDirectorySizeForDelete (input: string): number {
  const terminalOutput = split(EOL, input)
  const totalSpace = 70_000_000
  const requiredSpace = 30_000_000
  return new DiskUtilities(terminalOutput)
    .scan()
    .getBestDirectoryForDelete(totalSpace, requiredSpace)
    .size
}
