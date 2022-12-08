import { EOL } from 'os'
import { split, sum } from '../utils'

abstract class Data {
  constructor (readonly path: string, readonly size: number) {}
}

class File extends Data {}
class Directory extends Data {}

class DirectoryScanner {
  private readonly directoryPathList = new Set<string>()
  private readonly files = [] as File[]
  private currentDirectory: string = ''
  private rootPath = '/'
  private changeDirectoryCommand = '$ cd '

  constructor (private readonly terminalOutput: string[]) {}

  scan (): Directory[] {
    for (const line of this.terminalOutput) {
      if (line.startsWith(this.changeDirectoryCommand)) {
        this.changeDirectory(line)
      }
      if (line.match(/\d/)) {
        this.addFile(line)
      }
    }
    return this.buildDirectoriesFrom(this.directoryPathList)
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
    if (directoryName === this.rootPath) {
      this.currentDirectory = this.rootPath
    } else if (directoryName === '..') {
      this.currentDirectory = this.rootPath + split('/', this.currentDirectory).slice(0, -1).join('/')
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
    if (this.currentDirectory === this.rootPath) {
      return `/${directoryName}`
    }
    return `${this.currentDirectory}/${directoryName}`
  }
}

export function sumDirectoriesWithMaxSize100000 (input: string) {
  const maxSize = 100_000
  const terminalOutput = split(EOL, input)
  const directories = new DirectoryScanner(terminalOutput).scan().filter(d => d.size <= maxSize)
  return sum(...directories.map(d => d.size))
}
