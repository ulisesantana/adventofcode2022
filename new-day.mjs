#!/usr/bin/env node
import * as fs from 'node:fs'
import path from 'node:path'
import { pipeline } from 'stream/promises'
const prependZero = n => n > 9 ? `${n}` : `0${n}`
const getNextDay = async () => getLastDay().then(n => n + 1)
async function getLastDay() {
  const prefix = 'day-'
  const src = await fs.promises.readdir(path.resolve('src'))
  return src.reduce((nextDay, folder) => {
    if (folder.includes(prefix)) {
      const day = Number(folder.replace(prefix, ''))
      return day > nextDay ? day : nextDay
    }
    return nextDay
  }, 1)
}
async function * fillTemplate(source) {
  const tag = '@day'
  for await (const chunk of source) {
    const value = chunk.toString()
    if (value.includes(tag)) {
      yield Buffer.from(value.replace(tag, day))
    } else {
      yield chunk
    }
  }
}

const day = await getNextDay()
const newDayPath = path.resolve(`src/day-${prependZero(day)}`)
const templatePath = path.resolve('_templates/day')
const templates = await fs.promises.readdir(templatePath)
await fs.promises.mkdir(newDayPath)
await Promise.all(templates.map(filePath => fs.promises.copyFile(path.resolve(templatePath, filePath), path.resolve(newDayPath, filePath))))
const testFile = 'test.ts'
await pipeline(
  fs.createReadStream(path.resolve(templatePath, testFile)),
  fillTemplate,
  fs.createWriteStream(path.resolve(newDayPath, testFile))
)
console.log(`Generated boilerplate for day ${day} at ${path.relative(path.resolve(), newDayPath)}`)
