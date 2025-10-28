import React from 'react';

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <p>This is a protected profile page. Only logged-in users can see this.</p>
    </div>
  );
}
