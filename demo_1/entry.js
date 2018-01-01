import {JsonTreeComp} from '../JsonTreeComp.js';

const vue_instance = new Vue({
  el: '#app',
  template: `
    <div class='demo_container'>     
      <json-tree-comp
        :name="name"
        :title="title"
        :event_bus="event_bus"
        :css_variables="css_variables">
        <div></div>
      </json-tree-comp>
      
      <p>Information gathered by Icon.inc</p>
    </div>
  `,
  data() {
    return {
      name: 'employee_info',
      title: 'Employee Family Information',
      event_bus: new Vue(),
      css_variables: {
        jsontree_comp_color: 'white',
        jsontree_comp_title_color: 'white'
      }
    }
  },
  components: {
    JsonTreeComp
  },
  mounted: function(){
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
  }
});
