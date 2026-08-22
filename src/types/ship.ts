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
