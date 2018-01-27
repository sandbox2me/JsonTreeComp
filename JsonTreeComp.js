export const JsonTreeComp = {
  name: 'JsonTreeComp',
  template: `
    <slot></slot>
  `,
  data: function(){
    return {
      json_obj: null
    }
  },
  props: {
    name: {
      type: String,
      required: true,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    indent: {
      type: Number,
      default: 16
    },
    css_variables: {
      type: Object,
      default: () => {
        return null;
      }
    },
    event_bus: {
      type: Object,
      required: true,
      default: () => {
        return null;
      }
    }
  },
  
  render: function(h){
    if(this.json_obj !== null){
      const top_node = this.$slots.default[0];
      top_node.children = [];
      const container_ele = h('div',{
        attrs: {'class': 'jsontree_comp_container'}
      },[]);
      top_node.children.push(container_ele);

      const title_ele = h('div',{
        attrs: {'class': 'title_box'}
      },[this.title]);
      container_ele.children.push(title_ele);

      const tree_content_ele = h('div',{
        attrs: {'class': 'tree_content'}
      },[]);
      container_ele.children.push(tree_content_ele);

      this.render_json(h,tree_content_ele,this.json_obj,0);
      return top_node;
    }
  },
  methods: {
    render_json: function(h,parent_node,obj,indent){
      for(const key in obj){
        if((obj[key] instanceof Object) && !(obj[key] instanceof Array)){
          const ele_icon = h('span', {
            attrs: {'class': 'icon_closed'},
            on: {click: this.click_handler},
            style: {'margin-left': `${indent}px`}
          });
          parent_node.children.push(ele_icon);

          const ele_span = h('span', {
          },[' ' + key + ': {']);
          parent_node.children.push(ele_span);

          const ele_content = h('div',{
            attrs: {class: 'hideit'}
          },[]);
          ele_span.children.push(ele_content);

          this.render_json(h,ele_content,obj[key],indent + this.indent);

          const ele_div = h('div',{
            style: {'margin-left': `${indent}px`}
          },['}']);
          parent_node.children.push(ele_div);
        }else if(obj[key] instanceof Array){
          const ele_icon = h('span', {
            attrs: {'class': 'icon_closed'},
            on: {click: this.click_handler},
            style: {'margin-left': `${indent}px`}
          });
          parent_node.children.push(ele_icon);

          const ele_span = h('span', {
          },[' ' + key + ': [']);
          parent_node.children.push(ele_span);

          const ele_content = h('div',{
            attrs: {class: 'hideit'}
          },[]);
          ele_span.children.push(ele_content);

          this.render_json(h,ele_content,obj[key],indent + this.indent);

          const ele_div = h('div',{
            style: {'margin-left': `${indent}px`}
          },[']']);
          parent_node.children.push(ele_div);

        }else{
          const ele_div = h('div',{
            style: {
              'margin-left': `${indent}px`
            }
          },[key + ': ' + obj[key]]);
          parent_node.children.push(ele_div);
        }
      }
    },
    click_handler: function(e){
      e.stopPropagation();
      e.preventDefault();
      if(e.currentTarget.classList.contains('icon_closed')){
        e.currentTarget.classList.remove('icon_closed');
        e.currentTarget.classList.add('icon_open');
      }else{
        e.currentTarget.classList.remove('icon_open');
        e.currentTarget.classList.add('icon_closed');
      }
      if(e.currentTarget.nextSibling.children[0].classList.contains('hideit')){
        e.currentTarget.nextSibling.children[0].classList.remove('hideit')
      }else{
        e.currentTarget.nextSibling.children[0].classList.add('hideit');
      }
    }
  },
  mounted() {
    //parent to child
    //Data set via event because it may take a while
    if(this.event_bus !== null && this.name !== null){
      this.event_bus.$on('jsontree_comp_json_obj', (name,json_obj) =>{
        if(name === this.name){
          this.json_obj = json_obj;
        }
      });
    }
    if(this.css_variables !== null){
      for(let key of Object.keys(this.css_variables)){
        this.$el.parentElement.style.setProperty(`--${key}`, this.css_variables[key]);
      }
    }
  }    
};