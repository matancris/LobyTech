export type LayoutComponentType = 
  | 'AppWeather'
  | 'AppLocation'
  | 'AppClock'
  | 'AppLogo'
  | 'MediaVideo'
  | 'MediaImage'
  | 'ManagerMsgs'
  | 'NewsFlashes'
  | 'AppText'
  | 'CustomerLogo';

export interface LayoutSection {
  id: string;
  component: LayoutComponentType;
  props?: Record<string, any>;
}

export interface LayoutConfig {
  id: string;
  name: string;
  type: 'default' | 'grid' | 'list' | 'custom-1';
  sections: {
    top: LayoutSection[];
    left: LayoutSection[];
    right: LayoutSection[];
    bottom: LayoutSection[];
  };
} 