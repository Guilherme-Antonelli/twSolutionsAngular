export interface UserInterface {
    id?: string;
    name: string;
    cpf: string;
    email: string;
    password: string;
    created?: Date;
    updated?: Date;
    deletedAt?: Date;
}
