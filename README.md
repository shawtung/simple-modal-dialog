# This is a simple alert/confirm modal dialog based on Promise.

## Usage

esm:
```bash
$ npm i simple-modal-dialog
```
```javascript
import SimpleModalDialog from 'simple-modal-dialog'
import 'simple-modal-dialog/dist/index.css'


new SimpleModalDialog({
  mode: 'confirm',
  content: 'God is a girl?',
  title: 'Scream from the soul',
  okText: 'Yes',
  cancelText: 'No',
  esc: true,
  enter: true,
  transition: true,
}).then((action, options) => {
  console.log(action) // 'Yes' or 'No' or 'close' or sth. else.
  console.log(options) // All options in use.
})
```

[browser](test.html):
```html
<link rel="stylesheet" href="dist/index.css"></link>
<script src="dist/index.js"></script>
<script>
  const modal = new SimpleModal({
    mode: 'confirm',
    content: 'God is a girl?',
    title: 'Scream from the soul',
    okText: 'Yes',
    cancelText: 'No',
    esc: true,
    enter: true,
    transition: true,
  }).then((action, options) => {
    console.log(action)
    console.log(options)
  })
</script>
```

## LICENSE
MIT
