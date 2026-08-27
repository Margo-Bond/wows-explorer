import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ShipFilters from '../ShipFilters.vue'

const defaultProps = {
  search: '',
  nation: '',
  shipType: '',
  tier: null,
  nationOptions: [
    {
      value: 'usa',
      label: 'USA',
    },
    {
      value: 'japan',
      label: 'Japan',
    },
  ],

  shipTypeOptions: [
    {
      value: 'Battleship',
      label: 'Battleship',
    },
    {
      value: 'Cruiser',
      label: 'Cruiser',
    },
  ],

  tiers: [1, 2, 3],
}

describe('ShipFilters', () => {
  it('updates the selected ship type', async () => {
    const wrapper = mount(ShipFilters, {
      props: defaultProps,
    })

    const battleshipButton = wrapper
      .findAll('button')
      .find((button) => button.text() === 'Battleship')

    expect(battleshipButton).toBeDefined()
    await battleshipButton!.trigger('click')
    expect(wrapper.emitted('update:shipType')).toEqual([['Battleship']])
  })

  it('emits reset when Reset filters is clicked', async () => {
    const wrapper = mount(ShipFilters, {
      props: {
        ...defaultProps,
        search: 'Yamato',
      },
    })

    const resetButton = wrapper
      .findAll('button')
      .find((button) => button.text() === 'Reset filters')

    expect(resetButton).toBeDefined()
    await resetButton!.trigger('click')
    expect(wrapper.emitted('reset')).toHaveLength(1)
  })

  it('updates the search model', async () => {
    const wrapper = mount(ShipFilters, {
      props: defaultProps,
    })

    const searchInput = wrapper.get('input[type="search"]')
    await searchInput.setValue('Yamato')
    expect(wrapper.emitted('update:search')).toEqual([['Yamato']])
  })
})
