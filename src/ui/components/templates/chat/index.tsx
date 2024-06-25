'use client'
import React, { FormEvent, useState } from "react";
import { useChatGpt } from "@ui/queries/chat";
import { ChatTitle } from "@ui/components/atoms/chat/chat-title";
import { ChatLayout } from "@ui/components/atoms/chat/chat-layout";
import ChatHeader from "@ui/components/atoms/chat/chat-header";
import { ChatVisibilityBtn } from "@ui/components/atoms/chat/chat-visibility-button";
import ChatContent from "@ui/components/atoms/chat/chat-content";
import ChatMessages from "@ui/components/organisms/chat/chat-messages";
import { AnimatePresence, motion } from "framer-motion";
import useDeviceDetect from "@ui/hooks/use-device-detect";

const defaultMessage = {type: 'system', message: "Hello, how can I help you today?"}

export default function Chat() {
    const [inputValue, setInputValue] = useState('');
    const [chatLog, setChatLog] = useState<any>([defaultMessage]);
    const [ open, setOpen] = useState(false);
    const { mutateAsync } = useChatGpt();
    const {isMobile} = useDeviceDetect()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        setChatLog((prevChatLog:any) => [...prevChatLog, { type: 'user', message: inputValue }]);
        sendMessage(inputValue);
        setInputValue('');
    }

    const sendMessage = async (message: string) => {
        const res = await mutateAsync(message)
        setChatLog((prevChatLog: any) => [...prevChatLog, { type: 'system', message: res.games.choices[0].message.content }]);
    }

    const chatContentVariants = {
        open: {
          height: 400,
          opacity: 1,
          transition: {
            duration: .4,
            type: "tween",
          },
        },
        closed: {
          height: 60,
          opacity: 1,
          transition: {
            duration: 0.4,
            type: "tween",
          },
        },
        openMobile:{
            opacity:1,
            transition: {
                duration: .4,
                type: "tween",
              },
        },
        closedMobile:{
            opacity:1,
            width:30,
            transition: {
                duration: .4,
                type: "tween",
              },
        }
      };

    return (
      <AnimatePresence>
        <motion.div 
        className="fixed bottom-0 z-30 h-screen right-1 "
        variants={chatContentVariants}
        animate={isMobile? (open ?"openMobile":"closedMobile") : (open ? "open":"closed") }
        >
            <ChatLayout>
                <ChatHeader>
                <ChatTitle title='Explore with GPT 🤖' />
              <ChatVisibilityBtn
              open={open}
              setOpen={setOpen}
              />
                </ChatHeader>
                {open && 
                <ChatContent>
                    <ChatMessages chatLog={chatLog} isPending={isLoading} setIsLoading={setIsLoading}/>
                    <form onSubmit={handleSubmit} className="absolute bottom-0 flex p-2 mt-3 ">
                        <div className="flex border border-gray-700 rounded-lg shadow-lg bg-primary-color shadow-shadow">
                            <input type="text" className="flex-grow px-2 bg-transparent text-bkg focus:outline-none" placeholder="Type your message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                            <button type="submit" className="px-2 py-2 font-semibold text-white transition-colors duration-300 bg-purple-500 rounded-lg focus:outline-none hover:bg-purple-600">🚀</button>
                        </div>
                    </form>
                </ChatContent>
                }
            </ChatLayout>
        </motion.div>
        </AnimatePresence>

    )
}