import {
  aminoAcids,
  intraWorkout,
  preWorkout,
  proteinPowder,
  weightManagement,
} from '../../assets';

export const goalCards = [
  {
    label: 'protein powder',
    id: 'protein-powder',
    image: proteinPowder,
    href: '/collections/protein-powder',
  },
  {
    label: 'pre-workout',
    id: 'pre-workout',
    image: preWorkout,
    href: '/collections/pre-workout',
  },
  {
    label: 'intra-workout',
    id: 'intra-workout',
    image: intraWorkout,
    href: '/collections/intra-workout',
  },
  {
    label: 'amino acids',
    id: 'amino-acids',
    image: aminoAcids,
    href: '/collections/amino-acids',
  },
  {
    label: 'weight management',
    id: 'weight-management',
    image: weightManagement,
    href: '/collections/weight-management',
  },
];
