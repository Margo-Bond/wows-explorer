import type { ApiResponse } from '../types/api'
import type { ShipsById } from '../types/ship'

const VEHICLES_URL = 'api/encyclopedia/en/vehicles/'

export async function fetchShips(): Promise<ShipsById> {
  const response = await fetch(VEHICLES_URL)

  if (!response.ok) {
    throw new Error(`Failed to load ships: ${response.status}`)
  }

  const result: ApiResponse<ShipsById> = await response.json()

  return result.data
}
