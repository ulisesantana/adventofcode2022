import { split, sum } from '../utils'

abstract class Data {
  constructor (readonly path: string, readonly size: number) {}
}

class File extends Data {}
export class Directory extends Data {}

export class DirectoryScanner {
  private readonly directories = new Set<string>()
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
    return this.buildDirectoriesFrom(this.directories)
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
    this.directories.add(this.currentDirectory)
  }

  private concatPath (directoryName: string) {
    if (this.currentDirectory === this.rootPath) {
      return `/${directoryName}`
    }
    return `${this.currentDirectory}/${directoryName}`
  }

  private addFile (line: string) {
    const [size, name] = split(/\s/, line)
    this.files.push(new File(this.concatPath(name), Number(size)))
  }
}
