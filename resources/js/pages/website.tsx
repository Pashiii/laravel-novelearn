import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
    CircleUser,
    MapPin,
    MessageCircleMore,
    MessageSquareText,
    Phone,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface WebContentProps {
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

export default function Website({ web_content }: WebContentProps) {
    const { auth } = usePage<SharedData>().props;

    window.addEventListener('scroll', function () {
        if (this.window.scrollY >= 50) {
            setScrollY(true);
        } else {
            setScrollY(false);
        }
    });

    const [modal, setModal] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [scrollY, setScrollY] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        number: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('messages.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setModal(false);
                toast.success('Message sent successfully');
            },
            onError: () => {
                toast.error('Failed to send message!');
            },
        });
    };
    return (
        <div>
            <Head title="NoveLearn">
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.css"
                />
            </Head>
            <div className="bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-white">
                <header
                    className={`header ${scrollY ? 'bg-header bg-white dark:bg-[#111010]' : 'bg-transparent'}`}
                    id="header"
                >
                    <nav className="nav container">
                        <a href="#" className="flex items-center gap-2">
                            <img src="logo.png" alt="" className="w-8" />
                            <span
                                className={`font-semibold ${scrollY ? 'dark:text-white' : ''}`}
                            >
                                NoveLearn
                            </span>
                        </a>
                        <div
                            className={`nav_menu dark:bg-black dark:text-white ${showNav ? 'show-menu right-0 bg-[#2D452F]' : 'right-[-100%]'}`}
                        >
                            <ul className="nav_list">
                                <li>
                                    <a
                                        href="#home"
                                        className="nav_link active-link"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#about" className="nav_link">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#services" className="nav_link">
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a href="#contacts" className="nav_link">
                                        Contact Us
                                    </a>
                                </li>
                                {auth.user ? (
                                    <li>
                                        <a
                                            href={`${auth.user.role == 'student' ? '/my-progress' : '/dashboard'}`}
                                            className="nav_link"
                                        >
                                            <CircleUser />
                                        </a>
                                    </li>
                                ) : (
                                    <li>
                                        <a href="/login" className="button">
                                            Login
                                        </a>
                                    </li>
                                )}
                            </ul>

                            <div className="nav_close" id="nav-close">
                                <i
                                    className="ri-close-large-line"
                                    onClick={() => setShowNav(false)}
                                ></i>
                            </div>
                        </div>
                        <div
                            className={`nav_toggle ${scrollY ? 'dark:text-white' : ''}`}
                            id="nav-toggle"
                        >
                            <i
                                className="ri-apps-2-line"
                                onClick={() => setShowNav(true)}
                            ></i>
                        </div>
                    </nav>
                </header>
                <main className="overflow-hidden">
                    <section
                        className="section home bg-[#2D452F] dark:bg-[#0a0a0a]"
                        id="home"
                    >
                        <div className="home_container container grid">
                            <div className="home_data">
                                <h1 className="home_title">
                                    Welcome to <br />
                                    NoveLearn!
                                </h1>
                                <p className="home_description mr-5">
                                    {web_content?.home_description}
                                </p>

                                <div className="home_buttons">
                                    {auth.user ? (
                                        <a
                                            href={`${auth.user.role == 'student' ? '/my-progress' : '/dashboard'}`}
                                            className="button"
                                        >
                                            {' '}
                                            Let's get started!
                                        </a>
                                    ) : (
                                        <a href="/login" className="button">
                                            {' '}
                                            Let's get started!
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="home_images">
                                <img
                                    src={`storage/${web_content?.image1}`}
                                    alt="image"
                                    className="home_img-1"
                                />
                                <img
                                    src={`storage/${web_content?.image2}`}
                                    alt="image"
                                    className="home_img-2"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="about section" id="about">
                        <div className="about_container container grid">
                            <div className="about_data">
                                <span className="section_subtitle text-center">
                                    About Us
                                </span>
                                <h2 className="section_title text-center">
                                    We'll help you enhance your Computer Skills!
                                </h2>
                                <p className="about_description">
                                    We strive to provide the best education to
                                    help you be familiar with using Computer.
                                </p>{' '}
                                <ul className="about_list grid gap-6">
                                    <li className="about_list-item">
                                        <i className="ri-checkbox-circle-line"></i>
                                        <span className="dark:text-white">
                                            {web_content?.skill1}
                                        </span>
                                    </li>
                                    <li className="about_list-item">
                                        <i className="ri-checkbox-circle-line"></i>
                                        <span className="dark:text-white">
                                            {web_content?.skill2}
                                        </span>
                                    </li>
                                    <li className="about_list-item">
                                        <i className="ri-checkbox-circle-line"></i>

                                        <span className="dark:text-white">
                                            {web_content?.skill3}
                                        </span>
                                    </li>
                                    <li className="about_list-item">
                                        <i className="ri-checkbox-circle-line"></i>

                                        <span className="dark:text-white">
                                            {web_content?.skill4}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="about_images">
                                <img
                                    src={`storage/${web_content?.image1}`}
                                    alt="image"
                                    className="about_img-1"
                                />
                                <img
                                    src={`storage/${web_content?.image2}`}
                                    alt="image"
                                    className="about_img-2"
                                />
                            </div>
                        </div>
                    </section>
                    <section className="section services" id="services">
                        <div className="services_container container grid">
                            <div className="services_data">
                                <div>
                                    <span className="section_subtitle">
                                        Our Services
                                    </span>
                                    <h2 className="section_title">
                                        Empowering You with Essential Tech
                                        Skills
                                    </h2>
                                </div>
                                <p className="services_description text-justify">
                                    {web_content?.services}
                                    <br />
                                    <br />
                                    {web_content?.services2}
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="contact section" id="contacts">
                        <div className="container">
                            <span className="section_subtitle">Contact Us</span>
                            <h2 className="section_title">
                                Write To Us and Join
                            </h2>
                            <div className="grid gap-6">
                                <img
                                    src={`storage/${web_content?.contact_image}`}
                                    alt=""
                                    className="contact_img"
                                />
                                <div className="contact_data grid">
                                    <div className="contact_card">
                                        <div className="contact_icon">
                                            <MapPin color="white" size={30} />
                                        </div>
                                        <h1 className="contact_title">
                                            We're here
                                        </h1>
                                        <address className="contact_info">
                                            {web_content?.address}
                                        </address>
                                    </div>
                                    <div className="contact_card">
                                        <div className="contact_icon">
                                            <Phone color="white" size={30} />
                                        </div>
                                        <h1 className="contact_title">
                                            Talk to me
                                        </h1>
                                        <div className="contact_info">
                                            <h1>{web_content?.admin_name}</h1>
                                            <span>
                                                {web_content?.admin_number}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="contact_card bg-white dark:bg-black">
                                        <div className="contact_icon">
                                            <MessageSquareText
                                                color="white"
                                                size={30}
                                            />
                                        </div>
                                        <h1 className="contact_title">
                                            Chat with us
                                        </h1>
                                        <div
                                            className="contact_social"
                                            onClick={() =>
                                                setModal((prev) => !prev)
                                            }
                                        >
                                            <MessageCircleMore className="contact_social-link" />
                                        </div>
                                    </div>
                                    <div className="contact_card">
                                        <h1 className="contact_title">
                                            Have questions or need assistance?
                                        </h1>
                                        <span className="contact_info">
                                            We're here to help you on your
                                            learning journey. Reach out to us
                                            today
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="contact_cointainer mapp grid gap-6">
                                <h2
                                    className="section_title"
                                    style={{ textAlign: 'center' }}
                                >
                                    Visit Us
                                </h2>
                                <h3
                                    className="contact_title"
                                    style={{ marginTop: '-20px' }}
                                >
                                    Noveleta Training Center Building
                                </h3>
                                <p
                                    className="contact_info text-center"
                                    style={{
                                        marginTop: '-30px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Poblacion St. Noveleta
                                </p>
                                <div className="map">
                                    <iframe
                                        src={web_content.map_url}
                                        width="600"
                                        height="450"
                                        loading="lazy"
                                        className="border-0"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </section>
                    {modal && (
                        <div id="chatModal" className="modal">
                            <div className="modal-content">
                                <span
                                    className="close"
                                    onClick={() => setModal(false)}
                                >
                                    &times;
                                </span>

                                <form onSubmit={handleSubmit}>
                                    <h3 className="text-[25px]">
                                        Get In Touch
                                    </h3>
                                    <p className="text-[20px]">
                                        Have questions or need more information
                                        about our courses? We’d love to hear
                                        from you!
                                    </p>
                                    <br />
                                    <Input
                                        type="text"
                                        placeholder="enter your name"
                                        required
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="box"
                                    />
                                    <Input
                                        type="number"
                                        minLength={0}
                                        maxLength={13}
                                        placeholder="enter your number"
                                        required
                                        name="number"
                                        className="box"
                                        value={data.number}
                                        onChange={(e) =>
                                            setData('number', e.target.value)
                                        }
                                    />
                                    <Textarea
                                        name="msg"
                                        className="box"
                                        placeholder="enter your message"
                                        required
                                        value={data.message}
                                        onChange={(e) =>
                                            setData('message', e.target.value)
                                        }
                                    />
                                    <button
                                        type="submit"
                                        className="inline-btn"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Sending...'
                                            : 'Send Message'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModal(false)}
                                        className="cancel-btn"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
