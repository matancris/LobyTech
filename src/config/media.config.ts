import { MediaState } from '../types/Lobby';

export const DEFAULT_MEDIA_STATE: MediaState = {
    'lobby-ad-preview': {
        currMediaType: 'video',
        videoSrc: null,
        photoSrc: null,
        audioSrc: null
    },
    'main-page-preview': {
        currMediaType: 'image',
        videoSrc: null,
        photoSrc: null,
        audioSrc: null
    },
    'background-audio': {
        currMediaType: 'audio',
        videoSrc: null,
        photoSrc: null,
        audioSrc: null
    }
}; 