import {
    Home,
    Hbogo,
    Channel,
    Category,
    Sport,
    Login,
    ServicePack,
    Search,
    serviceRegistration,
    WatchMovie,
} from '~/pages';

//  Public router
const PublicRoutes = [
    { path: '/', component: Home, Layout: null },
    { path: '/channel', component: Channel, Layout: null },
    { path: '/hbo-go', component: Hbogo, Layout: null },
    { path: '/category', component: Category, Layout: null },
    { path: '/sport', component: Sport, Layout: null },
    { path: '/tim-kiem', component: Search, Layout: null },
    { path: '/login', component: Login, Layout: null },
    { path: '/service-pack', component: ServicePack, Layout: null },
    { path: '/dang-ky-dich-vu', component: serviceRegistration, Layout: null },
    { path: '/xem-phim', component: WatchMovie, Layout: null },
];

//  Private router
const PrivateRoutes = [];

export { PublicRoutes, PrivateRoutes };
