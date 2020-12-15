# Subform

## Config

```JS
[{
  name: 'items',
  type: 'subform',
  label: 'Items',
  elements: [
    // array of form elements:
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      component: FullName // used to display the value in the summary
    }
  ],
  columns: [ // optional
    {
      name: 'name',
      label: 'Name',
      component: FullName
    }
  ]
}]
```
