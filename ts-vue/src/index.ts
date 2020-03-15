import Vue from 'vue'

let app1 = new Vue({
  el: '.app',
  data: {
    name: 'TypeScript',
  },
  template: `<h1>Hello {{ name }}</h1>`
})