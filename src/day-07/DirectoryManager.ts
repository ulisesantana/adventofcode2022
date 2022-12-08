import { split } from '../utils'

export class File {
  constructor (readonly path: string, readonly size: number) {}
}

export class Directory {
  readonly files = [] as File[]

  constructor (readonly path: string, readonly size: number = 0) {}
  addFiles (...files: File[]) {
    this.files.push(...files)
    return this
  }
}

export class DirectoryManager {
  private readonly directories = new Map<string, Directory>()
  private currentDirectory: string = ''
  private rootPath = '/'
  private changeDirectoryCommand = '$ cd '
  constructor (private readonly terminalOutput: string[]) {}

  scan (): Map<string, Directory> {
    for (const line of this.terminalOutput) {
      if (line.startsWith(this.changeDirectoryCommand)) {
        this.changeDirectory(line)
      }
      if (line.match(/\d/)) {
        this.addFile(this.currentDirectory, line)
      }
    }
    return this.directories
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
  }

  private concatPath (directoryName: string) {
    if (this.currentDirectory === this.rootPath) {
      return `/${directoryName}`
    }
    return `${this.currentDirectory}/${directoryName}`
  }

  private addFile (path: string, line: string) {
    const directory = this.directories.get(path) ?? new Directory(path)
    const [size, name] = split(/\s/, line)
    const file = new File(this.concatPath(name), Number(size))
    directory.addFiles(file)
    this.directories.set(directory.path, directory)
  }
}
