import './index.css'

/**
 * Create a promise-based modal, any valid action will 
 * resolve with the specific action and the applied options.
 * 
 * @param {string} mode - enum { 'confirm' | 'alert' }
 * @param {string} content - message shown
 * @param {string=} title - defaults to mode
 * @param {string=} okText - close btn text of alert, ok btn text of confirm
 * @param {string=} cancelText - cancel btn text of confirm
 * @param {boolean=false} esc - esc-key triggers close or cancel
 * @param {boolean=false} enter - enter-key triggers close or confirm
 * @param {boolean=false} transition - enable the open/close animation
 * 
 * @private {Function} resolve - respond to valid action
 * @private {HTMLElement} containerEl - the whole modal element
 * 
 * @return {Promise}
 */
export default class SimpleModalDialog {
  $resolve
  $containerEl

  constructor (options) {
    if (Object.prototype.toString.call(options) !== '[object Object]') throw new Error('Options must be an object.')
    if (!['confirm', 'alert'].includes(options.mode)) throw new Error('Options.mode must be \'confirm\' or \'alert\'.')
    if (!(typeof options.content === 'string' && options.content)) throw new Error('Options.content must be a non-empty string.')

    this.options = Object.assign({
      mode: undefined,
      content: undefined,
      title: options.mode,
      okText: options.mode === 'confirm' ? 'ok' : 'close',
      cancelText: 'cancel',
      esc: false,
      enter: false,
      transition: false,
    }, options)

    return new Promise((resolve) => {
      this.$resolve = resolve
      this.$render()
    })
  }

  static alert (content) {
    return new SimpleModalDialog({ mode: 'alert', content })
  }

  static confirm (content) {
    return new SimpleModalDialog({ mode: 'confirm', content })
  }
  
  close = (action = 'close') => {
    this.$resolve(action, this.options)

    document.removeEventListener('keyup', this.$keyboardHandler)

    if (this.options.transition) {
      this.$containerEl.addEventListener('transitionend', () => {
        document.body.removeChild(this.$containerEl)
      }, { once: true })
      this.$containerEl.classList.add('transition_start')
    } else {
      document.body.removeChild(this.$containerEl)
    }
  }

  $keyboardHandler = ({ keyCode }) => {
    if (keyCode === 27) {
      this.close('esc')
    } else if (keyCode === 13) {
      this.close('enter')
    }
  }

  $render = () => {
    const containerEl = this.$containerEl = document.createElement('div')
    containerEl.className = 'simple-modal-dialog-container'

    if (this.options.transition) {
      containerEl.classList.add('simple-modal-dialog-container_transition')
      containerEl.classList.add('transition_start')
    }

    containerEl.addEventListener('click', (e) => {
      if (e.target === this.$containerEl) {
        e.stopPropagation()
        this.close('overlay')
      }
    })

    const contentWrapperEl = document.createElement('div')
    contentWrapperEl.className = 'simple-modal-dialog-content-wrapper'
    containerEl.appendChild(contentWrapperEl)

    if (this.options.title) {
      const titleEl = document.createElement('header')
      titleEl.className = 'simple-modal-dialog-title'
      titleEl.innerText = this.options.title
      contentWrapperEl.appendChild(titleEl)
    }

    const contentEl = document.createElement('article')
    contentEl.className = 'simple-modal-dialog-content'
    contentEl.innerText = this.options.content
    contentWrapperEl.appendChild(contentEl)

    const footerEl = document.createElement('footer')
    footerEl.className = 'simple-modal-dialog-footer'
    contentWrapperEl.appendChild(footerEl)

    if (this.options.mode === 'confirm') {
      const cancelButtonEl = document.createElement('button')
      cancelButtonEl.className = 'simple-modal-dialog-footer-button simple-modal-dialog-footer-button_cancel'
      cancelButtonEl.innerText = this.options.cancelText
      cancelButtonEl.addEventListener('click', (e) => {
        e.stopPropagation()
        this.close(this.options.cancelText)
      })
      footerEl.appendChild(cancelButtonEl)
    }

    const okButtonEl = document.createElement('button')
    okButtonEl.className = 'simple-modal-dialog-footer-button simple-modal-dialog-footer-button_ok'
    okButtonEl.innerText = this.options.okText
    okButtonEl.addEventListener('click', (e) => {
      e.stopPropagation()
      this.close(this.options.okText)
    })
    footerEl.appendChild(okButtonEl)

    if (this.options.esc || this.options.enter) {
      document.addEventListener('keyup', this.$keyboardHandler)
    }

    document.body.appendChild(containerEl)
    if (this.options.transition) {
      void containerEl.clientWidth
      containerEl.classList.remove('transition_start')
    }
  }
}
