## This is a simple alert/confirm modal dialog based on Promise.

```javascript
import SimpleModalDialog from 'simple-modal-dialog'

new SimpleModalDialog({
  mode: 'confirm',
  content: 'God is a girl?',
  okText: 'Yes',
  cancelText: 'No',
}).then((action, options) => {
  console.log(action) // 'confirm' or 'cancel' or 'close' or sth. else.
  console.log(options) // All options in use
})
```
