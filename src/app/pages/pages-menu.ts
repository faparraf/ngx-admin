import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Configuración',
    icon: 'nb-gear',
    children: [
      {
        title: 'Organización',
        link: '/pages/configuracion/organization',
      },
      {
        title: 'Plantilla de Activos',
        link: '/pages/configuracion/plantilla',
      },
      {
        title: 'Procesos',
        link: '/pages/configuracion/proceso',
      },
    ],
  },
  {
    title: 'Activos',
    icon: 'nb-list',
    children: [
      {
        title: 'Gestión',
        link: '/pages/activos/gestion',
      },
      {
        title: 'Cargar',
        link: '/pages/activos/cargar',
      },
    ],
  },
  {
    title: 'Iteración',
    icon: 'nb-location',
    children: [
      {
        title: 'General',
        link: '/pages/iteracion/general',
      },
      {
        title: 'Iniciar Iteración',
        link: '/pages/iteracion/inicio',
      },
      {
        title: 'Personal',
        link: '/pages/iteracion/personal',
      },
    ],
  },
  {
    title: 'Cluster',
    icon: 'nb-keypad',
    children: [
      {
        title: 'Agrupamiento',
        link: '/pages/cluster/agrupamiento',
      },
    ],
  },
  {
    title: 'Reportes',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'General',
        link: '/pages/reportes/general',
      },
    ],
  },
];
