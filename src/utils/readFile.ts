import * as fs from 'fs/promises'
import * as path from 'path'

export async function readFile (filePath: string): Promise<string> {
  const file = await fs.readFile(path.resolve(filePath))
  return file.toString()
}
