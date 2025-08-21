import bcryptjs from 'bcryptjs'

export const hashPassword = async (password) => {
  return await bcryptjs.hash(password, 10)
}

export const passwordsMatch = async (password, dbPassword) => {
  // const hashedPassword = await hashPassword(password)
  // no need to hashg the password!
  return await bcryptjs.compare(password, dbPassword)
}
