import React from 'react';

interface UploadProgressProps {
    progress: number;
    isUploading: boolean;
    onCancel?: () => void;
    error?: string | null;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
    progress,
    isUploading,
    onCancel,
    error
}) => {
    if (!isUploading && !error) return null;

    return (
        <div className="upload-progress-overlay">
            {isUploading && (
                <div className="upload-progress-container">
                    <div className="upload-progress-text">
                        Uploading file... {progress.toFixed(1)}%
                    </div>
                    <div className="progress-bar">
                        <div 
                            className="progress-bar-fill" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    {onCancel && (
                        <button 
                            className="cancel-upload-btn" 
                            onClick={onCancel}
                        >
                            Cancel Upload
                        </button>
                    )}
                </div>
            )}
            {error && <div className="upload-error">{error}</div>}
        </div>
    );
}; 