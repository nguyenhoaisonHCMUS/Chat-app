import { toast } from "@/components/ui/use-toast";
import { getConversations } from "@/services/rootService";
import { useEffect, useState } from "react";


const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const fetch = async () => {
			setLoading(true);
			try {
				const result = await getConversations();	
				setConversations(result.data);
			} catch (error) {
                console.log(error);
				toast({title: "can't get Conversation!"});
			} finally {
				setLoading(false);
			}
		};

		fetch();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;