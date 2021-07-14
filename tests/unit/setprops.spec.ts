import { shallowMount } from '@vue/test-utils'
import Welcome from '@/components/Welcome.vue'

describe('setprops', () => {
  it('renders props.name when passed', async () => {
    const wrapper = shallowMount(Welcome)

    await wrapper.setProps({ name: 'Joe' })
    expect(wrapper.text()).toMatch('Hello Joe')
    // console.log(wrapper.text())

    await wrapper.setProps({ name: 'Bob' })
    expect(wrapper.text()).toMatch('Hello Bob')
    // console.log(wrapper.text())
  })
})
