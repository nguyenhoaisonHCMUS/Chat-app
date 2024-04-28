import { useState } from "react";
import useConversation from "./useConversation";
import { sendMess } from "@/services/rootService";
import { toast } from "@/components/ui/use-toast";


const useSendMessage = () => {
    
	const [loading, setLoading] = useState(false);
	const { messages, selectedConversation, setMessages } = useConversation();

    
    const sendMessage = async (message: string) => {
        try {
            setLoading(true);
            const result = await sendMess(message, selectedConversation.userId);
            console.log(result);
            if(result){
                setLoading(false);
                setMessages([...messages, result.data]);
            }
            
        } catch (error) {
            console.log(error);
            toast({title: "can't find messages!"});
        } finally{
            setLoading(false);
        }
    }
	

	return { sendMessage, loading };
};
export default useSendMessage;