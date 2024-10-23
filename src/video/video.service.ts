import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  create(videoData: Partial<Video>) {
    const newVideo = this.videoRepository.create(videoData);
    return this.videoRepository.save(newVideo);
  }

  findAll() {
    return this.videoRepository.find();
  }
}
