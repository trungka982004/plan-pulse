import { useNotificationStore } from '../stores/notificationStore'

export const notificationService = {
  /**
   * Request browser notification permissions
   */
  async requestPermission() {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications.')
      return false
    }
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  },

  /**
   * Send both browser and in-app notifications
   */
  sendNotification(title, options = {}) {
    // 1. Browser Push Notification
    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico', 
        ...options
      })
    }
    // 2. In-App Bell Notification
    const notiStore = useNotificationStore()
    notiStore.addNotification(title, options.body || '')
  },

  /**
   * Check for conditions and trigger smart notifications
   */
  checkAndNotify(goals, habits) {
    if (Notification.permission !== 'granted') return

    const now = Date.now()
    const lastCheck = localStorage.getItem('last_notification_check')
    const currentHour = new Date().getHours()
    
    // Throttle: Only check every 2 hours to avoid spamming the user
    if (lastCheck && (now - parseInt(lastCheck)) < 1000 * 60 * 60 * 2) {
      return
    }
    localStorage.setItem('last_notification_check', now.toString())

    const incompleteHabits = habits.filter(h => !h.done)
    const totalHabits = habits.length

    // 1. CELEBRATION: All habits completed
    if (totalHabits > 0 && incompleteHabits.length === 0) {
        this.sendNotification('You are a Star! 🎆', {
            body: `Amazing! All ${totalHabits} habits for today are completed. Keep up the high energy!`
        })
        return
    }

    // 2. MORNING REMINDER: Planning the day (8 AM - 12 PM)
    if (currentHour >= 8 && currentHour < 12 && incompleteHabits.length > 0) {
        this.sendNotification('Morning Planning ☀️', {
            body: `Ready for a productive day? You have ${incompleteHabits.length} habits waiting for you.`
        })
    }
    
    // 3. EVENING REMINDER: Final push (After 6 PM)
    else if (currentHour >= 18 && incompleteHabits.length > 0) {
        this.sendNotification('Evening Check 🌙', {
            body: `Don't let the day end with unfinished habits! Just ${incompleteHabits.length} more to go.`
        })
    }

    // 4. GOAL FOLLOW-UP: Inactivity check (2 days of no updates)
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2) 
    
    const inactiveGoals = goals.filter(g => {
        if (g.status === 'completed') return false
        const lastMovement = new Date(g.updated_at || g.created_at)
        return lastMovement < twoDaysAgo
    })

    if (inactiveGoals.length > 0) {
      this.sendNotification('Goal Follow-up 🚀', {
        body: `It's been 2 days since your last update on "${inactiveGoals[0].title}". Stay focused!`
      })
    }
  }
}
