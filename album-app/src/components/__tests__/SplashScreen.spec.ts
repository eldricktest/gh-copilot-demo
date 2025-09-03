import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SplashScreen from '../SplashScreen.vue'

describe('SplashScreen', () => {
  it('renders splash screen content', () => {
    const wrapper = mount(SplashScreen)

    expect(wrapper.find('.splash-screen').exists()).toBe(true)
    expect(wrapper.find('.app-title').text()).toBe('Album App')
    expect(wrapper.find('.loading-text').text()).toBe('Loading amazing albums...')
    expect(wrapper.find('.logo-animation').exists()).toBe(true)
    expect(wrapper.find('.spinner').exists()).toBe(true)
  })

  it('is visible initially', () => {
    const wrapper = mount(SplashScreen)
    
    const splashScreen = wrapper.find('.splash-screen')
    expect(splashScreen.exists()).toBe(true)
    expect(splashScreen.isVisible()).toBe(true)
  })

  it('emits splash-complete event after timeout', async () => {
    vi.useFakeTimers()
    
    const wrapper = mount(SplashScreen)
    
    // Initially no event should be emitted
    expect(wrapper.emitted('splashComplete')).toBeUndefined()
    
    // Fast-forward time to 3 seconds
    vi.advanceTimersByTime(3000)
    
    // Wait for next tick to ensure event is emitted
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('splashComplete')).toBeTruthy()
    expect(wrapper.emitted('splashComplete')).toHaveLength(1)
    
    vi.useRealTimers()
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(SplashScreen)

    const logo = wrapper.find('.logo-animation')
    expect(logo.attributes('alt')).toBe('Album App Logo')
  })

  it('contains expected CSS classes for animations', () => {
    const wrapper = mount(SplashScreen)

    expect(wrapper.find('.logo-animation').exists()).toBe(true)
    expect(wrapper.find('.spinner').exists()).toBe(true)
    expect(wrapper.find('.splash-content').exists()).toBe(true)
  })
})