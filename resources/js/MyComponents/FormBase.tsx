import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { dateFormat } from '@/utils/dateFormat';
import { SetDataAction } from '@inertiajs/react';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    data: {
        first_name: string;
        middle_name: string;
        last_name: string;
        region: string;
        province: string;
        city: string;
        barangay: string;
        street: string;
        district: string;
        email: string;
        contact_number: string;
        nationality: string;
        sex: string;
        civil_status: string;
        date_of_birth: string;
        birth_region: string;
        birth_province: string;
        birth_city: string;
        image: File | null;
    };
    setData: SetDataAction<{
        first_name: string;
        middle_name: string;
        last_name: string;
        region: string;
        province: string;
        city: string;
        barangay: string;
        street: string;
        district: string;
        email: string;
        contact_number: string;
        nationality: string;
        sex: string;
        civil_status: string;
        date_of_birth: string;
        birth_region: string;
        birth_province: string;
        birth_city: string;
        image: File | null;
    }>;
    edit?: boolean;
}

interface PSGC {
    name: string;
    code: string;
}

export const FormBase = ({ data, setData, edit = false }: Props) => {
    const [date, setDate] = useState<Date>();
    const [regions, setRegions] = useState<PSGC[]>([]);
    const [provinces, setProvinces] = useState<PSGC[]>([]);
    const [citites, setCities] = useState<PSGC[]>([]);
    const [barangays, setBarangays] = useState<PSGC[]>([]);
    useEffect(() => {
        fetch('/psgc/regions')
            .then((res) => res.json())
            .then(setRegions);
    }, []);

    useEffect(() => {
        if (data.region) {
            const NCR_CODE = '1300000000';

            if (data.region === NCR_CODE) {
                fetch(`/psgc/provinces/${NCR_CODE}/cities`)
                    .then((res) => res.json())
                    .then((cities) => {
                        setProvinces([]);
                        setCities(cities);
                        console.log(cities);
                    });
            } else {
                fetch(`/psgc/regions/${data.region}/provinces`)
                    .then((res) => res.json())
                    .then((provinces) => {
                        setProvinces(provinces);
                        setCities([]);
                    });
            }
        }
    }, [data.region]);
    useEffect(() => {
        if (data.province) {
            fetch(`/psgc/provinces/${data.province}/cities`)
                .then((res) => res.json())
                .then(setCities);
        }
    }, [data.province]);

    useEffect(() => {
        if (data.city) {
            fetch(`/psgc/cities/${data.city}/barangays`)
                .then((res) => res.json())
                .then(setBarangays);
        }
    }, [data.city]);
    return (
        <>
            {/* Full Name */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div>
                    <Label>
                        First Name <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        placeholder="enter first name"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                    />
                </div>
                <div>
                    <Label>Middle Name</Label>
                    <Input
                        placeholder="enter middle name"
                        value={data.middle_name}
                        onChange={(e) => setData('middle_name', e.target.value)}
                    />
                </div>
                <div>
                    <Label>
                        Last Name <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        placeholder="enter last name"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                    />
                </div>
            </div>
            {/* Complete Address */}
            <div className="mt-6">
                <Label className="font-semibold">Complete Address</Label>
                <div className="mt-2 grid gap-4 sm:grid-cols-3">
                    <div>
                        <Label>
                            Region <span className="text-red-600">*</span>
                        </Label>
                        <Select
                            defaultValue={data.region}
                            onValueChange={(value) => {
                                setData('region', value);
                                setData('province', '');
                                setData('city', '');
                                setData('barangay', '');
                                setCities([]);
                                setBarangays([]);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={
                                        data.region
                                            ? data.region
                                            : 'select region'
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {regions.map((region) => (
                                    <SelectItem
                                        key={region.code}
                                        value={region.code}
                                    >
                                        {region.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {data.region === '1300000000' ? (
                        <div>
                            <Label>Province</Label>
                            <Input
                                value="N/A"
                                disabled
                                className="bg-gray-100 text-gray-500"
                            />
                        </div>
                    ) : (
                        <div>
                            <Label>
                                Province <span className="text-red-600">*</span>
                            </Label>
                            <Select
                                defaultValue={data.province}
                                onValueChange={(value) => {
                                    setData('province', value);
                                    setData('city', '');
                                    setData('barangay', '');
                                    setBarangays([]);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={
                                            data.province
                                                ? data.province
                                                : 'select province'
                                        }
                                    />
                                </SelectTrigger>

                                <SelectContent>
                                    {provinces.map((province) => (
                                        <SelectItem
                                            key={province.code}
                                            value={province.code}
                                        >
                                            {province.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div>
                        <Label>
                            City/Municipality{' '}
                            <span className="text-red-600">*</span>
                        </Label>
                        <Select
                            defaultValue={data.city}
                            onValueChange={(value) => {
                                setData('city', value);
                                setData('barangay', '');
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={
                                        data.city
                                            ? data.city
                                            : 'select city/municipality'
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {citites.map((city) => (
                                    <SelectItem
                                        key={city.code}
                                        value={city.code}
                                    >
                                        {city.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>
                            Barangay <span className="text-red-600">*</span>
                        </Label>
                        <Select
                            defaultValue={data.barangay}
                            onValueChange={(value) =>
                                setData('barangay', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={
                                        data.barangay
                                            ? data.barangay
                                            : 'select barangay'
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {barangays.map((barangay) => (
                                    <SelectItem
                                        key={barangay.code}
                                        value={barangay.code}
                                    >
                                        {barangay.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Street</Label>
                        <Input
                            placeholder="street"
                            value={data.street}
                            onChange={(e) => setData('street', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>District</Label>
                        <Input
                            placeholder="district"
                            value={data.district}
                            onChange={(e) =>
                                setData('district', e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
            {/* Contact Info */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div>
                    <Label>
                        Email <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        placeholder="enter your email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </div>
                <div>
                    <Label>
                        Contact Number <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        placeholder="09xxxxxxxxx"
                        value={data.contact_number}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (
                                /^(?:\+63|0)\d{0,10}$/.test(value) ||
                                value === ''
                            ) {
                                setData('contact_number', value);
                            }
                        }}
                        maxLength={13}
                    />
                </div>
                <div>
                    <Label>
                        Nationality <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        placeholder="nationality"
                        value={data.nationality}
                        onChange={(e) => setData('nationality', e.target.value)}
                    />
                </div>
            </div>
            {/*Personal Info */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div>
                    <Label>
                        Sex <span className="text-red-600">*</span>
                    </Label>

                    <Select
                        key={data.sex}
                        defaultValue={data.sex}
                        onValueChange={(value) => setData('sex', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="select sex" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>
                        Civil Status <span className="text-red-600">*</span>
                    </Label>
                    <Select
                        defaultValue={data.civil_status || ''}
                        key={data.civil_status}
                        onValueChange={(value) =>
                            setData('civil_status', value)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="select civil status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                            <SelectItem value="divorced">Divoreced</SelectItem>
                            <SelectItem value="annulled">Anulled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>
                        Date of Birth <span className="text-red-600">*</span>
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {data.date_of_birth
                                    ? dateFormat(data.date_of_birth)
                                    : 'mm / dd / yyyy'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                        >
                            <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                onSelect={(selectedDate) => {
                                    setDate(selectedDate);
                                    if (selectedDate) {
                                        setData(
                                            'date_of_birth',
                                            selectedDate.toLocaleDateString(),
                                        );
                                    }
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            {/* Birth Info */}
            <div className="mt-6">
                <Label className="font-semibold">Place of Birth</Label>
                <div className="mt-2 grid gap-4 sm:grid-cols-3">
                    {/*
                    <Label>Age <span className="text-red-600">*</span></Label>
                    <Input placeholder="age" />
                */}

                    <div>
                        <Label>
                            Region <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            placeholder="region"
                            value={data.birth_region}
                            onChange={(e) =>
                                setData('birth_region', e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <Label>
                            Province <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            placeholder="province"
                            value={data.birth_province}
                            onChange={(e) =>
                                setData('birth_province', e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <Label>
                            City/Municipality{' '}
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            placeholder="city/municipality"
                            value={data.birth_city}
                            onChange={(e) =>
                                setData('birth_city', e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
