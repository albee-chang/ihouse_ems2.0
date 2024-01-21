/* eslint-disable import/no-duplicates */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/scss/all.scss'

// import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2'

// 引入 VeeValidate 元件跟功能
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
// 引入 VeeValidate 的驗證規則
// import AllRules from '@vee-validate/rules';
import * as rules from '@vee-validate/rules'
// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n'
// 引入 VeeValidate 的繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import twValidations from './i18n/tw/validations'
const app = createApp(App)

Object.keys(rules).forEach(rule => {
  defineRule(rule, rules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')
localize('zh_TW', twValidations)

app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

app.use(VueSweetalert2, options)
app.use(router)

app.use(createPinia())
app.mount('#app')
