"use client";

import Image from "next/image";
import Header from "./components/Header";
import Post from "./components/Post";
import PostPage from "./components/PostPage";
import SubredditHeader from "./components/SubredditHeader";
import "./globals.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";
import { RedditProvider, useReddit } from "./contexts/RedditContext";
import CreatePost from "./components/CreatePost";
import CreateSubreddit from "./components/CreateSubreddit";
import SignInModal from "./components/SignInModal";
import EditUser from "./components/EditUser";
import { createClient } from "@/utils/supabase/client";
import SignUpModal from "./components/SignUpModal";
import CommentsButton from "./components/CommentsButton";

import { MdOutlineCancel, GiCancel } from "react-icons/md";

export default function Home() {
	const [fetchError, setFetchError] = useState(null);

	const { user, setUser, supabase, showComPage, setShowComPage, setShowComPage2, showComPage2, isLargeScreen, setIsLargeScreen } = useReddit();

	const [showComPageMain, setShowComPageMain] = useState(false);

	const {
		ident,
		author,
		title,
		content,
		fetchPosts,
		posts,
		created,
		subrdt,
		fetchSubreddits,
		subreddits,
		showCreatePostsModal,
		setShowCreatePostsModal,
		showUserEditModal,
		setShowUserEditModal,
	} = useReddit();

	useEffect(() => {
		fetchPosts();

		async function getUser() {
			//const supabase = createClient()
			const { data, error } = await supabase.auth.getUser();
			if (error || !data?.user) {
				console.log("no user");
			} else {
				setUser(data.user);
				console.log("Page User: ", data.user);
			}
		}
		getUser();
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setIsLargeScreen(window.innerWidth > 800);
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // Set initial value

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {}, [showCreatePostsModal, showUserEditModal, showComPage]);

	// useEffect(() => {
	// 	if (showComPage == true) {
	// 		setShowComPageMain(true)
	// 	}

	// },  [showComPage]);

	return (
		// <RedditProvider>
		<main className="">
			<Header />
			<CreatePost />
			<CreateSubreddit />
			<SignInModal />
			<SignUpModal />
			<EditUser />
			{/* <button className='ml-40 bg-red-900 fixed inset-0 h-10 w-20 mt-16' onClick={() => {setShowComPage(true)}}>Click me</button> */}
			{!isLargeScreen ? (
				<div className="flex flex-row m-4 justify-center">
					<div className=" flex flex-col w-full max-w-4xl min-w-xl  h-[calc(100vh-64px)] overflow-y-scroll scrollbar-hide ">
						<SubredditHeader />
						{fetchError && <p>{fetchError}</p>}
						{posts && (
							<div>
								<div>
									{posts
										.sort((a, b) => {
											if (b.upvotes === a.upvotes) {
												return new Date(b.createdAt) - new Date(a.createdAt);
											}
											return b.upvotes - a.upvotes;
										})
										.map((post) => {
											return (
												<div className="p-2" key={post.id}>
													
													{/*console.log('postid: ', post.id)*/}
													<Post
														
														id={post.id}
														title={post.title}
														author={post.author}
														content={post.content}
														upvote={post.upvotes}
														downvote={post.downvotes}
														postPic={post.postPic}
														subreddit={post.subreddit}
														createdAt={post.created_at}
														upload={post.upload}
													/>
													<hr className="mt-5 border-t-2 border-neutral-700"></hr>
												</div>
											);
										})}
								</div>
								<div>
									{showComPage && (
										<div>
											<div className="fixed inset-0 mt-10 flex align-bottom justify-end items-end mx-4 bg-neutral-900 h-auto w-auto ">
												<div className="fixed inset-0 flex flex-col h-auto mt-14 flex px-6 w-full max-w-6xl min-w-xl">
													<PostPage
														id={ident}
														title={title}
														author={author}
														content={content}
														posts={posts}
														createdAt={created}
														subreddit={subrdt}
													/>
													<div>
														<div
															className=" hover:bg-orange-800 flex justify-center items-center rounded-2xl mb-3 mt-3 bg-orange-900 h-10 mx-2 active:bg-orange-700"
															onClick={() => setShowComPage(false)}>
															<button className="flex-flex-row p-1 text-neutral-400 ">
																Close
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										// ) : (
										// 	null
									)}
								</div>
							</div>
						)}
						<div className="flex flex-col h-96 bg-transparent text-transparent">
							<p>___</p>
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-row m-4 justify-center">
					<div className=" flex flex-col w-1/2 max-w-2xl min-w-xl  h-[calc(100vh-64px)] overflow-y-scroll scrollbar-hide ">
						<SubredditHeader />
						{fetchError && <p>{fetchError}</p>}
						{posts && (
							<div>
								{posts
									.sort((a, b) => {
										if (b.upvotes === a.upvotes) {
											return new Date(b.createdAt) - new Date(a.createdAt);
										}
										return b.upvotes - a.upvotes;
									})
									.map((post) => {
										return (
											<div className="p-2" key={post.id}>
												{/*console.log('postid: ', post.id)*/}
												<Post
													//key={post.id}
													id={post.id}
													title={post.title}
													author={post.author}
													content={post.content}
													upvote={post.upvotes}
													downvote={post.downvotes}
													postPic={post.postPic}
													subreddit={post.subreddit}
													createdAt={post.created_at}
													upload={post.upload}
													file={post.file}
												/>
												<hr className="mt-5 border-t-2 border-neutral-700"></hr>
											</div>
										);
									})}
							</div>
						)}
						<div className="flex flex-col h-96 bg-transparent text-transparent">
							<p>___</p>
						</div>
					</div>
					<div className="flex px-6 w-1/2 max-w-4xl min-w-xl">
						<PostPage
							id={ident}
							title={title}
							author={author}
							content={content}
							posts={posts}
							createdAt={created}
							subreddit={subrdt}
						/>
					</div>
				</div>
			)}
		</main>
		// </RedditProvider>
	);
}
