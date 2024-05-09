import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Date, Document, ObjectId, Types } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  duration: string;

  @Prop()
  ageRestriction: number;

  @Prop()
  averageRating: number;

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, default: new Types.ObjectId() },
        createdAt: { type: Date, default: Date.now },
        userId: String,
        rating: Number,
      },
    ],
  })
  ratings: {
    _id?: Types.ObjectId;
    createdAt?: Date;
    userId: String;
    rating: Number;
  }[];

  @Prop()
  videoUrl: string;

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, default: new Types.ObjectId() },
        comment: { type: String },
        replies: [
          {
            reply: { type: String },
            createdAt: { type: Date, default: Date.now },
          },
        ],
        createdAt: { type: Date, default: Date.now },
      },
    ],
  })
  comments: {
    _id?: Types.ObjectId;
    comment: string;
    replies?: { reply: string; createdAt?: Date }[];
    createdAt?: Date;
  }[];
}

export const VideoSchema = SchemaFactory.createForClass(Video);
