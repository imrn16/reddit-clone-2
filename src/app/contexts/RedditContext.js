"use client";

import { useContext, createContext, useState, useEffect } from "react";
import PostPage from "../components/PostPage";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";
import { createClient } from "@/utils/supabase/client";

const RedditContext = createContext();

export function useReddit() {
	return useContext(RedditContext);
}

export const RedditProvider = ({ children }) => {
	const [commentsPage, setCommentsPage] = useState([]);
	const [ident, setIdent] = useState();
	const [author, setAuthor] = useState();
	const [title, setTitle] = useState();
	const [content, setContent] = useState();
	const [pic, setPic] = useState();
	const [user, setUser] = useState();
	const [created, setCreated] = useState();
	const [subrdt, setSubrdt] = useState();
	const [uploadType, setUploadType] = useState();
	const [fileName, setFileName] = useState();

	const supabase = createClient();
	console.log(`supabase created`);

	// useEffect(() => {
	// 	const supabase = createClient();
	// 	console.log(`supabase created`);
	// }, []);

	const [authorUser, setAuthorUser] = useState(null);

	const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
	const [isNoUserDropdownOpen, setIsNoUserDropdownOpen] = useState(false);
	const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);

	const [showCreatePostsModal, setShowCreatePostsModal] = useState(false);
	const [showCreateSubredditModal, setShowCreateSubredditModal] = useState(false);
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showSignInModal, setShowSignInModal] = useState(false);
	const [showUserEditModal, setShowUserEditModal] = useState(false);

	const [isLargeScreen, setIsLargeScreen] = useState(false);

	const [posts, setPosts] = useState(null);
	const [subreddits, setSubreddits] = useState(null);
	const [fetchError, setFetchError] = useState(null);

	const [commentList, setCommentList] = useState(null);
	const [postComs, setPostComs] = useState([]);

	const [showComPage, setShowComPage] = useState(false);
	const [showComPage2, setShowComPage2] = useState(false);

	const [userName, setUserName] = useState("");

	const fetchPosts = async () => {
		const { data, error } = await supabase.from("posts").select();

		if (error) {
			setFetchError("Could not fetch feed");
			//setPosts(null);
			console.log(error);
		}

		if (data) {
			setPosts(data);
			setFetchError(null);
		}
		//console.log("posts: ", posts);
	};

	// useEffect(() => {
	// 	console.log('posts: ', posts)
	// }, [posts]);

	const checkUserAuthenticated = async () => {
		// const supabase = createClient()
		const { data, error } = await supabase.auth.getUser();
		console.log("User: ", data.user);
		if (error || !data.user) {
			console.error("User is not authenticated");
			return null;
		}
		return data.user;
	};

	//   const checkUserAuthenticated = async () => {
	// 	const { data: { session }, error } = await supabase.auth.getSession();
	// 	console.log('Session: ', session)
	// 	if (error || !session) {
	// 	  console.error('No active session', error);
	// 	  return null;
	// 	}
	// 	return session.user;
	//   };

	const FetchUser = async () => {
		const { user, error, isLoading } = useUser();

		if (isLoading) return <div>Loading...</div>;
		if (error) return <div>{error.message}</div>;

		return (
			user && (
				<div>
					<img
						src={user.picture}
						alt={user.name}
					/>
					<h2>{user.name}</h2>
					<p>{user.email}</p>
				</div>
			)
		);
	};

	const fetchSession = async () => {
		const { user } = await getSession();

		return (
			user && (
				<div>
					<img
						src={user.picture}
						alt={user.name}
					/>
					<h2>{user.name}</h2>
					<p>{user.email}</p>
				</div>
			)
		);
	};

	function dateCreatedParse(created) {
		const now = new Date();
		const createdDate = new Date(created);
		const diffInSeconds = (now - createdDate) / 1000;
	
		if (diffInSeconds < 60) {
			return `${Math.floor(diffInSeconds)} seconds ago`;
		} else if (diffInSeconds < 3600 && Math.floor(diffInSeconds / 60) === 1) {
			return `${Math.floor(diffInSeconds / 60)} minute ago`;
		} else if (diffInSeconds < 3600) {
			return `${Math.floor(diffInSeconds / 60)} minutes ago`;
		} else if (diffInSeconds < 86400 && Math.floor(diffInSeconds / 3600) === 1) {
			return `${Math.floor(diffInSeconds / 3600)} hour ago`;
		} else if (diffInSeconds < 86400) {
			return `${Math.floor(diffInSeconds / 3600)} hours ago`;
		} else if (diffInSeconds < 2592000 && Math.floor(diffInSeconds / 86400) === 1) {
			return `${Math.floor(diffInSeconds / 86400)} day ago`;
		} else if (diffInSeconds < 2592000) {
			return `${Math.floor(diffInSeconds / 86400)} days ago`;
		} else if (diffInSeconds < 31536000 && Math.floor(diffInSeconds / 2592000) === 1) {
			return `${Math.floor(diffInSeconds / 2592000)} month ago`;
		} else if (diffInSeconds < 31536000) {
			return `${Math.floor(diffInSeconds / 2592000)} months ago`;
		} else if (Math.floor(diffInSeconds / 31536000) === 1) {
			return `${Math.floor(diffInSeconds / 31536000)} year ago`;
		} else {
			return `${Math.floor(diffInSeconds / 31536000)} years ago`;
		}
	}
	
	const fetchSubreddits = async () => {
		const { data, error } = await supabase.from("subreddits").select();

		if (error) {
			setFetchError("Could not fetch feed");
			setSubreddits(null);
			console.log(error);
		}

		if (data) {
			setSubreddits(data);
			setFetchError(null);
		}

		console.log(subreddits);
	};

	const fetchComments = async (commentId) => {
		const { data, error } = await supabase.from("comments").select().eq("postID", commentId);

		if (error) {
			setFetchError("Could not fetch feed");
			setCommentList(null);
			console.log(error);
		}

		if (data) {
			setCommentList(data);
			setPostComs(data);
			setFetchError(null);
		}
	};

	const setComments = async ({
		commentId,
		commentTitle,
		commentContent,
		commentAuthor,
		commentUpvote,
		commentDownvote,
		commentPic,
		commentCreated,
		commentSubreddit,
		commentFile,
		commentUpload,
	}) => {
		setPostComs([]);
		await fetchPosts();

		console.log("comment button pressed");
		console.log(posts);
		setShowComPage(true);
		setShowComPage2(true);

		posts?.forEach((post) => {
			if (post.id === commentId) {
				setIdent(commentId);
				setAuthor(commentAuthor);
				setTitle(commentTitle);
				setContent(commentContent);
				setPic(commentPic);
				setCreated(commentCreated);
				setSubrdt(commentSubreddit);
				setFileName(commentFile);
				setUploadType(commentUpload);
			}
		});

		console.log("ident: ", author);

		await fetchComments(commentId);
		console.log("comments fetched");
		console.log(commentList);
		const newPostComs = commentList?.filter((com) => com.postID === commentId) || [];
		setPostComs(newPostComs);
		console.log("post coms");
		console.log(postComs);
		console.log("showComPage: ", showComPage);
	};

	useEffect(() => {
		console.log(`context showComPage: `, showComPage);
	}, [showComPage]);

	const reRenderComments = async (commentId) => {
		await fetchComments(commentId);
		console.log("comments fetched");
		console.log(commentList);
		const newPostComs = commentList?.filter((com) => com.postID === commentId) || [];
		setPostComs(newPostComs);
		console.log("post coms");
		console.log(postComs);
	};

	useEffect(() => {
		setPostComs(commentList);
		console.log("comment list useEffect: ", commentList);
		console.log("author: ", author);
		//setShowComPage(true)

		fetchPosts();
	}, [commentList]);

	const createPost = async () => {
		// const { data, error } = await supabase.from("posts").select();
		// if (error) {
		// 	setFetchError("Could not fetch feed");
		// 	setPosts(null);
		// 	console.log(error);
		// }
		// if (data) {
		// 	setPosts(data);
		// 	setFetchError(null);
		// }
		// console.log("create post");
	};

	return (
		<RedditContext.Provider
			value={{
				setComments,
				ident,
				author,
				title,
				content,
				showComPage,
				createPost,
				commentList,
				postComs,
				created,
				pic,
				fetchPosts,
				fetchSubreddits,
				posts,
				subreddits,
				showCreatePostsModal,
				setShowCreatePostsModal,
				showCreateSubredditModal,
				setShowCreateSubredditModal,
				dateCreatedParse,
				showSignInModal,
				setShowSignInModal,
				FetchUser,
				fetchSession,
				showUserEditModal,
				setShowUserEditModal,
				user,
				setUser,
				checkUserAuthenticated,
				supabase,
				isUserDropdownOpen,
				setIsUserDropdownOpen,
				isNoUserDropdownOpen,
				setIsNoUserDropdownOpen,
				isCreateDropdownOpen,
				setIsCreateDropdownOpen,
				showSignUpModal,
				setShowSignUpModal,
				authorUser,
				setAuthorUser,
				subrdt,
				fetchComments,
				setPostComs,
				reRenderComments,
				setShowComPage,
				showComPage2,
				setShowComPage2,
				isLargeScreen,
				setIsLargeScreen,
				uploadType,
				fileName,
			}}>
			{children}
		</RedditContext.Provider>
	);
};
