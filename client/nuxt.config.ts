// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  /**
   * Pre-bundling following packages to avoid page reload
   */
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
    build: {
      cssCodeSplit: true, // split css per route
    },
  },

  /**
   * To apply the page transition
   * https://nuxt.com/docs/4.x/getting-started/transitions#page-transitions
   */
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    // https://nuxt.com/docs/4.x/getting-started/seo-meta
    head: {
      title: "Merkle Games", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  /**
   * https://nuxt.com/docs/4.x/getting-started/styling#the-css-property
   */
  css: ["~/assets/css/main.scss"],

  /**
   * https://nuxt.com/docs/4.x/guide/going-further/runtime-config
   */
  runtimeConfig: {
    public: {
      apiBase: "",
      theme: "",
    },
  },

  typescript: {
    typeCheck: true, // or 'build' to only check during the build process
  },

  modules: ["@nuxt/image"],
});
