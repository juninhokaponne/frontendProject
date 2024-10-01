type loginProps = {
  email: string;
  password: string;
};

type registerProps = {
  name: string;
  email: string;
  password: string;
};

type updateUserProps = {
  name?: string;
  email?: string;
  password?: string;
  profileDetails: {
    bio?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: number;
  };
};

export type { loginProps, registerProps, updateUserProps };
