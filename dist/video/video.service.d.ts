import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
export declare class VideoService {
    private videoRepository;
    constructor(videoRepository: Repository<Video>);
    create(videoData: Partial<Video>): Promise<Video>;
    findAll(): Promise<Video[]>;
    findOne(id: number): Promise<Video>;
}
