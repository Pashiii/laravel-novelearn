export const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="animate-bounce">
                <img src="logo.png" width={100} />
            </div>
        </div>
    );
};
