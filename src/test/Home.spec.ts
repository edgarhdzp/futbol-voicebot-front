import { mount } from "@vue/test-utils"
import Home from "../views/Home.vue"

test("renderiza el título", () => {
  const wrapper = mount(Home, {
    global: {
      stubs: {
        'v-app': true,
        'v-container': true,
        'v-img': true,
        'v-btn': true,
      }
    }
  })
  expect(wrapper.text()).toContain("Football Voicebot")
})