import React from "react";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12 max-w-4xl mx-auto">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Learn More About This Blog</h1>
        <p className="text-lg text-gray-600">
          Dive deeper into what makes this blog unique and why it’s worth your time.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">🎯 Purpose</h2>
        <p className="text-gray-700">
          This blog is built to share valuable insights, tutorials, personal thoughts, and resources on topics ranging from tech to productivity. Whether you're a beginner or a pro, there's something here for everyone.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">🛠️ What You’ll Find Here</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>In-depth articles and tutorials</li>
          <li>Project breakdowns and case studies</li>
          <li>Tips, tricks, and hacks to boost your workflow</li>
          <li>Personal stories and lessons learned</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">📬 Stay Connected</h2>
        <p className="text-gray-700">
          Want updates when new posts go live? Consider subscribing to the newsletter or following on social media.
        </p>
      </section>

      <section className="text-center mt-16">
        <a
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Go Back Home
        </a>
      </section>
    </div>
  );
};

export default LearnMore;
