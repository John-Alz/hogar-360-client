import { faGauge, faGear, faHome, faLocationDot, faTag, faUsers } from "@fortawesome/free-solid-svg-icons";

export const navData = [
  {
    id: 1,
    icon: faGauge,
    label: 'Dashboard',
    link: '/admin/dashboard'
  },
  {
    id: 2,
    icon: faTag,
    label: 'Categorías',
    link: '/admin/categories'
  },
  {
    id: 3,
    icon: faLocationDot,
    label: 'Ubicaciones',
    link: '/admin/ubicaciones'
  },
  {
    id: 4,
    icon: faHome,
    label: 'Propiedades',
    link: '/admin/propiedades'
  },
  {
    id: 5,
    icon: faUsers,
    label: 'Usuarios',
    link: '/admin/usuarios'
  },
  {
    id: 6,
    icon: faGear,
    label: 'Configuración',
    link: '/admin/configuration'
  },
]
