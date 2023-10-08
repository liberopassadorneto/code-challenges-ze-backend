import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MongoosePartnerDocument = HydratedDocument<MongoosePartner>;

@Schema()
export class MongoosePartner {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ required: true })
  tradingName: string;

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: true, unique: true })
  document: string;

  @Prop({
    type: {
      type: String,
      enum: ['MultiPolygon'],
      required: true,
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
    },
  })
  coverageArea: {
    type: 'MultiPolygon';
    coordinates: number[][][][];
  };

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  address: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export const MongoosePartnerSchema =
  SchemaFactory.createForClass(MongoosePartner);

MongoosePartnerSchema.index({ 'coverageArea.coordinates': '2dsphere' });
