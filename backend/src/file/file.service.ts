import { Injectable, UploadedFiles } from '@nestjs/common';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import * as AWS from 'aws-sdk';

@Injectable()
export class FileService {
  Bucket;

  constructor() {
    this.Bucket = new AWS.S3({
      region: process.env.region,
      accessKeyId: process.env.access_key_bucket,
      secretAccessKey: process.env.secret_access_key_bucket,
    });
  }

  async uploadFile(
    @UploadedFiles()
    file,
  ): Promise<ManagedUpload.SendData> {
    try {
      const filePath = FileService.filePathBuilder(file.originalname);

      const bucketUpload = await this.Bucket.upload({
        Bucket: process.env.bucket_name,
        Body: file.buffer,
        Key: filePath,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }).promise();
      // promise() must have!!!!!!!!.....;

      return bucketUpload;
    } catch (e) {
      console.log(e);
    }
  }

  private static filePathBuilder(fileName: string): string {
    try {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return `avatar/${randomName}${fileName}`;
    } catch (e) {
      console.log(e);
    }
  }
}
