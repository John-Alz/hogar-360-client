import { faGauge, faGear, faHome, faLocationDot, faTag, faUsers } from "@fortawesome/free-solid-svg-icons";

export const navData = [
  {
    id: 1,
    icon: faGauge,
    label: 'Dashboard',
    link: '/dashboard'
  },
  {
    id: 2,
    icon: faTag,
    label: 'Categorías',
    link: '/categories'
  },
  {
    id: 3,
    icon: faLocationDot,
    label: 'Ubicaciones',
    link: '/ubicaciones'
  },
  {
    id: 4,
    icon: faHome,
    label: 'Propiedades',
    link: '/propiedades'
  },
  {
    id: 5,
    icon: faUsers,
    label: 'Usuarios',
    link: '/usuarios'
  },
  {
    id: 6,
    icon: faGear,
    label: 'Configuración',
    link: '/configuration'
  },
]
