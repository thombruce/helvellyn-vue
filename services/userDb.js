import { scope, user } from './gun'

const userDb = user.get(scope)

export default userDb
