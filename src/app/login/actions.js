"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { useReddit } from "../contexts/RedditContext";
// import { useRouter } from "next/navigation";

export async function login(formData) {
	//const router = useRouter();

	// const {supabase} = useReddit()
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function signup(formData) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
		//username: formData.get("username"),
	};

	const metadata = {
		first_name: formData.get("first_name"),
		last_name: formData.get("last_name"),
		username: formData.get("username"),
	};

	const { error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			data: metadata,
		},
	});

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function update(formData) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
		username: formData.get("username"),
	};

	const metadata = {
		first_name: formData.get("first_name"),
		last_name: formData.get("last_name"),
		username: formData.get("username"),
	};

	const { error } = await supabase.auth.updateUser({
		email: data.email,
		password: data.password,
			options: {
			data: metadata,
		},
	});

	if (error) {
		redirect("/error");
    console.log('NO')
	}

	revalidatePath("/", "layout");
	redirect("/");
}


// export async function signup(formData) {
//   const supabase = createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email'),
//     password: formData.get('password'),
//     username: formData.get('username'),
//   }

//   const { error } = await supabase.auth.signUp(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/')
// }
