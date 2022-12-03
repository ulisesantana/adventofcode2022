import fs from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'

export class Templater {
  constructor (readPath, writePath) {
    this.readPath = readPath
    this.writePath = writePath
  }

  async generateBoilerplate (data) {
    const templates = await fs.promises.readdir(this.readPath)
    await fs.promises.mkdir(this.writePath)
    await this.#generateTemplates(templates)
    await this.#fillTemplates(templates, data)
  }

  async #generateTemplates (templates) {
    await Promise.all(templates.map(filePath => fs.promises.copyFile(
      path.resolve(this.readPath, filePath), path.resolve(this.writePath, filePath)
    )))
  }

  async #fillTemplates (templates, data) {
    await Promise.all(templates.map(filePath => this.#fillFile(filePath, data)))
  }

  /**
   * @param {string} file
   * @param {object} data
   */
  #fillFile (file, data) {
    return pipeline(
      fs.createReadStream(path.resolve(this.readPath, file)),
      this.#transform(data),
      fs.createWriteStream(path.resolve(this.writePath, file))
    )
  }

  #transform (data) {
    return async function * (buffer) {
      for await (const chunk of buffer) {
        yield Buffer.from(Templater.#populateTemplate(chunk.toString(), Object.entries(data)))
      }
    }
  }

  /**
   * @param {string} template
   * @param {[string, any][]} data
   */
  static #populateTemplate (template, data) {
    if (data?.length < 1) {
      return template
    }
    const [[tag, value], ...rest] = data
    return Templater.#populateTemplate(template.replaceAll(`{{${tag}}}`, value), rest)
  }
}
