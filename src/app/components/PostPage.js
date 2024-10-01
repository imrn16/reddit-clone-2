import React, { useEffect } from "react";
import ClientComps from "../components/ClientComps";
import { useReddit } from "../contexts/RedditContext.js";
import Comments from "./Comments";
import { useState } from "react";
import { TiArrowUpOutline, TiArrowDownOutline, TiMessage } from "react-icons/ti";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
import scrollbarHide from "tailwind-scrollbar-hide";

function PostPage() {
	const { ident, title, content, author, showComPage, upvote, created, downvote, pic, postComs, dateCreatedParse, comments, subrdt, uploadType, fileName } = useReddit();
	const [votes, setVotes] = useState(upvote - downvote);

	useEffect(() => {}, [ident, title, content, author, showComPage, postComs, comments, subrdt]);

	

	return (
		<div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-y-scroll scrollbar-hide">
			<div className=" flex flex-col bg-[rgb(36,39,41)] rounded-3xl drop-shadow-2xl p-6 w-full h-auto mt-2 h-auto ">
				{showComPage ? (
					<>
						<div className="flex">
							<h3 className="flex items-center text-xs pr-3">🖥</h3>
							<h3 className="flex items-center text-xs">{subrdt}</h3>
							<h4 className="flex items-center text-xs pl-2 font-extralight"> • {author}</h4>
							<h4 className="flex items-center text-xs pl-2 font-extralight"> • {`${dateCreatedParse(created)}`}</h4>
						</div>
						<div className="flex mt-3">
							<h1 className="flex items-center font-bold text-lg">{title}</h1>
						</div>
						{uploadType == 'URL' ? (
							<div className="flex max-h-96 relative">
								<Image
									className="w-full h-full object-contain rounded-2xl mt-4"
									src={pic}
									alt={`${pic}`}
									layout="responsive"
									width={1024}
									height={683}
									style={{ maxWidth: "100%", maxHeight: "100%" }}
								/>
							</div>
						) : uploadType == 'Upload' ? (
							<div className="flex max-h-96 relative">
								<Image
									className="w-full h-full object-contain rounded-2xl mt-4"
									src={`https://ugahqsneiokuzgjwfoht.supabase.co/storage/v1/object/public/posts/public/${fileName}`}
									alt={`https://ugahqsneiokuzgjwfoht.supabase.co/storage/v1/object/public/posts/public/${fileName}`}
									layout="responsive"
									width={1024}
									height={683}
									style={{ maxWidth: "100%", maxHeight: "100%" }}
								/>
							</div>
						) : (
							<div/>
						)}
						<div className="flex flex-col w-auto mt-2">
							<span
								className="w-full bg-transparent resize-none mt-4 text-sm text-neutral-300 focus:outline-none"
								disabled="true">
								{content}
							</span>
							<div></div>
							<div className="">
								<Comments id={ident} />
							</div>
						</div>
					</>
				) : (
					<div className="flex justify-center align-center items-center">Expand a reddit post to see more!</div>
				)}
			</div>
			<div className="flex flex-col h-96 bg-transparent text-transparent">
				<p>.</p>
			</div>
		</div>
	);
}

export default PostPage;
