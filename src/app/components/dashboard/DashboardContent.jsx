'use client';

import { 
  BarChart3, 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown,
  Eye
} from 'lucide-react';

export default function DashboardContent() {
  // Sample data for the dashboard
  const stats = [
    { name: 'Total Posts', value: '24', icon: FileText, change: '+12%', trend: 'up' },
    { name: 'Total Users', value: '120', icon: Users, change: '+18%', trend: 'up' },
    { name: 'Comments', value: '342', icon: MessageSquare, change: '+24%', trend: 'up' },
    { name: 'Page Views', value: '12.5K', icon: Eye, change: '-3%', trend: 'down' },
  ];

  const recentPosts = [
    { id: 1, title: 'Getting Started with Next.js', views: 1240, comments: 24, date: '2 days ago' },
    { id: 2, title: 'Understanding React Hooks', views: 890, comments: 18, date: '4 days ago' },
    { id: 3, title: 'CSS Grid Layout Tutorial', views: 750, comments: 12, date: '1 week ago' },
    { id: 4, title: 'JavaScript Promises Explained', views: 620, comments: 8, date: '2 weeks ago' },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <div className="font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {stat.change}
                    </span>
                    <span className="ml-1">from last month</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts section */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Traffic Overview</h2>
            <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-10 w-10 text-gray-400 mx-auto" />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Chart visualization would go here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent posts table */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Posts</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Views
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Comments
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentPosts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{post.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{post.views}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{post.comments}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {post.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                View all posts
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}