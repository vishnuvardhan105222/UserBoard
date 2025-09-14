export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id: string;
}