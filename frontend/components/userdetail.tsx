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
  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">User Details</h1>
      <dl className="grid grid-cols-1 gap-3 text-sm text-gray-700">
        <div>
          <dt className="font-medium">Name</dt>
          <dd>{`${user.firstName} ${user.lastName}`}</dd>
        </div>
        <div>
          <dt className="font-medium">Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt className="font-medium">Age</dt>
          <dd>{user.age ?? "—"}</dd>
        </div>
        <div>
          <dt className="font-medium">Gender</dt>
          <dd>{user.gender ?? "—"}</dd>
        </div>
      </dl>
    </section>
  );
}