/**
 * Mock Service Layer để quản lý LocalStorage
 * Giúp trừu tượng hóa việc lưu trữ dữ liệu
 */

const STORAGE_KEYS = {
  GOALS: 'todo_app_goals',
  HABITS: 'todo_app_habits',
  SETTINGS: 'todo_app_settings'
}

export const storageService = {
  // Lấy dữ liệu theo Key
  fetch(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  },

  // Lưu dữ liệu theo Key
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },

  // Các hàm tiện ích riêng cho từng loại dữ liệu (Tương lai có thể dùng API ở đây)
  getGoals() {
    return this.fetch(STORAGE_KEYS.GOALS) || []
  },

  saveGoals(goals) {
    this.save(STORAGE_KEYS.GOALS, goals)
  },

  getHabits() {
    return this.fetch(STORAGE_KEYS.HABITS) || []
  },

  saveHabits(habits) {
    this.save(STORAGE_KEYS.HABITS, habits)
  }
}
