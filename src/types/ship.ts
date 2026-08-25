export interface Ship {
  level: number
  name: string
  nation: string
  tags: string[]
  icons: {
    medium: string
    large: string
  }
  localization: {
    mark: {
      en: string
    }
    shortmark: {
      en: string
    }
  }
}

export type ShipsById = Record<string, Ship>

export interface ShipType {
  icons: {
    default: string
    premium: string
    special: string
  }
  sort_order: number
  localization: {
    mark: {
      en: string
    }
  }
}

export type ShipTypesByName = Record<string, ShipType>

export interface Nation {
  name: string
  icons: {
    small: string
    large: string
  }
  localization: {
    mark: {
      en: string
    }
  }
}

export interface ShipListItem {
  id: string
  name: string
  tier: number
  nationKey: string
  nationName: string
  typeKey: string | null
  typeName: string | null
  imageUrl: string | null
}

export interface ShipFilterOption {
  value: string
  label: string
}
