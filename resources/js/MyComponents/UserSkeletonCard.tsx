import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const UserSkeletonCard = () => {
    const placeholders = Array.from({ length: 6 });
    return (
        <div className="mx-auto w-full max-w-6xl">
            <div className="m-5">
                <div className="mr-10 mb-5 flex justify-end">
                    <Skeleton className="h-12 w-55" />
                </div>
                <div className="relative my-5 mr-auto flex h-12 w-full max-w-xl gap-2">
                    <Skeleton className="h-full w-full border-1 bg-white pl-10" />
                    <Skeleton className="h-full w-40" />
                </div>
                <div className="grid auto-rows-fr gap-5 min-[490px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                    {placeholders.map((_, index) => (
                        <Card
                            className="overflow-hidden shadow-md transition hover:shadow-lg"
                            key={index}
                        >
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 overflow-hidden rounded-full">
                                        <Skeleton
                                            className="h-full"
                                            key={index}
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-2/3" />
                                        <Skeleton className="h-3 w-1/2" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-9 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

//     // We'll render 6 skeleton cards for loading placeholder
//     const placeholders = Array.from({ length: 6 });

//     return (
//         <div className="mx-auto w-full max-w-6xl">
//             <div className="m-5">
//                 <div className="grid auto-rows-fr gap-5 min-[490px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
//                     {placeholders.map((_, index) => (
//                         <div
//                             key={index}
//                             className="animate-pulse overflow-hidden rounded-lg border bg-white p-4 shadow-md"
//                         >
//                             {/* Avatar */}
//                             <div className="mb-4 flex items-center gap-3">
//                                 <div className="h-12 w-12 rounded-full bg-gray-300"></div>
//                                 <div className="flex-1 space-y-2">
//                                     <div className="h-4 w-3/4 rounded bg-gray-300"></div>
//                                     <div className="h-3 w-1/2 rounded bg-gray-300"></div>
//                                 </div>
//                             </div>
//                             {/* Button placeholder */}
//                             <div className="mt-4 h-10 w-full rounded bg-gray-300"></div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };
