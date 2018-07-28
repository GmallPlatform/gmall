import Vue from 'vue'
import page from 'page'
//import App from './App.vue'
import routes from './routes'
import './css/app.css'
/*
new Vue({
    el: '#app',
    render: h => h(App)
})
*/




const app = new Vue({
    el: '#app',
    data: {
        ViewComponent: { render: h => h('div', 'loading...') }
    },
    render (h) { return h(this.ViewComponent) }
})

Object.keys(routes).forEach(route => {

    const routePath='pages/' + routes[route] + '.vue'
    console.log(routePath)
    const Component = require(routePath)
    page(route, () => app.ViewComponent = Component)
})
page('*', () => app.ViewComponent = require('./pages/404.vue'))
page()
