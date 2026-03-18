import axios from 'axios';

export const handleApiError = (error: unknown, defaultMessage: string = "Terjadi kesalahan pada sistem"): never => {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message || defaultMessage;
        throw new Error(message);
    }

    if (error instanceof Error) {
        throw error;
    }

    throw new Error(defaultMessage);
};
