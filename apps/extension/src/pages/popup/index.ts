import { mount } from 'svelte'
import Popup from '@/pages/popup/component/Popup.svelte'
import '@/app.css'

export const popup = mount(Popup, {
    target: document.getElementById('app') as HTMLElement
})
