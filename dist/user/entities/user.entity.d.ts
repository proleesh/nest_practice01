export declare class User {
    id: number;
    username: string;
    password: string;
    nickname: string;
    validatePassword(password: string): Promise<boolean>;
}
