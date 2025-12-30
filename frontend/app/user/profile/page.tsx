"use client";
import { useEffect, useState } from "react";
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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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
            setLoading(false);
        };

        load();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading profile...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const updated: User = {
            id: user.id,
            firstName: String(formData.get("firstName")),
            lastName: String(formData.get("lastName")),
            email: user.email,
            age: (() => {
                const v = formData.get("age");
                return v ? Number(v) : undefined;
            })(),
            gender: String(formData.get("gender")),
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
            setUser(saved as User);
            setEditing(false);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                            <p className="mt-1 text-gray-600">Manage your personal information</p>
                        </div>
                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="inline-flex items-center px-5 py-2.5 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-200"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                {!editing ? (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-10">
                            <div className="flex items-center">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                                        <span className="text-2xl font-bold text-white">
                                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-white text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full">
                                        ACTIVE
                                    </div>
                                </div>
                                <div className="ml-6">
                                    <h2 className="text-2xl font-bold text-white">
                                        {user.firstName} {user.lastName}
                                    </h2>
                                    <p className="text-gray-300 text-sm">Personal Profile</p>
                                    <div className="flex items-center mt-3 space-x-3">
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white">
                                            ID: {user.id}
                                        </span>
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white">
                                            Verified
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-8">
                                    {/* Personal Information */}
                                    <div>
                                        <div className="flex items-center mb-6">
                                            <div className="p-2.5 bg-gray-100 rounded-lg mr-3">
                                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-700">First Name</span>
                                                <span className="font-bold text-gray-900">{user.firstName}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
                                                <span className="font-medium text-gray-700">Last Name</span>
                                                <span className="font-bold text-gray-900">{user.lastName}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gender & Age */}
                                    <div>
                                        <div className="flex items-center mb-6">
                                            <div className="p-2.5 bg-gray-100 rounded-lg mr-3">
                                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">Gender & Age</h3>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                                <span className="font-medium text-gray-700">Gender</span>
                                                <div className="flex items-center">
                                                    {user.gender && (
                                                        <div className={`w-6 h-6 rounded-md mr-2 flex items-center justify-center ${user.gender === 'male' ? 'bg-gray-100' : 'bg-gray-100'}`}>
                                                            {user.gender === 'male' ? (
                                                                <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    )}
                                                    <span className="font-bold text-gray-900">{user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "Not specified"}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
                                                <span className="font-medium text-gray-700">Age</span>
                                                {user.age ? (
                                                    <div className="flex items-center">
                                                        <span className="font-bold text-gray-900 mr-2">{user.age}</span>
                                                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">years</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">—</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-8">
                                    {/* Contact Information */}
                                    <div>
                                        <div className="flex items-center mb-6">
                                            <div className="p-2.5 bg-gray-100 rounded-lg mr-3">
                                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89-4.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">Contact Information</h3>
                                        </div>
                                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 mb-1">Email Address</p>
                                                <p className="font-bold text-gray-900 text-lg break-all">{user.email}</p>
                                            </div>
                                            <p className="mt-3 text-sm text-gray-600">
                                                This email is used for account verification and communication.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Account Details */}
                                    <div>
                                        <div className="flex items-center mb-6">
                                            <div className="p-2.5 bg-gray-100 rounded-lg mr-3">
                                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">Account Details</h3>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center py-3">
                                                <span className="font-medium text-gray-700">Account ID</span>
                                                <span className="font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded border border-gray-300">{user.id}</span>
                                            </div>
                                            <div className="pt-4 border-t border-gray-100">
                                                <p className="text-sm text-gray-600">
                                                    Your unique account identifier.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Status */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Profile updated recently
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                                        <span className="text-sm font-medium text-gray-900">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Edit Mode Form */
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
                            <div className="flex items-center">
                                <div className="p-2.5 bg-white/10 rounded-lg mr-3 border border-white/20">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                                    <p className="text-gray-300 text-sm mt-0.5">Update your personal details</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            First Name
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <input
                                            name="firstName"
                                            defaultValue={user.firstName}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-400"
                                            placeholder="Enter first name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Last Name
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <input
                                            name="lastName"
                                            defaultValue={user.lastName}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-400"
                                            placeholder="Enter last name"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Age
                                        </label>
                                        <input
                                            name="age"
                                            type="number"
                                            min="0"
                                            max="120"
                                            defaultValue={user.age ?? ""}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-400"
                                            placeholder="Enter age"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Optional</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Gender
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <label className={`relative flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${user.gender === "male" ? 'border-gray-700 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    defaultChecked={user.gender === "male"}
                                                    className="sr-only"
                                                />
                                                <div className="flex items-center">
                                                    <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${user.gender === "male" ? 'border-gray-700' : 'border-gray-400'}`}>
                                                        {user.gender === "male" && <div className="w-2 h-2 bg-gray-700 rounded-full"></div>}
                                                    </div>
                                                    <span className="font-medium">Male</span>
                                                </div>
                                            </label>
                                            <label className={`relative flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${user.gender === "female" ? 'border-gray-700 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    defaultChecked={user.gender === "female"}
                                                    className="sr-only"
                                                />
                                                <div className="flex items-center">
                                                    <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${user.gender === "female" ? 'border-gray-700' : 'border-gray-400'}`}>
                                                        {user.gender === "female" && <div className="w-2 h-2 bg-gray-700 rounded-full"></div>}
                                                    </div>
                                                    <span className="font-medium">Female</span>
                                                </div>
                                            </label>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">Optional</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        name="email"
                                        defaultValue={user.email}
                                        disabled
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Email address cannot be changed</p>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Save Changes
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                    className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}