import { S3 } from 'aws-sdk';
import { StorageInterface } from 'src/storage/storage.interface';

export class AWSWrapper implements StorageInterface {
    private readonly awsAccessKey = process.env.AWS_ACCESS_KEY;
    private readonly awsSecretKey = process.env.AWS_SECRET_KEY;
    private readonly awsBucket = process.env.AWS_BUCKET;
    private readonly S3 = new S3({ accessKeyId: this.awsAccessKey, secretAccessKey: this.awsSecretKey });

    async getFile(key: string): Promise<Buffer> {
        const params = {
            Bucket: this.awsBucket,
            Key: key,
        };

        const data = await this.S3.getObject(params).promise();
        return data.Body as Buffer;
    }

    async uploadFile(key: string, file: Buffer): Promise<void> {
        const params = {
            Bucket: this.awsBucket,
            Key: key,
            Body: file,
        };

        await this.S3.upload(params).promise();
    }
}