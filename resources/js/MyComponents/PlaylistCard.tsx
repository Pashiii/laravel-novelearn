import { Button } from '@/components/ui/button';
import { Playlists } from '@/types';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { DeleteAlert } from './DeleteAlert';
import ReusableCard from './ReusableCard';
import { UpdatePlaylistDialog } from './UpdatePlaylistDialog';

interface PlaylistCardProps {
    playlist: Playlists;
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
        } | null;
        can: {
            createPlaylist: boolean;
            deletePlaylist: boolean;
            updatePlaylist: boolean;
        };
    };
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, auth }) => {
    const isAdmin = auth.user?.role === 'admin';
    const isStudent = auth.user?.role === 'student';
    const isTeacher = auth.user?.role === 'teacher';
    const enrolledBatches = playlist.batches ?? [];

    const canViewCourse = !isStudent || enrolledBatches.length > 0;

    const PlaylistActions = (
        <>
            <div className="grid grid-cols-2 gap-2">
                {auth.can.updatePlaylist && (
                    <UpdatePlaylistDialog playlist={playlist} />
                )}
                {auth.can.deletePlaylist && (
                    <DeleteAlert data={playlist} routeName="playlist.destroy" />
                )}
            </div>
            {/* Student Batch Selection Logic */}
            {isStudent && (
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                        Your Batches
                    </p>
                    {enrolledBatches.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                            {enrolledBatches.map((batch) => (
                                <Link
                                    key={batch.id} // Use ID for database lookups
                                    href={route('lesson.index', {
                                        playlist: playlist.id,
                                        batchId: batch.id, // <--- Passing Batch Context
                                    })}
                                    className="rounded bg-green-100 px-2 py-1 text-xs text-green-800 transition hover:bg-green-200"
                                >
                                    Batch {batch.batch_number}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <span className="text-xs text-gray-400 italic">
                            Not enrolled in any batch
                        </span>
                    )}
                </div>
            )}

            {/* Admin "Template" View Button */}
            {isAdmin && (
                <Link
                    href={route('lesson.index', {
                        playlist: playlist.id,
                    })}
                >
                    <Button className="w-full bg-green-900 text-white">
                        View Content
                    </Button>
                </Link>
            )}

            {/* Fallback View for Teachers/Others who aren't students but aren't admins */}
            {!isStudent && !isAdmin && canViewCourse && (
                <Link href={route('lesson.index', { playlist: playlist.id })}>
                    <Button className="w-full bg-green-900 text-white">
                        View Content
                    </Button>
                </Link>
            )}
            {isTeacher && (
                <div className="mt-5 flex flex-col gap-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                        Your Batches
                    </p>
                    {enrolledBatches.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                            {enrolledBatches.map((batch) => (
                                <Link
                                    key={batch.id} // Use ID for database lookups
                                    href={route('lesson.index', {
                                        playlist: playlist.id,
                                        batchId: batch.id, // <--- Passing Batch Context
                                    })}
                                    className="rounded bg-green-100 px-2 py-1 text-xs text-green-800 transition hover:bg-green-200"
                                >
                                    Batch {batch.batch_number}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <span className="text-xs text-gray-400 italic">
                            No batch assigned
                        </span>
                    )}
                </div>
            )}
        </>
    );
    return (
        <ReusableCard
            actions={PlaylistActions}
            title={playlist.title}
            description={playlist.description}
            thumbnail={playlist.thumb}
        />
    );
};

export default PlaylistCard;
