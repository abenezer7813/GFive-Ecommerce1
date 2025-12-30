"use client";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  gender?: string;
};

export default function UserDetail({ user }: { user: User }) {
  const getGenderIcon = (gender?: string) => {
    switch (gender?.toLowerCase()) {
      case 'male':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'female':
        return (
          <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 border-2 border-white/30">
              <span className="text-2xl font-bold text-white">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{`${user.firstName} ${user.lastName}`}</h1>
              <p className="text-amber-100 mt-1">Personal Profile</p>
            </div>
          </div>
          <div className="hidden md:block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-sm font-medium text-white">Active Account</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Name Section */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">First Name</span>
                  <span className="text-gray-900 font-medium">{user.firstName}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Last Name</span>
                  <span className="text-gray-900 font-medium">{user.lastName}</span>
                </div>
              </div>
            </div>

            {/* Gender Section */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  {getGenderIcon(user.gender)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Gender & Age</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Gender</span>
                  <div className="flex items-center">
                    <span className="text-gray-900 font-medium mr-2 capitalize">{user.gender ?? "Not specified"}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-gray-500">Age</span>
                  {user.age ? (
                    <div className="flex items-center">
                      <span className="text-gray-900 font-medium mr-2">{user.age}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">years</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Email Section */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89-4.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
              </div>
              <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                    <p className="text-gray-900 font-medium text-lg break-all">{user.email}</p>
                  </div>
                  <div className="ml-4 p-2 bg-white rounded-lg border">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  This email is used for account verification and communication. It cannot be changed.
                </p>
              </div>
            </div>

            {/* Account ID Section */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Account Details</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-gray-500">Account ID</span>
                  <div className="flex items-center">
                    <span className="text-sm font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded-md">{user.id}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Your unique account identifier. Use this when contacting support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Last updated: Just now • Profile is complete
            </div>
            <div className="mt-3 sm:mt-0 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Profile Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}