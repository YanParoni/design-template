import * as React from 'react';
import TypingAnimation from '@ui/components/atoms/typing-animation';
import GameNameSpan from "@ui/components/molecules/chat/game-name";
interface IAppProps {
    chatLog: any[]
    isPending: boolean
}

const ChatMessages = ({ chatLog, isPending }: IAppProps) => {
    function findGameNames(message:string) {
        const gameNameRegex = /<([^<>]+)>/g;
        const gameNames = message.match(gameNameRegex);
        return gameNames || [];
    }
    function formatGameNames(message:string) {
        const gameNames = findGameNames(message);

        if (gameNames.length === 0) {
            return [message];
        }

        const formattedMessage = [];
        let startIndex = 0;

        gameNames.forEach((name) => {
            const nameWithout = name.replace(/<|>/g, '');
            const spanElement = <GameNameSpan key={startIndex} name={nameWithout.trim()} />;

            formattedMessage.push(message.slice(startIndex, message.indexOf(name)));

            formattedMessage.push(spanElement);

            startIndex = message.indexOf(name) + name.length;
        });

        formattedMessage.push(message.slice(startIndex));

        return formattedMessage;
    }

    return <div  className="flex flex-col space-y-4 rounded  pt-12 pb-16   ">
        {
            chatLog.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                        className={`${message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'
                            } rounded-lg p-4 text-white max-w-sm text-sm antialiased text-justify`}
                    >
                        {formatGameNames(message.message).map((element, i) => (
                            <React.Fragment key={i}>{element}</React.Fragment>
                        ))}
                    </div>
                </div>
            ))
        }
        {
            isPending &&
            <div key={chatLog.length} className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                    <TypingAnimation />
                </div>
            </div>
        }
    </div>;
};

export default ChatMessages;
