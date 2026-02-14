export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <h2 className="text-xl font-medium text-gray-600 mb-2">
        页面未找到 Page Not Found
      </h2>
      <p className="text-gray-400 mb-8">
        你访问的页面不存在或已被移除。
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        返回首页 Back Home
      </a>
    </div>
  )
}
