import Blog from '../components/frontoffice/Blog.vue'
import Node from '../components/frontoffice/Node.vue'
import Tag from '../components/frontoffice/Tag.vue'

import Dashboard from '../components/backoffice/Dashboard.vue'
import List from '../components/backoffice/List.vue'
import Edit from '../components/backoffice/Edit.vue'



const routes = [
	//route for the home route of the webpage
  { path: '*',
    component: Blog,
    name: 'blog'
  },
	{
    path: '/',
    component: Blog,
    name: 'blog'
  },
	//route for the about route of the webpage
	{
    path: '/dashboard',
    component: Dashboard,
    name: 'dashboard'
  },
  {
    path: '/content',
    component: List,
    name: 'content'
  },
  {
    path: '/node/:id/edit',
    component: Edit,
    name: 'edit'
  },
  {
    path: '/node/:id',
    component: Node,
    name: 'node'
  },
  {
    path: '/tag/:id',
    component: Tag,
    name: 'tag'
  },
]

export default routes
