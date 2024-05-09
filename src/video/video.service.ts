import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model, Types } from 'mongoose';
import { Video, VideoDocument } from './video.schema';
import { VideoDto } from './dto/video.dto';
import { CommentDto } from './dto/comment.dto';
import { RatingDto } from './dto/rating.dto';
import { ReplyDto } from './dto/reply.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>,
  ) {}

  async createVideo(@Body() body: VideoDto) {
    try {
      await this.videoModel.create(body);
      return 'created successfully';
    } catch (error) {
      return error;
    }
  }

  async getVideos(
    title?: string,
    sortByRating?: 'asc' | 'desc',
  ): Promise<Video[]> {
    let query = {};

    if (title) {
      query = { title: { $regex: new RegExp(title, 'i') } };
    }

    let videos = await this.videoModel.find(query);

    if (sortByRating === 'asc') {
      videos = videos.sort((a, b) => a.averageRating - b.averageRating);
    } else if (sortByRating === 'desc') {
      videos = videos.sort((a, b) => b.averageRating - a.averageRating);
    }

    return videos;
  }

  async playVideo(id: string, userAge: number): Promise<string> {
    const video = await this.videoModel.findById(id);

    if (!video) throw new NotFoundException('Video not found');

    if (userAge < video.ageRestriction)
      throw new NotFoundException('Age restriction');

    return video.videoUrl;
  }

  async addComment(videoId: string, commentBody: CommentDto): Promise<string> {
    const video = await this.videoModel.findById(videoId);
    if (!video) {
      throw new NotFoundException('Video not found');
    }

    const newComment = {
      comment: commentBody?.comment,
    };

    video.comments.push(newComment);

    await video.save();

    return 'comment added';
  }

  async updateComment(
    videoId: string,
    commentId: string,
    commentDto: CommentDto,
  ): Promise<string> {
    const video = await this.videoModel.findById(videoId);

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    const commentIndex = video.comments.findIndex(
      (comment) => comment._id.toString() === commentId,
    );

    if (commentIndex === -1) {
      throw new NotFoundException('Comment not found');
    }

    video.comments[commentIndex].comment = commentDto.comment;

    await video.save();

    return 'comment Updated';
  }

  async addRating(videoId: string, ratingDto: RatingDto): Promise<string> {
    const { rating, userId } = ratingDto;
    const video = await this.videoModel.findById(videoId);
    if (!video) {
      throw new NotFoundException('Video not found');
    }

    video.ratings.push({ rating, userId });
    video.averageRating = (video.averageRating + rating) / 2;

    await video.save();

    return 'rating added';
  }

  async replyToComment(
    videoId: string,
    commentId: string,
    replyDto: ReplyDto,
  ): Promise<string> {
    const video = await this.videoModel.findById(videoId);

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    const commentIndex = video.comments.findIndex(
      (comment) => comment._id.toString() === commentId,
    );

    if (commentIndex === -1) {
      throw new NotFoundException('Comment not found');
    }

    video.comments[commentIndex].replies.push({
      reply: replyDto.reply,
    });

    await video.save();

    return 'reply submitted';
  }

  async getComments(videoId: string) {
    const video = await this.videoModel.findById(videoId);
    if (!video) {
      throw new NotFoundException('Video not found');
    }

    const sortedComments = video.comments.sort(
      (a, b) => (b.createdAt as any) - (a.createdAt as any),
    );

    sortedComments.forEach((comment) =>
      comment.replies.sort(
        (a, b) => (b.createdAt as any) - (a.createdAt as any),
      ),
    );

    return sortedComments;
  }
}
