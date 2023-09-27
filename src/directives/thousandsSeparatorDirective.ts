import { Directive, DirectiveBinding } from 'vue'

export const thousandsSeparatorDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<number>) {
    const value = binding.value
    const formattedValue = new Intl.NumberFormat().format(value) ?? '0'
    el.textContent = formattedValue
  },
  updated(el: HTMLElement, binding: DirectiveBinding<number>){
    const value = binding.value
    const formattedValue = new Intl.NumberFormat().format(value) ?? '0'
    el.textContent = formattedValue
  },
}
