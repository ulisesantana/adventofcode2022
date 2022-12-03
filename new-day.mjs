#!/usr/bin/env node
import * as fs from 'node:fs'
import path from 'node:path'
import { Templater } from './templater.mjs'

await main()

async function main() {
  const day = await getNextDay()
  const dayFolder = getDayFolder(day)
  const newDayPath = path.resolve(`src/${dayFolder}`)
  const templatePath = path.resolve('_templates/day')
  const t = new Templater(templatePath, newDayPath)

  await t.generateBoilerplate({ day, dayFolder })

  console.log(`Generated boilerplate for day ${day} at ${path.relative(path.resolve(), newDayPath)}`)
}

function getDayFolder(day) {
  return `day-${prependZero(day)}`
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

