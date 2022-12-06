import { EOL } from 'os'

type Marker = {
  position: number,
}

class Device {
  private static PACKET_MARKER_LENGTH = 4
  private static MESSAGE_MARKER_LENGTH = 14

  static findPacketMarker (data: string): Marker {
    return Device.findMarker(data, Device.PACKET_MARKER_LENGTH)
  }

  static findMessageMarker (data: string) {
    return Device.findMarker(data, Device.MESSAGE_MARKER_LENGTH)
  }

  private static findMarker (data: string, markerLength: number): Marker {
    for (const { index, sequence } of Device.generateSequences(data, markerLength)) {
      if (Device.isValidMarker(sequence, markerLength)) {
        return {
          position: index + markerLength
        }
      }
    }
    throw new Error('Marker not found')
  }

  private static * generateSequences (data: string, markerLength: number): Generator<{ index: number, sequence: string[] }> {
    for (const [index] of Array.from(data).entries()) {
      const i = Number(index)
      const sequence = data.substring(i, i + markerLength)
      yield {
        index: i,
        sequence: Array.from(sequence)
      }
    }
  }

  private static isValidMarker (sequence: string[], markerLength: number) {
    return new Set(sequence).size === markerLength
  }
}

export function findPacketMarkerPosition (input: string) {
  return Device.findPacketMarker(input.replaceAll(EOL, '')).position
}

export function findMessageMarkerPosition (input: string) {
  return Device.findMessageMarker(input.replaceAll(EOL, '')).position
}
