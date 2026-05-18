import { mount, shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { defineComponent, nextTick } from "vue";
import GameCard from "~/components/game/index.vue";

vi.mock("~/services/api/media", () => ({
  mediaAPI: {
    fetchImage: vi.fn(() => "/image.png"),
  },
}));

global.helper = {
  formatRating: (value: number) => value,
  formatDate: (date: string) => date,
};

describe("GameCard", () => {
  const game = {
    id: 1,
    title: "Cyberpunk",
    average_rating: 4.5,
    release_date: "2024-01-01",
    images: [],
    genre: {
      name: "RPG",
    },
  };

  it("renders game title and genre", async () => {
    const wrapper = shallowMount(GameCard, {
      props: {
        game,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: "<a><slot /></a>",
          },
          NuxtImg: true,
        },
        mocks: {
          helper: {
            formatRating: (v: number) => v,
            formatDate: (v: string) => v,
          },
        },
      },
    });

    await nextTick();

    expect(wrapper.text()).toContain("Cyberpunk");
    expect(wrapper.text()).toContain("RPG");
  });

  it("renders formatted rating", async () => {
    const wrapper = shallowMount(GameCard, {
      props: {
        game,
      },

      global: {
        stubs: {
          NuxtImg: defineComponent({
            template: "<img />",
          }),

          NuxtLink: defineComponent({
            props: ["to"],
            template: "<a><slot /></a>",
          }),

          ClientOnly: defineComponent({
            template: "<div><slot /></div>",
          }),
        },

        mocks: {
          helper: {
            formatRating: () => "4.5",
            formatDate: () => "2024",
          },
        },
      },
    });

    await nextTick();

    expect(wrapper.text()).toContain("4.5");
  });

  it("creates correct game details link", () => {
    const wrapper = shallowMount(GameCard, {
      props: { game },
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ["to"],
          },
        },
        mocks: {
          helper: {
            formatRating: () => "4.5",
            formatDate: () => "2024",
          },
        },
      },
    });

    expect(wrapper.find("a").attributes("href")).toBe("/games/1");
  });
});
