import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/image", "@nuxt/ui"],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    // Секретные переменные, доступные только на сервере
    // Можно получить доступ через useRuntimeConfig() в composables

    // Публичные переменные, доступные и на клиенте и на сервере
    public: {
      wordpressApiUrl: process.env.WORDPRESS_API_URL,
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "JobCart.ru",
      htmlAttrs: {
        lang: "ru",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  ui: {
    fonts: false,
  },
});
