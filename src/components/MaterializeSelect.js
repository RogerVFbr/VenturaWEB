'use strict';

// https://codesandbox.io/s/v37l3k0k53

const Vue = require('vue') // npm install vue
const M = require('materialize-css') // npm install materialize-css@^1.*

Vue.component('MaterializeSelect', {
  template: `
    <select :value='value'>
      <option value='' disabled selected>Choose</option>
      <slot />
    </select>
  `,

  props: {
    value: {
      type: [ Number, String ],
      default: ''
    }
  },

  /**
   * @description Component local variables
   * @return {Object} data
   * @return {undefined|FormSelect} data.instance
   */
  data() {
    return {
      instance: undefined
    }
  },
  
  methods: {
    /** 
     * @description Initialize a new Materialize select component
     * @param {Object} options 
     * @return {FormSelect}
     * @see https://materializecss.com/select.html#options
     */
    initializeSelect(options = {}) {
      return M.FormSelect.init(this.$el, options)
    },

    /**
     * @description Send the proper input event to the parents components
     * @param {Event} event
     * @param {HTMLSelectElement} target
     * @see https://developer.mozilla.org/fr/docs/Web/API/Event/target
     */
    changeHandler({ target }) {
      this.$emit('input', target.value)      
    }
  },

  mounted() {
    this.instance = this.initializeSelect()

    console.log(this.instance)

    this.$el.addEventListener('change', this.changeHandler)
  },

  watch: {
    value() {
      this.instance.destroy()

      this.$nextTick(() => this.instance = this.initializeSelect())
    }
  },

  destroyed() {
    this.$el.removeEventListener('change', this.changeHandler)
  }
})