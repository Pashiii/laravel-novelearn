import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Web Content',
        href: '/web-content',
    },
];

interface Props {
    web_content: {
        home_description: string;
        image1: string;
        image2: string;
        skill1: string;
        skill2: string;
        skill3: string;
        skill4: string;
        services: string;
        services2: string;
        admin_number: string;
        admin_name: string;
        address: string;
        contact_image: string;
        map_url: string;
    };
}

export default function Index({ web_content }: Props) {
    const { data, setData, post, processing, reset } = useForm({
        home_description: web_content?.home_description || '',
        image1: null as File | null,
        image2: null as File | null,
        skill1: web_content?.skill1 || '',
        skill2: web_content?.skill2 || '',
        skill3: web_content?.skill3 || '',
        skill4: web_content?.skill4 || '',
        services: web_content?.services || '',
        services2: web_content?.services2 || '',
        admin_number: web_content?.admin_number || '',
        admin_name: web_content?.admin_name || '',
        address: web_content?.address || '',
        contact_image: null as File | null,
        map_url: web_content?.map_url || '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('web-content.update'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Web content update successfully!');
                reset();
            },
            onError: () => {
                toast.error('Failed to update!');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Web Content" />
            <div className="mx-auto w-full max-w-4xl">
                <div className="m-5">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-xl">
                                Web Content Management
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <Label>Home Description</Label>
                                    <Textarea
                                        placeholder="Enter home description"
                                        required
                                        value={data.home_description}
                                        onChange={(e) =>
                                            setData(
                                                'home_description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Image 1</Label>
                                        <img
                                            src={`${data?.image1 ? URL.createObjectURL(data?.image1) : `storage/${web_content?.image1}`}`}
                                            alt=""
                                            className="my-2 w-full"
                                        />
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setData(
                                                    'image1',
                                                    e.target.files?.[0] ?? null,
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Image 2</Label>
                                        <img
                                            src={`${data?.image2 ? URL.createObjectURL(data?.image2) : `storage/${web_content?.image2}`}`}
                                            alt=""
                                            className="my-2 w-full"
                                        />
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setData(
                                                    'image2',
                                                    e.target.files?.[0] ?? null,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h1 className="text-lg font-bold">
                                        About Us Section
                                    </h1>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Skill 1</Label>
                                        <Input
                                            placeholder="Enter skill 1"
                                            required
                                            value={data.skill1}
                                            onChange={(e) =>
                                                setData(
                                                    'skill1',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Skill 2</Label>
                                        <Input
                                            placeholder="Enter skill 2"
                                            required
                                            value={data.skill2}
                                            onChange={(e) =>
                                                setData(
                                                    'skill2',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Skill 3</Label>
                                        <Input
                                            placeholder="Enter skill 3"
                                            required
                                            value={data.skill3}
                                            onChange={(e) =>
                                                setData(
                                                    'skill3',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Skill 4</Label>
                                        <Input
                                            placeholder="Enter skill 4"
                                            required
                                            value={data.skill4}
                                            onChange={(e) =>
                                                setData(
                                                    'skill4',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Label>Services Paragraph 1</Label>
                                    <Textarea
                                        placeholder="Enter sercives paragraph 1"
                                        required
                                        value={data.services}
                                        onChange={(e) =>
                                            setData('services', e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mt-6">
                                    <Label>Services Paragraph 2</Label>
                                    <Textarea
                                        placeholder="Enter services paragraph 2"
                                        required
                                        value={data.services2}
                                        onChange={(e) =>
                                            setData('services2', e.target.value)
                                        }
                                    />
                                </div>
                                <div className="pt-5">
                                    <h1 className="text-lg font-bold">
                                        Contact Us Section
                                    </h1>
                                </div>
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Admin Contact Number</Label>
                                        <Input
                                            placeholder="Enter contact number"
                                            required
                                            value={data.admin_number}
                                            onChange={(e) =>
                                                setData(
                                                    'admin_number',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Admin Name</Label>
                                        <Input
                                            placeholder="Enter admin name"
                                            required
                                            value={data.admin_name}
                                            onChange={(e) =>
                                                setData(
                                                    'admin_name',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Label>Address</Label>
                                    <Input
                                        placeholder="Enter address"
                                        required
                                        value={data.address}
                                        onChange={(e) =>
                                            setData('address', e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mt-6">
                                    <Label>Contanct Image</Label>
                                    <img
                                        src={`${data?.contact_image ? URL.createObjectURL(data?.contact_image) : `storage/${web_content?.contact_image}`}`}
                                        alt=""
                                        className="my-2 w-100"
                                    />
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData(
                                                'contact_image',
                                                e.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                </div>
                                <div className="mt-6">
                                    <Label>Map URL</Label>
                                    <Textarea
                                        placeholder="Enter Map URL"
                                        required
                                        value={data.map_url}
                                        onChange={(e) =>
                                            setData('map_url', e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mt-6">
                                    <Button
                                        className="w-full bg-green-900 hover:bg-green-800"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? `Updating...`
                                            : `Update Content`}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
