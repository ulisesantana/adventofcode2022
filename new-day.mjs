#!/usr/bin/env node
import * as fs from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'

await main()

async function main() {
  const day = await getNextDay()
  const newDayPath = path.resolve(`src/day-${prependZero(day)}`)
  const templatePath = path.resolve('_templates/day')

  await generateBoilerplate(templatePath, newDayPath)
  await fillTemplates(templatePath, newDayPath, day)

  console.log(`Generated boilerplate for day ${day} at ${path.relative(path.resolve(), newDayPath)}`)
}

async function generateBoilerplate(templatePath, newDayPath) {
  const templates = await fs.promises.readdir(templatePath)
  await fs.promises.mkdir(newDayPath)
  await Promise.all(templates.map(filePath => fs.promises.copyFile(path.resolve(templatePath, filePath), path.resolve(newDayPath, filePath))))
}

async function fillTemplates(templatePath, newDayPath, day) {
  const testFile = 'test.ts'
  await pipeline(
    fs.createReadStream(path.resolve(templatePath, testFile)),
    transformTemplate(day),
    fs.createWriteStream(path.resolve(newDayPath, testFile))
  )
}

function prependZero (n) {
  return n > 9 ? `${n}` : `0${n}`
}

function getNextDay () {
  return getLastDay().then(n => n + 1)
}

async function getLastDay () {
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

function transformTemplate (day) {
  const tag = '@day'
  return async function * (data) {
    for await (const chunk of data) {
      const value = chunk.toString()
      if (value.includes(tag)) {
        yield Buffer.from(value.replace(tag, day))
      } else {
        yield chunk
      }
    }
  }
}
