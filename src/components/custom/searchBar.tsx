import { useState, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import { useGetUsersQuery } from "@/services/api/user"

interface User {
    id: string
    user_name: string
    email: string
}

interface SearchBarProps {
    onUserSelect: (user: User) => void
}

const SearchBar = ({ onUserSelect }: SearchBarProps) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(searchQuery)
        }, 300)
        return () => clearTimeout(timeoutId)
    }, [searchQuery])

    const { data: users = [], isLoading } = useGetUsersQuery(
        debouncedSearch.trim() || undefined,
        {
            skip: !debouncedSearch.trim(),
        }
    )

    const handleUserSelect = (user: User) => {
        onUserSelect(user)
        setSearchQuery("")
        setShowSuggestions(false)
    }

    return (
        <div className="relative w-full max-w-2xl">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="w-full h-10 pl-10 pr-4 bg-[rgb(var(--input-bg))] border border-[rgb(var(--border-color))] text-[rgb(var(--primary-text))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--focus-ring))] transition-all placeholder-[rgb(var(--secondary-text))]"
                />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && !isLoading && users.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-[rgb(var(--main-surface))] border border-[rgb(var(--border-color))] rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleUserSelect(user)}
                            className="px-4 py-3 hover:bg-[rgb(var(--hover-bg))] cursor-pointer border-b border-[rgb(var(--border-color))] last:border-b-0 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-[rgb(var(--button-primary))] flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-sm">
                                    {user.user_name.charAt(0).toUpperCase()}
                                </div>
                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-[rgb(var(--primary-text))] truncate">
                                        {user.user_name}
                                    </div>
                                    <div className="text-sm text-[rgb(var(--secondary-text))] truncate">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Loading State */}
            {showSuggestions && isLoading && searchQuery.trim() && (
                <div className="absolute top-full mt-2 w-full bg-[rgb(var(--main-surface))] border border-[rgb(var(--border-color))] rounded-lg shadow-xl p-4 z-50">
                    <div className="flex items-center justify-center gap-2 text-[rgb(var(--secondary-text))]">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Searching...</span>
                    </div>
                </div>
            )}

            {/* No Results */}
            {showSuggestions && !isLoading && searchQuery.trim() && users.length === 0 && (
                <div className="absolute top-full mt-2 w-full bg-[rgb(var(--main-surface))] border border-[rgb(var(--border-color))] rounded-lg shadow-xl p-4 z-50">
                    <p className="text-[rgb(var(--secondary-text))] text-center">No users found</p>
                </div>
            )}
        </div>
    )
}

export default SearchBar
