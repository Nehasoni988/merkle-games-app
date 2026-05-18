import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import AppStatusMessage from "~/components/appStatusMessage.vue";

describe("AppSkeletonLoader", () => {
  it("renders default loading message", () => {
    const wrapper = mount(AppStatusMessage);

    expect(wrapper.text()).toContain("Please wait");
  });

  it("renders custom loading message", () => {
    const wrapper = mount(AppStatusMessage, {
      props: {
        message: "Loading games...",
      },
    });

    expect(wrapper.text()).toContain("Loading games...");
  });
});
