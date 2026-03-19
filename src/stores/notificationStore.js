import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
    // State
    const notifications = ref([])
    const isDropdownOpen = ref(false)

    /**
     * Add a new in-app notification to the list
     */
    const addNotification = (title, message, type = 'info') => {
        notifications.value.unshift({
            id: Date.now(),
            title,
            message,
            type,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        })
    }

    /**
     * Mark a specific notification as read by its ID
     */
    const markAsRead = (id) => {
        const noti = notifications.value.find(n => n.id === id)
        if (noti) noti.read = true
    }

    /**
     * Mark all notifications as read
     */
    const markAllRead = () => {
        notifications.value.forEach(n => n.read = true)
    }

    /**
     * Remove all notifications from the store
     */
    const clearAll = () => {
        notifications.value = []
    }

    /**
     * Computed: Count of unread notifications
     */
    const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

    /**
     * Action: Toggle the visibility of the notification dropdown
     */
    const toggleDropdown = () => {
        isDropdownOpen.value = !isDropdownOpen.value
    }

    return {
        notifications,
        unreadCount,
        isDropdownOpen,
        addNotification,
        markAsRead,
        markAllRead,
        clearAll,
        toggleDropdown
    }
})
