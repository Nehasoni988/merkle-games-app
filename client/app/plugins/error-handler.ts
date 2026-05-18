export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error("Error Found by plugin : ", error);
    // handle error, e.g. report to a service
  };

  // Also possible
  nuxtApp.hook("vue:error", (error, instance, info) => {
    console.error("Error Found By vue:error hook: ", error);
    // handle error, e.g. report to a service
  });
});
