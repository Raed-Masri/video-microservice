import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { VideosService } from './video.service';
import { VideoDto } from './dto/video.dto';
import { CommentDto } from './dto/comment.dto';
import { RatingDto } from './dto/rating.dto';
import { ReplyDto } from './dto/reply.dto';
import { AuthGuard } from 'src/auth/auth.guards';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() createVideoDto: VideoDto) {
    return this.videosService.createVideo(createVideoDto);
  }

  @Get()
  getVideos(
    @Query('title') title: string,
    @Query('sortByRating') sortByRating: 'asc' | 'desc',
  ) {
    return this.videosService.getVideos(title, sortByRating);
  }

  @UseGuards(AuthGuard)
  @Get('/play')
  playVideo(@Query('id') id: string, @Query('userAge') userAge: string) {
    return this.videosService.playVideo(id, parseInt(userAge));
  }

  @UseGuards(AuthGuard)
  @Post('/comments/:id')
  addComment(@Param('id') id: string, @Body() commentDto: CommentDto) {
    return this.videosService.addComment(id, commentDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/:commentId')
  updateComment(
    @Param('id') id: string,
    @Param('commentId') commentId: string,
    @Body() commentDto: CommentDto,
  ) {
    return this.videosService.updateComment(id, commentId, commentDto);
  }

  @UseGuards(AuthGuard)
  @Post('/rating/:id')
  addRating(@Param('id') id: string, @Body() ratingDto: RatingDto) {
    return this.videosService.addRating(id, ratingDto);
  }

  @UseGuards(AuthGuard)
  @Post(':id/comments/:commentId/reply')
  replyToComment(
    @Param('id') id: string,
    @Param('commentId') commentId: string,
    @Body() replyDto: ReplyDto,
  ) {
    return this.videosService.replyToComment(id, commentId, replyDto);
  }

  @UseGuards(AuthGuard)
  @Get('comments/:id')
  getComments(@Param('id') id: string) {
    return this.videosService.getComments(id);
  }
}
