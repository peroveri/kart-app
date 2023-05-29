import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import ErrorList from '../ErrorList.vue'
import { useCityBikesStore } from '../../stores/cityBikes'
import { createApp } from 'vue'

describe('HelloWorld', () => {
  const app = createApp({})
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  })

  it('empty if no errors', () => {
    const wrapper = mount(ErrorList)
    expect(wrapper.text()).toBe('')
  })

  it('content if errors', () => {
    const store = useCityBikesStore()
    store.errors.push({ title: 'foo', message: 'bar' })

    const wrapper = mount(ErrorList)
    expect(wrapper.text()).toContain('Lukk')
  })
})
