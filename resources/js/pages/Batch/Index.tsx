import AppLayout from '@/layouts/app-layout';
import BatchCard from '@/MyComponents/BatchCard';
import { CreateBatchDialog } from '@/MyComponents/CreateBatchDialog';
import { Batch, Playlists, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Batch',
        href: '/batch',
    },
];

interface Props {
    batches: Batch[];
    playlists: Playlists[];
    tutors: {
        id: number;
        user: {
            name: string;
        };
    }[];
}

export default function Index({ batches, playlists, tutors }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Batch" />
            <div className="mx-auto w-full max-w-6xl">
                <div className="m-5">
                    <div className="mr-10 mb-5 flex justify-end">
                        <CreateBatchDialog
                            batches={batches}
                            playlists={playlists}
                            tutors={tutors}
                        />
                    </div>
                    <div className="grid auto-rows-fr gap-5 min-[490px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                        {batches.map((batch, index) => (
                            <BatchCard
                                batch={batch}
                                key={index}
                                playlists={playlists}
                                tutors={tutors}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
