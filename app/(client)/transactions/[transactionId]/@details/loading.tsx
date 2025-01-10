const Loading = () => {
    return (
        <div className={"mt-8 border border-black/40 p-4 rounded-lg"}>
            <h3 className={"mb-4 font-bold"}>Order Details</h3>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Region: </span>
                <span>...</span>
            </p>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Township: </span>
                <span>...</span>
            </p>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Address: </span>
                <span>...</span>
            </p>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Postal Number: </span>
                <span>...</span>
            </p>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Phone Number: </span>
                <span>...</span>
            </p>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Email: </span>
                <span>...</span>
            </p>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Ordered Date: </span>
                <span>...</span>
            </p>
            <p>
                <span className={"font-bold text-black/60"}>Status: </span>
                <span className={"px-3 py-1 rounded-3xl text-white capitalize font-semibold"}>
                    ...
                </span>
            </p>
        </div>
    );
};

export default Loading;
