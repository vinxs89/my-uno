import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undefined;
    SinglePlayerForm: undefined;
    MultiPlayerCreateForm: undefined;
    MultiPlayerJoinForm: undefined;
    MultiPlayerSelect: undefined;
    MultiPlayerWait: undefined;
    Settings: undefined;
    Game: undefined;
};

export type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type SinglePlayerFormRouteProp = RouteProp<RootStackParamList, 'SinglePlayerForm'>;
export type MultiPlayerCreateFormRouteProp = RouteProp<RootStackParamList, 'MultiPlayerCreateForm'>;
export type MultiPlayerJoinFormRouteProp = RouteProp<RootStackParamList, 'MultiPlayerJoinForm'>;
export type MultiPlayerSelectRouteProp = RouteProp<RootStackParamList, 'MultiPlayerSelect'>;
export type MultiPlayerWaitRouteProp = RouteProp<RootStackParamList, 'MultiPlayerWait'>;
export type SettingsRouteProp = RouteProp<RootStackParamList, 'Settings'>;
export type GameRouteProp = RouteProp<RootStackParamList, 'Game'>;

export type HomeNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Home'
>;
  
export type SinglePlayerFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SinglePlayerForm'
>;

export type MultiPlayerCreateFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MultiPlayerCreateForm'
>;

export type MultiPlayerJoinFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MultiPlayerJoinForm'
>;

export type MultiPlayerSelectNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MultiPlayerSelect'
>;

export type MultiPlayerWaitNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MultiPlayerWait'
>;

export type SettingsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;

export type GameNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Game'
>;