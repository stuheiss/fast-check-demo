import * as fc from 'fast-check';
import { sort } from '../../src/sort';
import { shallowMount } from '@vue/test-utils'
import Welcome from '@/components/Welcome.vue'
const faker = require('faker')

// fc.configureGlobal({ numRuns: 10000 }) // configure number of runs (default 100)

describe('fast-check', () => {
  // the old way
  it('renders a faker name passed as a prop', () => {
    const name = `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`
    const wrapper = shallowMount(Welcome, {
      props: { name }
    })
    expect(wrapper.text()).toMatch(name)
    // console.log(wrapper.text())
  })

  // fast-check
  it('renders many fake names passed as a prop', () => {
    // let i = 0
    fc.assert(
      fc.property(fc.string(), (name: string) => {
        // i++
        name = name.trim() // bug avoidance, render strips leading/trailing ws
        const wrapper = shallowMount(Welcome, {
          props: { name }
        })
        expect(wrapper.text()).toMatch(name)
        // console.log(wrapper.text())
      })
    )
    // console.log({runs: i})
  })

  // fast-check
  it('renders many alternate fake names using setProps', () => {
    // let i = 0
    fc.assert(
      fc.property(fc.string(), fc.string(), (name: string, name2: string) => {
        // i++
        name = name.trim() // bug avoidance, render strips leading/trailing ws
        name2 = name2.trim() // ditto

        // set first name
        const wrapper = shallowMount(Welcome, {
          props: { name: name }
        })
        expect(wrapper.text()).toMatch(name)

        // set alternate name
        wrapper.setProps({ name: name2 })
        wrapper.vm.$nextTick(() => {
          expect(wrapper.text()).toMatch(name2)
        })
      })
    )
    // console.log({runs: i})
  })

})
