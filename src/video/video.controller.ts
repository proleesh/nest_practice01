import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/videos',
        filename: (req, file, callback) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
      limits: {
        fileSize: 500 * 1024 * 1024,
      },
    }),
  )
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; description: string },
  ) {
    if (!file) {
      throw new HttpException('비디오 업로드 없음', HttpStatus.BAD_REQUEST);
    }

    const videoData = {
      title: body.title,
      description: body.description,
      url: `/uploads/videos/${file.filename}`,
    };
    return await this.videoService.create(videoData);
  }

  @Get()
  async findAll() {
    return await this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.videoService.findOne(+id);
  }
}
