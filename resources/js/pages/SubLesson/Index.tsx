import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import FileViewer from '@/MyComponents/FileViewer';
import { SubLesson, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Album,
    FileText,
    Image,
    LinkIcon,
    SquareChartGantt,
    Video,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'View Content',
        href: '',
    },
];

interface Props {
    subLesson: SubLesson;
}

export default function Index({ subLesson }: Props) {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const getFileIcon = (type: string) => {
        const ext = type?.split('.').pop()?.toLowerCase() ?? '';

        if (ext.includes('pdf'))
            return <FileText className="h-4 w-4 text-red-600" />;
        if (['mp4', 'webm', 'ogg', 'mov'].includes(ext))
            return <Image className="h-4 w-4 text-yellow-500" />;
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext))
            return <Video className="h-4 w-4 text-blue-600" />;
        if (type === 'link')
            return <LinkIcon className="h-4 w-4 text-gray-500" />;
        return <FileText className="h-4 w-4 text-gray-500" />;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="View Content" />
            <div className="mx-auto w-full max-w-6xl p-4">
                <div className="flex flex-wrap items-start gap-2 lg:p-4">
                    <Card className="flex-shrink flex-grow basis-[40rem]">
                        <CardHeader className="mt-5">
                            <div className="flex items-center gap-2">
                                {subLesson.type == 'Module' ? (
                                    <Album
                                        size={40}
                                        color="white"
                                        className="rounded-full bg-gray-500 p-2"
                                    />
                                ) : (
                                    <SquareChartGantt
                                        size={40}
                                        color="white"
                                        className="rounded-full bg-gray-500 p-2"
                                    />
                                )}

                                <CardTitle className="text-xl sm:text-3xl">
                                    {subLesson.title}
                                </CardTitle>
                            </div>

                            <CardDescription className="whitespace-pre-wrap sm:text-lg">
                                {subLesson.instruction}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="mt-5 space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                                {subLesson.files?.map((file, index) => (
                                    <div
                                        className="flex items-center gap-2 rounded-lg border-1 p-2 shadow-border hover:shadow-md"
                                        key={index}
                                    >
                                        {getFileIcon(file.file_name)}
                                        <button
                                            className="w-full cursor-pointer truncate text-left"
                                            type="button"
                                            onClick={() =>
                                                setSelectedFile(
                                                    import.meta.env
                                                        .VITE_AWS_URL +
                                                        '/' +
                                                        file.file_path,
                                                )
                                            }
                                        >
                                            {file.file_name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex-shrink flex-grow basis-[10rem]">
                        <CardHeader>
                            <CardTitle>Submit Your Activity:</CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                </div>
            </div>
            {selectedFile && (
                <FileViewer
                    file_path={selectedFile}
                    onClose={() => setSelectedFile(null)}
                />
            )}
        </AppLayout>
    );
}
