import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    const video = await this.videoRepository.findOneBy({id});
    if (!video) {
      throw new NotFoundException(`ID: ${id} 비디오 없음`);
    }
    return video;
  }
}
