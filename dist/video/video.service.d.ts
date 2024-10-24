import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
export declare class VideoService {
    private videoRepository;
    constructor(videoRepository: Repository<Video>);
    create(videoData: Partial<Video>): Promise<Video>;
    findAll(): Promise<Video[]>;
    findOne(id: number): Promise<{
        url: string;
        id: number;
        title: string;
        description: string;
        createAt: Date;
    }>;
}
