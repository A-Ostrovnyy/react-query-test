import { MenuItem } from './PageMenu.types';

export const menuData: MenuItem[] = [
    {
        route: '/',
        title: 'Home'
    },
    {
        route: '/super-heroes',
        title: 'Traditional Super Heroes'
    },
    {
        route: '/rq-super-heroes',
        title: 'RQ Super Heroes'
    },
    {
        route: '/rq-parallel',
        title: 'RQ Parallel Fetch'
    },
    {
        route: '/rq-parallel-dynamic',
        title: 'RQ Parallel Dynamic Fetch'
    },
    {
        route: '/rq-dependent',
        title: 'Dependent query'
    },
    {
        route: '/rq-paginated',
        title: 'Paginated query'
    },
    {
        route: '/rq-infinite',
        title: 'Infinites query'
    }
];
