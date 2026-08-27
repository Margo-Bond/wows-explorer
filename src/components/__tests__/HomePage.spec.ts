import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import HomePage from '../../pages/HomePage.vue'

import { fetchShips, fetchShipTypes, fetchNations, fetchMediaBaseUrl } from '../../api/vortexApi'

vi.mock('../../api/vortexApi.ts', () => ({
  fetchShips: vi.fn(),
  fetchShipTypes: vi.fn(),
  fetchNations: vi.fn(),
  fetchMediaBaseUrl: vi.fn(),
}))

describe('HomePage', () => {
  beforeEach(() => {
    vi.resetAllMocks()

    vi.mocked(fetchShipTypes).mockResolvedValue({})
    vi.mocked(fetchNations).mockResolvedValue([])
    vi.mocked(fetchMediaBaseUrl).mockResolvedValue('')
  })

  it('shows an error and retries loading the ship catalog', async () => {
    vi.mocked(fetchShips)
      .mockRejectedValueOnce(new Error('vortex is unavailable'))
      .mockResolvedValueOnce({})

    const wrapper = mount(HomePage)
    await flushPromises()
    expect(wrapper.text()).toContain('Unable to load ships')

    const retryButton = wrapper.findAll('button').find((button) => button.text() === 'Try again')

    expect(retryButton).toBeDefined()
    expect(fetchShips).toHaveBeenCalledTimes(1)

    await retryButton!.trigger('click')
    await flushPromises()

    expect(fetchShips).toHaveBeenCalledTimes(2)
    expect(wrapper.text()).not.toContain('Unable to load ships')
  })
})
