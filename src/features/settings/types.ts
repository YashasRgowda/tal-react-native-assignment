export interface User {
  id: string;
  name: string;
  phone: string;
  avatarUrl: string;
  learningSince: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  value?: string;
  hasChevron: boolean;
}
