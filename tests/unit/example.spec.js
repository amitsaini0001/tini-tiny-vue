import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Navbar from "@/components/Navbar.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe('Navbar.vue', () => {
  it('renders a div', () => {
    const wrapper = shallowMount(Nav)
    expect(wrapper.contains('div')).toBe(true)
  })
})
