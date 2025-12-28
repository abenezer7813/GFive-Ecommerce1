"use client";
import { useEffect, useState } from "react";
import UserDetail from "../../../components/userdetail";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    age?: number;
    gender?: string;
};

async function decodeJwt(token: string) {
    try {
        const res = await fetch("https://localhost:8081/users/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export default function Page() {
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const load = async () => {
            const token = Cookies.get("token");
            if (!token) {
                router.push("/auth/login");
                return;
            }

            const payload = await decodeJwt(token);
            if (!payload) {
                router.push("/auth/login");
                return;
            }

            const initial: User = {
                id: String(payload.id ?? ""),
                firstName: String(payload.firstName ?? ""),
                lastName: String(payload.lastName ?? ""),
                email: String(payload.email ?? ""),
                age: payload.age !== undefined && payload.age !== null ? Number(payload.age) : undefined,
                gender: payload.gender ?? undefined,
            };

            setUser(initial);
        };

        load();
    }, [router]);

    if (!user) return null;

    const save = (u: User) => {
        setUser(u);
        localStorage.setItem(`profile_${u.email}`, JSON.stringify(u));
        setEditing(false);
    };

    return (
        <main className="p-8 max-w-3xl mx-auto">
            {!editing && (
                <>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setEditing(true)}
                            className="px-4 py-2 bg-amber-400 text-white rounded"
                        >
                            Edit Profile
                        </button>
                    </div>
                    <UserDetail user={user} />
                </>
            )}

            {editing && (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        const updated: User = {
                            id: user.id  ,
                            firstName: String(formData.get("firstName")  ),
                            lastName: String(formData.get("lastName")  ),
                            email: user.email,
                            age: (() => {
                                const v = formData.get("age");
                                return v ? Number(v) : undefined;
                            })(),
                            gender: String(formData.get("gender")  ),
                        };

                        const token = Cookies.get("token");
                        if (!token) {
                            router.push("/auth/login");
                            return;
                        }

                        try {
                            const res = await fetch("https://localhost:8081/users/me", {
                                method: "PUT",
                                headers: {
                                    "Authorization": `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(updated),
                                cache: "no-store",
                            });

                            if (!res.ok) {
                                console.error("Failed to update profile:", await res.text());
                                return;
                            }

                            const saved = await res.json().catch(() => updated);
                            save(saved as User);
                        } catch (err) {
                            console.error(err);
                        }
                    }}
                    className="space-y-4 bg-white p-6 rounded shadow"
                >
                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <input name="firstName" defaultValue={user.firstName} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Last Name</label>
                        <input name="lastName" defaultValue={user.lastName} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Age</label>
                        <input name="age" type="number" defaultValue={user.age ?? ""} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Gender</label>
                        <div className="flex gap-4 mt-1">
                            <label className="inline-flex items-center">
                                <input type="radio" name="gender" value="male" defaultChecked={user.gender === "male"} className="mr-2" />
                                Male
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" name="gender" value="female" defaultChecked={user.gender === "female"} className="mr-2" />
                                Female
                            </label>
                            
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input name="email" defaultValue={user.email} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded">Save</button>
                        <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 border rounded">Cancel</button>
                    </div>
                </form>
            )}
        </main>
    );
}