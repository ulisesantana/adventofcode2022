import { EOL } from 'os'

type Marker = {
  startPosition: number,
  value: string
}

class Decoder {
  private static markerLength = 4

  static findMarker (data: string): Marker {
    for (const { index, sequence } of Decoder.generateSequences(data)) {
      if (Decoder.isValidMarker(sequence)) {
        return {
          startPosition: index + Decoder.markerLength,
          value: sequence.join('')
        }
      }
    }
    throw new Error('Marker not found')
  }

  static * generateSequences (data: string): Generator<{ index: number, sequence: string[] }> {
    for (const [index] of [...data].entries()) {
      const i = Number(index)
      const sequence = data.substring(i, i + Decoder.markerLength)
      yield {
        index: i,
        sequence: [...sequence]
      }
    }
  }

  private static isValidMarker (sequence: string[]) {
    return new Set(sequence).size === Decoder.markerLength
  }
}

export function findMarkerPosition (input: string) {
  return Decoder.findMarker(input.replaceAll(EOL, '')).startPosition
}
