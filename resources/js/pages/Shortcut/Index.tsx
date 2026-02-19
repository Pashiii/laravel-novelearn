import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { shortcutsData } from '@/data/shortcuts';
import AppLayout from '@/layouts/app-layout';
import ShortcutPreview from '@/MyComponents/ShortcutPreview';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileType, FileX } from 'lucide-react';
import { useState } from 'react';

export default function Index() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Keyboard Shortcut',
            href: '/shortcuts',
        },
    ];
    const [activeTab, setActiveTab] = useState<'word' | 'excel'>('word');
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const sections = shortcutsData[activeTab];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shortcut" />

            <div className="mx-auto w-full max-w-6xl">
                <div className="flex flex-wrap items-center gap-6">
                    <div className="flex-shrink flex-grow basis-[5rem]">
                        <img
                            src="about-img.svg"
                            alt=""
                            className="h-100 w-full"
                        />
                    </div>
                    <div className="flex-shrink flex-grow basis-[5rem]">
                        <h1 className="text-center text-2xl">
                            Learn Keyboard Shortcuts!
                        </h1>
                        <p className="text py-4 text-lg/loose text-gray-500">
                            Mastering keyboard shortcuts can greatly enhance
                            productivity and efficiency. This section provides a
                            list of essential shortcuts to help you navigate and
                            operate smoothly, saving time on common tasks.{' '}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <div
                        className={`w-full cursor-pointer rounded-md border bg-gray-100 px-6 py-5 hover:shadow-xl ${activeTab === 'word' ? 'shadow-xl' : ''}`}
                        onClick={() => setActiveTab('word')}
                    >
                        <div className="flex items-center gap-2">
                            <FileType size={60} />
                            <div className="flex flex-col">
                                <span className="text-2xl font-medium">
                                    Microsoft Word
                                </span>
                                <span>Keyboard Shortcut</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`w-full cursor-pointer rounded-md border bg-gray-100 px-6 py-5 hover:shadow-xl ${activeTab === 'excel' ? 'shadow-xl' : ''}`}
                        onClick={() => setActiveTab('excel')}
                    >
                        <div className="flex items-center gap-2">
                            <FileX size={60} />
                            <div className="flex flex-col">
                                <span className="text-2xl font-medium">
                                    Microsoft Excel
                                </span>
                                <span>Keyboard Shortcut</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 space-y-5">
                    {sections.map((section, i) => (
                        <div key={i}>
                            <h1 className="text-xl font-medium">
                                {section.title}
                            </h1>
                            <div className="w-full overflow-hidden rounded-md border bg-white">
                                <Table className="w-full table-fixed">
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="w-[20%]">
                                                Shortcut
                                            </TableHead>
                                            <TableHead className="w-[60%]">
                                                Description
                                            </TableHead>
                                            <TableHead className="w-[5%]">
                                                *
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {section.items.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {item.key}
                                                </TableCell>
                                                <TableCell className="break-words whitespace-normal">
                                                    {item.desc}
                                                </TableCell>
                                                <TableCell>
                                                    <button
                                                        className="cursor-pointer text-blue-400 underline"
                                                        onClick={() =>
                                                            setSelectedKey(
                                                                item.img,
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedKey && (
                <ShortcutPreview
                    file_path={selectedKey}
                    onClose={() => setSelectedKey(null)}
                />
            )}
        </AppLayout>
    );
}
