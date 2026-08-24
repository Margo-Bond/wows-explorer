import type { ApiResponse } from '../types/api'
import type { ShipsById, ShipTypesByName, Nation } from '../types/ship'

const API_BASE_PATH = '/api/encyclopedia/en'

export async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_PATH}${path}`)

  if (!response.ok) {
    throw new Error(`Vortex API Error: ${response.status}`)
  }
  const result: ApiResponse<T> = await response.json()
  return result.data
}

export function fetchShips(): Promise<ShipsById> {
  return request<ShipsById>('/vehicles/')
}

export function fetchNations(): Promise<Nation[]> {
  return request<Nation[]>('/nations/')
}

export function fetchShipTypes(): Promise<ShipTypesByName> {
  return request<ShipTypesByName>('/vehicle_types_common/')
}

export function fetchMediaBaseUrl(): Promise<string> {
  return request<string>('/media_path/')
}
