/*import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import App from '@/App.vue';

// Importa los componentes que quieres probar
import HomeView from '@/views/HomeView.vue';
import ResultadosView from '@/views/ResultadosView.vue';
import DetallesView from '@/views/DetallesView.vue';

// Crea un router de Vue
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/items',
      name: 'Items',
      component: ResultadosView,
      props: true
    },
    {
      path: '/items/:id',
      name: 'Detalles',
      component: DetallesView,
      props: true
    }
  ]
});

describe('App.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('navigates to ResultadosView when Items route is visited', async () => {
    await router.push({ name: 'Items', params: { search: 'test' } });
    expect(router.currentRoute.value.name).toBe('Items');
    expect(wrapper.findComponent(ResultadosView).exists()).toBe(true);
  });

  it('navigates to DetallesView when Detalles route is visited with an id parameter', async () => {
    await router.push({ name: 'Detalles', params: { id: 1 } });
    expect(router.currentRoute.value.name).toBe('Detalles');
    expect(wrapper.findComponent(DetallesView).exists()).toBe(true);
  });

  // Puedes agregar más pruebas para otras interacciones y comportamientos
});*/
