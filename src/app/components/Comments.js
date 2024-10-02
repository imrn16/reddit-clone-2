import React, { useState } from "react";
import { useReddit } from "../contexts/RedditContext";
import { TiArrowUpOutline, TiArrowDownOutline, TiMessage } from "react-icons/ti";
import { supabase } from "../../../lib/supabaseClient";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect } from "react";
import { MdOutlineCancel, GiCancel } from "react-icons/md";
import { useRef } from "react";

function Comments({ id }) {
	const { postComs, dateCreatedParse, checkUserAuthenticated, comments, fetchComments, setPostComs, commentList, reRenderComments, ident, authorUser } = useReddit();
	const [data, setData] = useState(postComs);

	useEffect(() => {
	  setData(postComs);
	  //renderComments(data)
	}, [postComs, comments]);


	const inputRef = useRef(null);

	const [replyInputs, setReplyInputs] = useState({});
	const [showAddComment, setShowAddComment] = useState(false);
	const [replyAllContent, setAllReplyContent] = useState("");

	// useEffect(() => {
	// 	console.log('post coms', postComs)
	// }, [postComs]);

	useEffect(() => {
		if (showAddComment) {
			inputRef.current.focus();
		}
	}, [showAddComment]);

	function toggleReplyInput(commentId) {
		setReplyInputs((prev) => ({
			...prev,
			[commentId]: !prev[commentId],
		}));
	}


	// useEffect(() => {
	// 	setPostComs(commentList);
	// 	setData(postComs)
	// 	console.log("comment list useEffect in com: ", commentList);
	// }, [commentList]);

	const handleUpvote = async (id, upvotes) => {
		const user = await checkUserAuthenticated();
		console.log('handle: ', user)
		if (!user) {
		  return alert('Please Sign In First');

		}



		const { data, error } = await supabase
			.from("comments")
			.update({ upvotes: upvotes + 1 })
			.eq("id", id)
			.select();

		console.log("upvote recorded");
		reRenderComments(ident)
		console.log(`ident:: `, ident)
	};

	const handleDownvote = async (id, downvotes) => {
		const user = await checkUserAuthenticated();
		console.log('handle: ', user)
		if (!user) {
		  return alert('Please Sign In First');

		}



		const { data, error } = await supabase
			.from("comments")
			.update({ downvotes: downvotes + 1 })
			.eq("id", id)
			.select();

		console.log("downvote recorded");
		reRenderComments(ident)
	};

	function ReplyInput(id, postID) {
		const [bgColor, setBgColor] = useState("bg-slate-600");
		const [replyContent, setReplyContent] = useState("");

		const handleMouseOver = () => {
			setBgColor("bg-slate-600");
		};

		const handleMouseOut = () => {
			setBgColor("bg-slate-700");
		};

		return (
			<>
				<div className="mt-2 py-2 px-1 bg-neutral-800 rounded-xl">
					<div className="flex flex-row">
						<TextareaAutosize
							className={`mt- px-2 rounded-md text-sm pl-2 p-1 bg-transparent  w-full overflow-y-auto focus:outline-none resize-none placeholder-neutral-500`}
							placeholder="Add a Comment"
							type="text"
							onChange={(e) => {
								setReplyContent(e.target.value);
								console.log(`${replyContent}`);
							}}
							value={replyContent}
							minRows={0}
						/>
						<div className=" hover:bg-neutral-600 flex justify-center items-center rounded-full p-1">
							<button
								className="flex-flex-row text-neutral-400 "
								onClick={() => toggleReplyInput(id)}>
								<MdOutlineCancel size={"20"} />
							</button>
						</div>
					</div>

					<button
						className={`text-xs mt-2 p-1  ${bgColor} rounded-lg ml-1 px-3`}
						onClick={() => handleCommentSubmit(id, postID, replyContent)}
						onMouseOver={() => handleMouseOver()}
						onMouseOut={() => handleMouseOut()}>
						Submit
					</button>
				</div>
			</>
		);
	}

	function addComment() {
		return (
			<>
				<div className="mt-2 py-2 px-1 bg-neutral-800 rounded-xl">
					<TextareaAutosize
						className={`mt- px-2 rounded-md text-sm pl-2 p-1 bg-transparent  w-full overflow-y-auto focus:outline-none resize-none placeholder-neutral-500`}
						placeholder="Add a Comment"
						type="text"
						onChange={(e) => {
							setReplyContent(e.target.value);
							console.log(`${replyContent}`);
						}}
						value={replyContent}
						minRows={0}
					/>
					<button
						className={`text-xs mt-2 p-1  ${bgColor} rounded-lg ml-1 px-3`}
						onClick={() => handleCommentSubmit(id, postID, replyContent)}
						onMouseOver={() => handleMouseOver()}
						onMouseOut={() => handleMouseOut()}>
						Submit
					</button>
				</div>
			</>
		);
	}

	const handleCommentSubmit = async (id, postID, replyContent) => {
		const user = await checkUserAuthenticated();
		console.log('handle: ', user)
		if (!user) {
		  return alert('Please Sign In First');

		}

		const { data, error } = await supabase
			.from("comments")
			.insert([{ postID: postID, prevID: id, upvotes: 1, downvotes: 0, content: replyContent, author: authorUser.user_metadata.username }])
			.select();

		console.log(data);
		reRenderComments(ident)
	};

	function IndComment({ comment }) {
		const { id, postID, content, author, downvotes, upvotes, created_at } = comment;

		return (
			<div className="ml-2 comment">
				<div className="flex text-sm mt-5 ml-1 text-neutral-400">
					<p>{author}</p>
					<p className="pl-1">•</p>
					<p className="pl-1">{`${dateCreatedParse(created_at)}`}</p>
				</div>
				<pre
					className="text-sm resize-none h-fit focus:outline-none bg-transparent w-full my-1 ml-1 font-sf-pro text-neutral-200"
					disabled={"true"}
					value={content}
					>{content}
				</pre>
				<div className="flex text-xs">
					<div className="flex rounded-full bg-neutral-900">
						<button onClick={() => handleUpvote(id, upvotes)}>
							{
								<div className="flex justify-center items-center bg-neutral-800 px-2 py-0.5 rounded-full hover:bg-neutral-700 active:bg-neutral-600">
									<p
										className="mr-1 font-light"
										style={{ fontSize: 9 }}>
										{upvotes}
									</p>
									<TiArrowUpOutline
										size={"13"}
										className="text-orange-600"
									/>
								</div>
							}
						</button>
						{/* <p className="pl-1 flex justify-center items-center">•</p> */}
						<button onClick={() => handleUpvote()}>
							{
								<div className="flex justify-center items-center px-1 py-0.5 rounded-full ml- ">
									<p className="flex justify-center items-center font-bold mx-1">{upvotes - downvotes}</p>
								</div>
							}
						</button>
						{/* <p className="pl-1 flex justify-center items-center">•</p> */}
						<button
							className="flex"
							onClick={() => handleDownvote(id, downvotes)}>
							{
								<div className="flex justify-center items-center bg-neutral-800 px-2 py-0.5 rounded-full hover:bg-neutral-700 active:bg-neutral-600">
									<TiArrowDownOutline
										size={"13"}
										className="text-purple-600"
									/>
									<p
										className="ml-1 font-light"
										style={{ fontSize: 9 }}>
										{downvotes}
									</p>
								</div>
							}
						</button>
					</div>
					<p className="pl-1 flex justify-center items-center">•</p>
					<button
						className="pl-1"
						onClick={() => toggleReplyInput(id)}>
						<div className="flex justify-center items-center px-2 py-0.5 rounded-full bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600">Reply</div>
					</button>
				</div>
				{replyInputs[id] && ReplyInput(id, postID)}
			</div>
		);
	}

	function renderComments(comments, parentID = null, level = 0) {
		return comments
			.filter((comment) => comment.prevID === parentID)
			.sort((a, b) => {
				if (b.upvotes === a.upvotes) {
					return new Date(b.createdAt) - new Date(a.createdAt);
				}
				return b.upvotes - a.upvotes;
			})
			.map((comment) => (
				<div
					key={comment.id}
					style={{
						borderRadius: 0.75,
						marginLeft: level == 0 ? level * 20 + 'px' : level + 25 + "px",
						borderLeft: level >= 0 ? "2px solid rgb(85, 91, 94)" : "none",
					}}>
					<IndComment comment={comment} />
					{renderComments(comments, comment.id, level + 1)}
				</div>
			));
	}

	return (
		<>
			<hr className="my-4 border-t-2 border-neutral-600"></hr>
			{showAddComment ? (
				<div className="flex flex-col bg-red-90  bg-[rgb(24,26,27)] text-neutral-300 rounded-xl ">
					<div className="flex flex-row w-full p-1 pl-2 py-2 rounded-xl text-xs focus:outline-none bg-[rgb(24,26,27)] text-neutral-300 placeholder-neutral-500 hover:bg-neutral-00 ">
						<TextareaAutosize
							ref={inputRef}
							value={replyAllContent}
							onChange={(e) => setAllReplyContent(e.target.value)}
							className="w-full focus:outline-none bg-transparent text-neutral-300 placeholder-neutral-500 my-1 resize-none"
							type="text"
							placeholder="Add a Comment"
							onClick={() => setShowAddComment(true)}
						/>
						<div className=" hover:bg-neutral-600 flex justify-center items-center rounded-full">
							<button
								className="flex-flex-row p-1 text-neutral-400 "
								onClick={() => setShowAddComment(false)}>
								<MdOutlineCancel size={"16"} />
							</button>
						</div>
					</div>
					<div className="flex flex-col p-2 text-xs bg-red-00">
						<div>
							<button
								className="flex flex-col bg-slate-600 rounded-lg p-1 px-2 justify-center items-center w-auto "
								onClick={() => {
									handleCommentSubmit(null, id, replyAllContent);
									setShowAddComment(false);
								}}>
								Submit
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className="mt-1">
					<button
						className="w-full p-1 pl-2 py-3 rounded-xl text-xs focus:outline-none bg-[rgb(24,26,27)] text-neutral-500 placeholder-neutral-500 hover:bg-neutral-700 text-left"
						type="text"
						placeholder="Add a Comment"
						onClick={() => {
							setShowAddComment(true);
						}}>
						Add a Comment
					</button>
				</div>
			)}
			{data.length < 1 ? 
			<div className="mt-3 bg-[rgb(48,51,53)] rounded-2xl pb-4 pt-1 px-5 text-center flex justify-center align0center items-center"><span className="flex justify-center align-center items-center text-xs mt-3">No Comments</span></div> 
			:
			<div className="mt-3 bg-[rgb(48,51,53)] rounded-2xl pb-4 pt-1 px-5">{renderComments(data)}</div>
			}
		</>
	);
}

export default Comments;
