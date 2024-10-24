import { VideoService } from './video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    uploadVideo(file: Express.Multer.File, body: {
        title: string;
        description: string;
    }): Promise<import("./entities/video.entity").Video>;
    findAll(): Promise<import("./entities/video.entity").Video[]>;
    findOne(id: string): Promise<import("./entities/video.entity").Video>;
}
