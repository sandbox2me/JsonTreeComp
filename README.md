## json-tree-comp

**json-tree-comp** is a Vue.js (>= 2.5) web component that displays a JSON formatted object as a hierarchical tree.  **json-tree-comp** depends on the [vue.js](https://vuejs.org/ "Vue.js") framework.  The dependency can be installed via [yarn install](https://yarnpkg.com/en/docs/cli/install/  "yarn install") with the included `package.json`file.

## Props

A prop in Vue.js is a custom attribute for passing information from a parent component hosting **json-tree-comp** instance(s) to a **json-tree-comp** as a child component. 

**json-tree-comp** has the following props for a parent to bind to child:

  `name` -- a name for the component that distinguishes it from other **json-tree-comp**'s that might be under the parent (string, default: 'null')

  `title` -- a title to be placed above the tree (string, default: null)

  `indent` --  the number of spaces to indent sub nodes

  `event_bus` -- an instance of Vue() that establishes a one way event based communication from the parent to **json-tree-comp** the child. (object, default: null)

  `css_variables` -- defines the css variables for **json-tree-comp** (object, default: null)

Of these props,`name` and`event_bus` are required and they need to be bound by the parent for  the communication from parent to child to work.

## Styling

The `css_variables` prop is a javascript object that contains any combination of css variable names as keys and associated values.  The following list are the css variable names along with their default values for a quick styling of **json-tree-comp**:

```
    {
      jsontree_comp_font_family: 'Verdana,serif',
      jsontree_comp_font_size: '14px',
      jsontree_comp_color: 'black',
      jsontree_comp_background: 'transparent',
      jsontree_comp_width: '250px',
      jsontree_comp_height: '300px',

      jsontree_comp_down_icon: '\21D3',

      jsontree_comp_title_font_size: '18px',
      jsontree_comp_title_color: 'black'
    }
```

## Events

Using the `event_bus` prop, the parent component emits an event to the child for setting the JSON object.  **json-tree-comp** as the child listens to the following  event from the parent:

```
'jsontree_comp_json_obj' -- name of the event emitted by parent with a JSON object payload
```

The following is an example of setting the JSON object from parent to child:

```
    const json_obj = {
      'name':'Billy Bob',
        'favorite number': 3,
        'veteran': true,
        'address info':{
        'street':'123 Edward Ave',
          'city':'Richmond',
          'state':'Virginia',
          'coordinates':[{'latitude':32.4567},{'longitude':67.8965}],
          'neighbors':{'right':'Roger','left':'Jane','across':'Sydney'},
      },
      'children':[{'name':'Bob','age':10},{'name':'Tommy','age':13},{'name':'Nancy','age':15}]
    };
    this.event_bus.$emit('jsontree_comp_json_obj', 'employee_info', json_obj);
```

Note that the event includes the event name, name of the parent component (i.e. `employee_info`), and the JSON object.  

## Demonstration

Two demonstrations of **json-tree-comp** are provided in the folders named `demo_1` and `demo_2` and can be viewed by hosting the `index.html` files.

Here is some example code for using **json-tree-comp** taken from demo_1:

```
      <json-tree-comp
        :name="name"
        :title="title"
        :event_bus="event_bus"
        :css_variables="css_variables">
        <div></div>
      </json-tree-comp>
```

And here are the data references:

```
    {
      name: 'employee_info',
      title: 'Employee Family Information',
      event_bus: new Vue(),
      css_variables: {
        jsontree_comp_color: 'white',
        jsontree_comp_title_color: 'white'
      }
    }
```

