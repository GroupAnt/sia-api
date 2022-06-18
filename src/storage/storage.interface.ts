export interface StorageInterface {
    getFile(key: string): Promise<Buffer>;
    uploadFile(key: string, file: Buffer): Promise<void>;
}