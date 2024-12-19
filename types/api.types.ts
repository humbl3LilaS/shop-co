export interface IProduct {
    id: string;
    name: string;
    price: number;
    discount: number | null;
    description: string;
    coverImage: string;
    arrivedAt: Date;
}

export interface IReview {
    id: string;
    content: string;
    userName: string | null;
    rating: number;
    createdAt: Date;
}

export interface IUserInfo {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    profileImage: string | null;
    state: string | null;
    township: string | null;
    address: string | null;
    postalCode: string | null;
    phoneNumber:string | null;
    gender: string | null;
}


