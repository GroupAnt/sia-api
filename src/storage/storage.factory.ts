import { AWSWrapper } from "src/api/aws/aws.api";

export class StorageFactory {
    static getService(name: string) {
        if (name === 'aws') {
            return new AWSWrapper();
        }
    }
}