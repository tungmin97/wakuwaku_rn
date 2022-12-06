export interface SetUserProps {
  uid: string;
  username: string | null;
  avatar?: string;
  email?: string;
  password?: string;
}

export interface SetUserSocialProps {
  uid: string;
  username: string | null;
  avatar: string | null;
}