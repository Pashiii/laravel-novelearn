import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Playlists {
    id: number;
    title: string;
    course_id: string;
    description: string;
    thumb?: string;
    hours: number;
    created_at: string;
    lesson_count: number;
}
export interface Lesson {
    id: number;
    playlist_id: number;
    title: string;
    description?: string;
    thumb?: string;
    created_at?: string;
    updated_at?: string;
}
export interface FileItem {
    id: number;
    file_name: string;
    file_path: string;
    file_type: string;
}

export interface SubLesson {
    id: number;
    lesson_id: number;
    title: string;
    instruction?: string;
    thumb?: string;
    files?: FileItem[];
    type: string;
    url?: string[];
    created_at?: string;
    updated_at?: string;
}

export interface Batch{
    id: number;
    course_id: string;
    batch_number: string;
    course_title: string;
    tutor_id: string;
    schedule: string[];
    start_time: string;
    end_time: string;
    status: boolean;
    tutor?: {
        id: number;
        first_name: string,
        last_name: string,
        middle_name: string,
    }
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
