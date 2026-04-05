export enum UserRole {
  MESERO = 'MESERO',
  COCINERO = 'COCINERO',
  BARTENDER = 'BARTENDER',
}

export const ROLE_HOME_ROUTES: Record<UserRole, string> = {
  [UserRole.MESERO]: '/mesero',
  [UserRole.COCINERO]: '/cocina',
  [UserRole.BARTENDER]: '/barra',
};
