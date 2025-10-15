import Logo from '../../../public/logo.png';
export default function AppLogo() {
    return (
        <>
            <img src={Logo} alt="" className="size-7 fill-current" />

            <div className="grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate font-bold">NoveLearn</span>
            </div>
        </>
    );
}
