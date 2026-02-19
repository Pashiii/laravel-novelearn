import { X } from 'lucide-react';

interface Props {
    file_path: string | null;
    onClose?: () => void;
}

const ShortcutPreview = ({ file_path, onClose }: Props) => {
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
                    <div className="flex h-full w-full items-center justify-center">
                        <img
                            src={file_path}
                            alt="Preview"
                            className="max-h-[90vh] max-w-full rounded-md object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShortcutPreview;
