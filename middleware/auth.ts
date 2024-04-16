export default defineNuxtRouteMiddleware((to, from) => {
    if (!localStorage.getItem("_token")) {
        if (to.path != '/') {
    
            return navigateTo('/')
          }
     } else {
        if (to.path == '/') {
            return navigateTo('/main')
        }
    }
}) 