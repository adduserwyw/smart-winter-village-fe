import { Home,Phone, Info, BarChart2, User2,AudioLines } from 'lucide-react-native';

export const iconsCatalog = {
  Home: Home,
    Phone: Phone,
    Info: Info,
    BarChart2: BarChart2,
    User2: User2,
  AudioLines: AudioLines,
};

export type IconName = keyof typeof iconsCatalog;
