import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import BurgerMenu from '../BurgerMenu.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/albums', component: { template: '<div>Albums</div>' } },
    { path: '/about', component: { template: '<div>About</div>' } }
  ]
})

describe('BurgerMenu', () => {
  it('renders burger button', () => {
    const wrapper = mount(BurgerMenu, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.find('.burger-button').exists()).toBe(true)
    expect(wrapper.find('.burger-line').exists()).toBe(true)
  })

  it('toggles menu on button click', async () => {
    const wrapper = mount(BurgerMenu, {
      global: {
        plugins: [router]
      }
    })

    const button = wrapper.find('.burger-button')
    
    // Initially menu should be closed
    expect(wrapper.find('.slide-menu.open').exists()).toBe(false)

    // Click to open
    await button.trigger('click')
    expect(wrapper.find('.slide-menu.open').exists()).toBe(true)
    expect(wrapper.find('.burger-button.active').exists()).toBe(true)

    // Click to close
    await button.trigger('click')
    expect(wrapper.find('.slide-menu.open').exists()).toBe(false)
  })

  it('closes menu on overlay click', async () => {
    const wrapper = mount(BurgerMenu, {
      global: {
        plugins: [router]
      }
    })

    // Open menu first
    await wrapper.find('.burger-button').trigger('click')
    expect(wrapper.find('.slide-menu.open').exists()).toBe(true)

    // Click overlay to close
    await wrapper.find('.menu-overlay').trigger('click')
    expect(wrapper.find('.slide-menu.open').exists()).toBe(false)
  })

  it('contains navigation links', () => {
    const wrapper = mount(BurgerMenu, {
      global: {
        plugins: [router]
      }
    })

    const links = wrapper.findAll('.menu-link')
    expect(links).toHaveLength(3)
    
    expect(links[0].text()).toContain('Home')
    expect(links[1].text()).toContain('Albums')
    expect(links[2].text()).toContain('About')
  })

  it('closes menu on escape key', async () => {
    const wrapper = mount(BurgerMenu, {
      global: {
        plugins: [router]
      }
    })

    // Open menu
    await wrapper.find('.burger-button').trigger('click')
    expect(wrapper.find('.slide-menu.open').exists()).toBe(true)

    // Press escape
    await wrapper.trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('.slide-menu.open').exists()).toBe(false)
  })
})