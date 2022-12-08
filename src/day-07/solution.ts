import { EOL } from 'os'
import { Directory, DirectoryScanner } from './DirectoryScanner'
import { split, sum } from '../utils'

class DiskHelper {
  constructor (private readonly directories: Directory[]) {}

  sumDirectoriesWithMaxSize (maxSize: number) {
    const directories = this.directories.filter(d => d.size <= maxSize)
    return sum(...directories.map(d => d.size))
  }
}

export function sumDirectoriesWithMaxSize100000 (input: string) {
  const maxSize = 100_000
  const terminalOutput = split(EOL, input)
  const directories = new DirectoryScanner(terminalOutput).scan()
  return new DiskHelper(directories).sumDirectoriesWithMaxSize(maxSize)
}
