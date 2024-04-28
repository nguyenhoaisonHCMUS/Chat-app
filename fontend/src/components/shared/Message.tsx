import { useSelector } from "react-redux";

function Message() {
    const user = useSelector(())

    const chatClassName = fromMe ? "chat-end" : "chat-start";
    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={profilePic}
                    />
                </div>
            </div>
            <div
                className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
            >
                {message.message}
            </div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
                {formattedTime}
            </div>
        </div>
    );
}

export default Message;
