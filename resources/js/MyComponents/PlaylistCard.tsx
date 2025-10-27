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
        can: {
            createPlaylist: boolean;
            deletePlaylist: boolean;
            updatePlaylist: boolean;
        };
    };
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, auth }) => {
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
            <Link
                href={route('lesson.index', {
                    id: playlist.id,
                })}
            >
                <Button className="w-full bg-green-900 text-white">View</Button>
            </Link>
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
