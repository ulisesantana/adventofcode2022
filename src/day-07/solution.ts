import { EOL } from 'os'
import { Directory, File, DirectoryManager } from './DirectoryManager'
import { split, sum } from '../utils'

class DirectoryCalculator {
  private readonly directories: Directory[]
  constructor (directories: Map<string, Directory>) {
    this.directories = Array.from(directories.values())
      .map((directory, _index, directories) => {
        const files = this.getAllFilesUnderPath(directory.path, directories)
        const directorySize = sum(...files.map(f => f.size))
        return new Directory(directory.path, directorySize).addFiles(...directory.files)
      })
  }

  sumDirectoriesWithMaxSize (maxSize: number) {
    const directories = this.directories.filter(d => d.size <= maxSize)
    this.printDirectories(this.directories)
    return sum(...directories.map(d => d.size))
  }

  private printDirectories (directories: Directory[]) {
    console.table(directories.map(d => ({ ...d, files: sum(...d.files.map(f => f.size)) })))
  }

  private getAllFilesUnderPath (path: string, directories: Directory[]) {
    return directories.reduce<File[]>((files, d) =>
      d.path.startsWith(path)
        ? files.concat(d.files)
        : files,
    [])
  }
}
// too low 1.589.708
// solution 1.581.595
export function sumDirectoriesWithMaxSize100000 (input: string) {
  const maxSize = 100_000
  const terminalOutput = split(EOL, input)
  const directories = new DirectoryManager(terminalOutput).scan()
  return new DirectoryCalculator(directories).sumDirectoriesWithMaxSize(maxSize)
}
