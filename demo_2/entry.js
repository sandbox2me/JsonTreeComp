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
    </div>
  `,
  data: function() {
    return {
      name: 'food_tree',
      title: 'Food Information from USDA',
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
  methods: {
    load_JSON: function(){
      const xobj = new XMLHttpRequest();
      xobj.overrideMimeType('application/json');
      xobj.open('GET','data/food.json',true);
      xobj.onreadystatechange = ()=>{
        if(xobj.readyState === 4 && xobj.status === 200){
          const json_obj = JSON.parse(xobj.responseText);
          this.event_bus.$emit('jsontree_comp_json_obj', 'food_tree', json_obj);
        }
      };
      xobj.send(null);
    }
  },
  mounted: function(){
    this.load_JSON();
  }
});
