import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@radix-ui/react-select';

export const BatchSkeleton = () => {
    return (
        <div className="mx-auto w-full max-w-4xl p-4">
            <Card>
                <CardHeader className="mt-5">
                    <div className="relative flex items-center justify-between">
                        <CardTitle className="absolute left-1/2 -translate-x-1/2">
                            <Skeleton className="h-4 w-40" />
                        </CardTitle>

                        <div className="ml-auto w-13">
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                    <Separator className="mt-2 border-1" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-3 w-40" />
                    <div className="mt-3 flex w-full flex-col items-center justify-center space-y-3">
                        <Skeleton className="h-3 w-60" />
                        <Skeleton className="h-3 w-50" />
                        <Skeleton className="h-3 w-40" />
                        <Skeleton className="h-3 w-40" />
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <CardTitle>
                        <Skeleton className="h-5 w-40" />
                    </CardTitle>
                    <Separator className="mt-2 w-full border-1" />
                    <Skeleton className="h-30 w-full" />
                </CardFooter>
            </Card>
        </div>
    );
};
