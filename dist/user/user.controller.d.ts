import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: {
        username: string;
        password: string;
        nickname: string;
    }): Promise<import("./entities/user.entity").User>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
