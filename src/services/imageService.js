import { supabase } from './supabase'

export const imageService = {
  // Upload avatar to Supabase Storage
  async uploadAvatar(userId, file) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { data, error } = await supabase.storage
      .from('profiles') // Assuming bucket name is 'profiles' (standard or user needs to create)
      .upload(filePath, file, {
        upsert: true
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath)

    return publicUrl
  }
}
