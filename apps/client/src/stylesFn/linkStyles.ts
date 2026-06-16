export const linkMain = (isActive: boolean) => {
    return `px-3 py-1 rounded-md transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800  hover:text-blue-500
      ${isActive ? 'text-blue-600 dark:text-blue-400 underline' : 'text-gray-700 dark:text-gray-300'
    }`
}