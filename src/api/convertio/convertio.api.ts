import axios from 'axios';
import { iConvertioOutput, iConvertioRequestJobId } from './interface/convertio.interface';

export default class ConvertioAPIWrapper {
    private readonly baseURL = process.env.CONVERTIO_API_URL as string;

    async get({ id, type }: iConvertioRequestJobId): Promise<iConvertioOutput> {
        const response = await axios.get(`${this.baseURL}/convert/${id}/dl/${type}`);

        if (response.data.status === 'ok') {
            const content = Buffer.from(response.data.data.content, 'base64').toString();
            return { id: id, content: content };
        }

        throw new Error(`[${id}] ${response.data.error}`);
    }
}