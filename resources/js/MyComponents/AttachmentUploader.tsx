import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { SetDataAction } from '@inertiajs/react';
import {
    FileText,
    Image,
    Link as LinkIcon,
    Loader2,
    Video,
    X,
} from 'lucide-react';
import { useState } from 'react';

export interface Attachment {
    type: 'file' | 'image' | 'video' | 'link' | 'pdf';
    name: string;
    url: string;
}

interface Props {
    setData: SetDataAction<{
        title: string;
        type: string;
        instruction: string;
        thumb: File | null;
        files: File[];
        url: string[];
    }>;
    data: {
        title: string;
        type: string;
        instruction: string;
        thumb: File | null;
        files: File[];
        url: string[];
    };
}

export default function AttachmentUploader({ setData, data }: Props) {
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [addLinks, setAddLinks] = useState(false);
    const [url, setUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        setData('files', [...data.files, ...files]);
        setUploading(true);
        const newAttachments: Attachment[] = [];
        for (const file of files) {
            const type = file.type.startsWith('image/')
                ? 'image'
                : file.type.startsWith('video/')
                  ? 'video'
                  : file.type === 'application/pdf'
                    ? 'pdf'
                    : 'file';

            const tempUrl = URL.createObjectURL(file);
            newAttachments.push({
                type,
                name: file.name,
                url: tempUrl,
            });
        }

        setAttachments((prev) => [...prev, ...newAttachments]);
        setUploading(false);
    };

    const handleAddLink = () => {
        setData('url', [...data.url, url]);
        setAttachments((prev) => [...prev, { type: 'link', name: url, url }]);
        setAddLinks(false);
        setUrl('');
        console.log(data.url);
    };

    const removeAttachment = (index: number) => {
        setAttachments((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {/* Attachments Preview */}
            <div className="space-y-2">
                <div className="max-h-[12vh] space-y-2 overflow-auto">
                    {attachments.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-md border bg-white p-2 shadow-sm"
                        >
                            <div className="flex items-center gap-2">
                                {item.type === 'pdf' && (
                                    <FileText className="h-4 w-4 text-red-600" />
                                )}
                                {item.type === 'image' && (
                                    <Image className="h-4 w-4 text-yellow-500" />
                                )}
                                {item.type === 'video' && (
                                    <Video className="h-4 w-4 text-blue-600" />
                                )}
                                {item.type === 'link' && (
                                    <LinkIcon className="h-4 w-4 text-gray-500" />
                                )}
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate text-sm font-medium text-blue-700 hover:underline"
                                >
                                    {item.name.length > 50
                                        ? item.name.slice(0, 50) + '...'
                                        : item.name}
                                </a>
                            </div>

                            <button
                                type="button"
                                onClick={() => removeAttachment(index)}
                                className="rounded-full p-2 text-gray-500 hover:bg-gray-200"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {attachments.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-md border border-dashed py-10 text-gray-500">
                        <p className="text-sm">No attachments yet</p>
                    </div>
                )}
            </div>
            {addLinks && (
                <>
                    <Dialog open={addLinks} onOpenChange={setAddLinks}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add link</DialogTitle>
                                <DialogDescription>
                                    You must input a valid link (URL only).
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex items-center gap-2">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                        Link
                                    </Label>
                                    <Input
                                        id="link"
                                        type="url"
                                        placeholder="https://example.com"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button type="button" onClick={handleAddLink}>
                                    Add Link
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            )}
            <div className="flex flex-wrap items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-md border bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200">
                    <input
                        type="file"
                        multiple
                        accept="image/*,video/*,.pdf"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                    {uploading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />{' '}
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Image className="h-4 w-4" /> Upload Files/Videos
                        </>
                    )}
                </label>

                <Button
                    variant="outline"
                    type="button"
                    size="lg"
                    // onClick={handleAddLink}
                    onClick={() => setAddLinks((prev) => !prev)}
                    className="flex items-center gap-2"
                >
                    <LinkIcon className="h-4 w-4" /> Add Link
                </Button>
            </div>
        </div>
    );
}
