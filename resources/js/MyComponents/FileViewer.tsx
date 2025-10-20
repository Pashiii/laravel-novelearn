import { X } from 'lucide-react';

interface Props {
    file_path: string | null;
    onClose?: () => void;
}

const FileViewer = ({ file_path, onClose }: Props) => {
    const ext = file_path?.split('.').pop()?.toLowerCase() ?? '';

    if (!file_path) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="rounded-xl bg-white p-6 shadow-lg">
                    <p>No file selected.</p>
                </div>
            </div>
        );
    }
    const renderViewer = () => {
        if (!file_path) return <p>Unsupported file</p>;

        if (ext === 'pdf') {
            return (
                <iframe
                    src={file_path}
                    height="100%"
                    width="100%"
                    title="PDF Viewer"
                    className="rounded-md"
                ></iframe>
            );
        }

        if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) {
            return (
                <div className="flex h-full w-full items-center justify-center">
                    <video
                        controls
                        src={file_path}
                        className="max-h-[90vh] max-w-full rounded-md object-contain"
                        autoPlay
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        }

        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
            return (
                <div className="flex h-full w-full items-center justify-center">
                    <img
                        src={file_path}
                        alt="Preview"
                        className="max-h-[90vh] max-w-full rounded-md object-contain"
                    />
                </div>
            );
        }

        return <p>Unsupported file type: {file_path}</p>;
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl">
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 z-10 rounded-full p-2 text-white hover:bg-black/10"
                        aria-label="Close viewer"
                    >
                        <X />
                    </button>
                )}

                <div className="flex flex-1 items-center justify-center">
                    {renderViewer()}
                </div>
            </div>
        </div>
    );
};

export default FileViewer;
