export interface User {
    userId: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    createdDataTime: Date;
    role: "Admin" | "User"
}