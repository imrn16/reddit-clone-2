import React from "react";
import "../globals.css";
import CommentsButton from "./CommentsButton.js";
import { useState } from "react";
import { TiArrowUpOutline, TiArrowDownOutline, TiMessage } from "react-icons/ti";
import { useReddit } from "../contexts/RedditContext.js";
import Image from "next/image.js";
import { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

function Post({ id, title, content, author, upvote, downvote, postPic, subreddit, createdAt, upload, file }) {
	const { setComments, postComs, dateCreatedPars, checkUserAuthenticated, dateCreatedParse, supabase, reRenderComments, fetchPosts, posts } = useReddit();

	const [votes, setVotes] = useState(upvote - downvote);

	const handleMouseOver = () => {};

	const handleMouseOut = () => {};

	const handleClick = () => {};

	useEffect(() => {}, [postComs]);

	function renderComments() {
		setComments({ commentId: id, commentTitle: title, commentContent: content, commentAuthor: author, commentPic: postPic, commentSubreddit: subreddit });
	}

	const handleUpvote = async (id, upvote) => {
		const user = await checkUserAuthenticated();
		console.log("handle: ", user);
		if (!user) {
			return alert("Please Sign In First");
		}

		const { data, error } = await supabase
			.from("posts")
			.update({ upvotes: upvote + 1 })
			.eq("id", id)
			.select();

		if (error) {
			console.log(`error: `, error);
		}

		console.log("upvote recorded", `id: `, id);
		await fetchPosts();
		//window.location.reload()
	};

	// useEffect(() => {
	// 	fetchPosts()
	// }, [posts])

	const handleDownvote = async (id, downvote) => {
		const user = await checkUserAuthenticated();
		console.log("handle: ", user);
		if (!user) {
			return alert("Please Sign In First");
		}

		const { data, error } = await supabase
			.from("posts")
			.update({ downvotes: downvote + 1 })
			.eq("id", id)
			.select();

		console.log("downvote recorded");
		await fetchPosts();
		//window.location.reload()
	};

	useEffect(() => {
		setVotes(upvote - downvote);
	}, [posts]);

	return (
		<div
			// onClick={() => setComments({ commentId: id, commentTitle: title, commentContent: content, commentAuthor: author, commentPic: postPic, commentCreated: createdAt, commentSubreddit: subreddit})}
			className="flex h-auto drop-shadow-2xl  rounded-2xl bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-600 border-2 border-neutral-900 ">
			<div className="flex-1 pl-3 mx-1 my-0.5 ">
				<div className="flex flex-row mt-3">
					<h3 className="flex items-center text-xs pr-3">🖥</h3>
					<h3 className="flex items-center text-xs">
						<span>{subreddit}</span>
					</h3>
					<h2 className="flex items-center text-xs pl-2 font-extralight">•</h2>
					<h2
						style={{ fontSize: 10 }}
						className="flex flex-row items-center pl-2 font-extralight">
						{author}
					</h2>
					<h2 className="flex items-center text-xs pl-2 font-extralight">•</h2>
					<h2
						style={{ fontSize: 10 }}
						className="flex flex-row items-center justify-end pl-2 font-extralight">{`${dateCreatedParse(createdAt)}`}</h2>
				</div>
				<div className="flex mt-2">
					<h1 className="flex items-center font-bold text-lg">{title}</h1>
					{/* <h2 className="flex items-center text-xs pl-2 font-extralight"> - Created by {author}</h2> */}
				</div>

				{upload == "Upload" ? (
					<div className="flex max-h-96 mr-3 relative justify-center mt-1 ">
						<div className="absolute inset-0 flex items-center justify-center ">
							<Image
								className="w-full h-full object-cover rounded-2xl"
								src={`https://ugahqsneiokuzgjwfoht.supabase.co/storage/v1/object/public/posts/public/${file}`}
								alt="image"
								//layout="responsive"
								//responsive
								width={1}
								height={1}
								style={{ maxWidth: "100%", maxHeight: "100%" }}
								priority
							/>
							<div className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-md rounded-2xl"></div>
						</div>
						<div className="relative z-10 flex items-center justify-center  ">
							<Image
								className="flex items-center justify-center align-center object-contain rounded-2xl w-auto h-auto"
								src={`https://ugahqsneiokuzgjwfoht.supabase.co/storage/v1/object/public/posts/public/${file}`}
								alt="image"
								//responsive
								width={1}
								height={1}
								style={{ maxWidth: "100%", maxHeight: "100%" }}
								disabled={true}
								priority
							/>
						</div>
					</div>
				) : upload == "URL" ? (
					<div className="flex max-h-96 mr-3 relative justify-center mt-1 ">
						<div className="absolute inset-0 flex items-center justify-center ">
							<Image
								className="w-full h-full object-cover rounded-2xl"
								src={postPic}
								alt="image"
								//layout="responsive"
								//responsive
								width={1}
								height={1}
								style={{ maxWidth: "100%", maxHeight: "100%" }}
								priority
							/>
							<div className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-md rounded-2xl"></div>
						</div>
						<div className="relative z-10 flex items-center justify-center  ">
							<Image
								className="flex items-center justify-center align-center object-contain rounded-2xl w-auto h-auto"
								src={postPic}
								alt="image"
								//responsive
								width={1}
								height={1}
								style={{ maxWidth: "100%", maxHeight: "100%" }}
								disabled={true}
								priority
							/>
						</div>
					</div>
				) : (
					<TextareaAutosize
						className="flex w-full resize-none bg-transparent pt-3 pr-1 text-sm text-neutral-100 font-light overflow-ellipsis h-auto focus:outline-none overflow-hidden"
						maxRows={6}
						disabled={true}
						value={content}></TextareaAutosize>
				)}

				<div className="flex h-8 m-2 ml-0 text-sm">
					<div className="flex bg-neutral-800 rounded-full h-auto w-24 ">
						<div className="flex-1 flex items-center justify-center hover:bg-neutral-700 rounded-full text-neutral-300 hover:text-orange-600 active:bg-neutral-600 ">
							<button
								onClick={() => handleUpvote(id, upvote)}
								className="">
								<TiArrowUpOutline size={"20"} />
							</button>
						</div>
						<div className=" flex-1 flex items-center justify-center text-sm">
							<button className="">{votes}</button>
						</div>
						<div className="flex-1 flex items-center justify-center hover:bg-neutral-700 rounded-full text-neutral-300 hover:text-purple-600 active:bg-neutral-600">
							<button
								onClick={() => handleDownvote(id, downvote)}
								className="">
								<TiArrowDownOutline size={"20"} />
							</button>
						</div>
					</div>
					<div className="ml-2  flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded-full active:bg-neutral-600">
						<CommentsButton
							id={id}
							title={title}
							content={content}
							author={author}
							upvote={upvote}
							downvote={downvote}
							postPic={postPic}
							subreddit={subreddit}
							created={createdAt}
							upload={upload}
							file={file}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Post;
